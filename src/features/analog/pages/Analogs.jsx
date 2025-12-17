import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { createPortal } from 'react-dom'
import { useAnalogTask } from '../../../contexts/AnalogTaskContext'
import { useToast } from '../../../contexts/ToastContext'
import { TASK_STATUS } from '../../../services/analog/analogService'
import * as XLSX from 'xlsx'
import styles from '../styles/Analogs.module.css'



const downloadExcel = (analogs, patentId, type = 'full') => {
  let headers, rows
  
  if (type === 'links') {
    headers = ['Номер', 'Название', 'Ссылка']
    rows = Object.entries(analogs).map(([_, analog]) => [
      analog.number || '',
      analog.title || '',
      analog.link || ''
    ])
  } else if (type === 'claims') {
    headers = ['Номер', 'Название', 'Формула']
    rows = Object.entries(analogs).map(([_, analog]) => [
      analog.number || '',
      analog.title || '',
      analog.claims || ''
    ])
  } else {
    headers = ['Номер', 'Название', 'Ссылка', 'Реферат', 'Формула']
    rows = Object.entries(analogs).map(([_, analog]) => [
      analog.number || '',
      analog.title || '',
      analog.link || '',
      analog.abstract || '',
      analog.claims || ''
    ])
  }


  const data = [headers, ...rows]
  const worksheet = XLSX.utils.aoa_to_sheet(data)
  
  const colWidths = type === 'links' 
    ? [{ wch: 15 }, { wch: 30 }, { wch: 50 }]
    : type === 'claims'
    ? [{ wch: 15 }, { wch: 30 }, { wch: 60 }]
    : [{ wch: 15 }, { wch: 30 }, { wch: 50 }, { wch: 60 }, { wch: 60 }]
  
  worksheet['!cols'] = colWidths


  const workbook = XLSX.utils.book_new()
  const sheetName = type === 'links' ? 'Ссылки' : type === 'claims' ? 'Формулы' : 'Аналоги'
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName)


  const fileName = `analogs_${type}_${patentId}_${new Date().toISOString().slice(0, 10)}.xlsx`
  XLSX.writeFile(workbook, fileName)
}



export default function Analogs() {
  const { id } = useParams()
  const { startTask, getTask } = useAnalogTask()
  const { showWarning, showSuccess } = useToast()
  
  const [viewMode, setViewMode] = useState('main')
  const [confirmModalVisible, setConfirmModalVisible] = useState(false)
  
  const task = getTask(id)
  const loading = task?.status === TASK_STATUS.RUNNING
  const error = task?.error
  const analogs = task?.data
  const isCompleted = task?.status === TASK_STATUS.SUCCESS && analogs


  const handleGetLinksAndClaims = async () => {
    if (isCompleted) {
      setConfirmModalVisible(true)
      return
    }
    
    try {
      await startTask(id)
    } catch (err) {
      console.error('Ошибка запуска задачи:', err)
    }
  }


  const confirmRestart = async () => {
    setConfirmModalVisible(false)
    try {
      await startTask(id)
    } catch (err) {
      console.error('Ошибка запуска задачи:', err)
    }
  }


  const cancelRestart = () => {
    setConfirmModalVisible(false)
  }


  const handleDownloadLinksAndClaims = () => {
    if (!isCompleted) {
      showWarning('Сначала выполните получение ссылок и формул')
      return
    }


    downloadExcel(analogs, id, 'full')
    showSuccess('Файл успешно скачан')
  }


  const handleGetLinks = () => {
    if (!isCompleted) {
      showWarning('Сначала выполните получение ссылок и формул')
      return
    }
    setViewMode('links')
  }


  const handleGetClaims = () => {
    if (!isCompleted) {
      showWarning('Сначала выполните получение ссылок и формул')
      return
    }
    setViewMode('claims')
  }


  const handleDownloadLinks = () => {
    downloadExcel(analogs, id, 'links')
    showSuccess('Ссылки успешно скачаны')
  }


  const handleDownloadClaims = () => {
    downloadExcel(analogs, id, 'claims')
    showSuccess('Формулы успешно скачаны')
  }


  const handleBackToMain = () => {
    setViewMode('main')
  }


  const renderLinks = () => (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Номер</th>
            <th>Название</th>
            <th>Ссылка</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(analogs).map(([index, analog]) => (
            <tr key={index}>
              <td>{analog.number}</td>
              <td>{analog.title}</td>
              <td>
                <a 
                  href={analog.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  Открыть
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )


  const renderClaims = () => (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Номер</th>
            <th>Название</th>
            <th>Формула</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(analogs).map(([index, analog]) => (
            <tr key={index}>
              <td>{analog.number}</td>
              <td>{analog.title}</td>
              <td>{analog.claims}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )


  const renderFull = () => (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Номер</th>
            <th>Название</th>
            <th>Ссылка</th>
            <th>Реферат</th>
            <th>Формула</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(analogs).map(([index, analog]) => (
            <tr key={index}>
              <td>{analog.number}</td>
              <td>{analog.title}</td>
              <td>
                <a 
                  href={analog.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  Открыть
                </a>
              </td>
              <td>{analog.abstract}</td>
              <td>{analog.claims}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )


  return (
    <>
      <div className={styles.container}>      
        {viewMode === 'main' && (
          <div className={styles.buttonContainer}>
            <button 
              className={`${styles.actionButton} ${loading ? styles.loading : ''} ${isCompleted ? styles.completed : ''}`}
              onClick={handleGetLinksAndClaims}
              disabled={loading}
            >
              Получить ссылки и формулы
            </button>
            <button 
              className={`${styles.actionButton} ${!isCompleted ? styles.inactive : ''}`}
              onClick={handleDownloadLinksAndClaims}
            >
              Скачать ссылки и формулы
            </button>
            <button 
              className={`${styles.actionButton} ${!isCompleted ? styles.inactive : ''}`}
              onClick={handleGetLinks}
            >
              Получить ссылки
            </button>
            <button 
              className={`${styles.actionButton} ${!isCompleted ? styles.inactive : ''}`}
              onClick={handleGetClaims}
            >
              Получить формулы
            </button>
          </div>
        )}


        {viewMode === 'links' && (
          <div className={styles.buttonContainer}>
            <button 
              className={styles.actionButton}
              onClick={handleBackToMain}
            >
              Назад
            </button>
            <button 
              className={styles.actionButton}
              onClick={handleDownloadLinks}
            >
              Скачать ссылки
            </button>
          </div>
        )}


        {viewMode === 'claims' && (
          <div className={styles.buttonContainer}>
            <button 
              className={styles.actionButton}
              onClick={handleBackToMain}
            >
              Назад
            </button>
            <button 
              className={styles.actionButton}
              onClick={handleDownloadClaims}
            >
              Скачать формулы
            </button>
          </div>
        )}


        {error && (
          <div className={styles.error}>
            {error}
          </div>
        )}


        {analogs && viewMode === 'main' && renderFull()}
        {analogs && viewMode === 'links' && renderLinks()}
        {analogs && viewMode === 'claims' && renderClaims()}
      </div>


      {confirmModalVisible && createPortal(
        <div className={styles.modalOverlay} onClick={cancelRestart}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3 className={styles.modalTitle}>Повторный поиск аналогов?</h3>
            <p className={styles.modalText}>
              Вы уверены, что хотите выполнить повторный поиск аналогов?
            </p>
            <p className={styles.modalWarning}>
              Данные следующих шагов (Атрибуты аналогов и Прототип) станут неактуальными и их нужно будет обновить.
            </p>
            <div className={styles.modalButtons}>
              <button 
                className={styles.modalCancelButton} 
                onClick={cancelRestart}
                type="button"
              >
                Отмена
              </button>
              <button 
                className={styles.modalConfirmButton} 
                onClick={confirmRestart}
                type="button"
              >
                Продолжить
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}