import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { createPortal } from 'react-dom'
import { useReference } from '../../../contexts/ReferenceContext'
import { useToast } from '../../../contexts/ToastContext'
import { TASK_STATUS } from '../../../services/reference/referenceService'
import * as XLSX from 'xlsx'
import styles from '../styles/AnaloguesPatentComparison.module.css'

const TABLE_HEADERS = {
  mainRow: {
    features: 'Признаки',
    analogs: 'Аналоги',
    frequency: 'Частота встречаемости',
    userComparison: 'Сравнение с пользовательским'
  },
  subRow: {
    userPatent: 'Ваш патент'
  }
}

const downloadExcel = (data, patentId) => {
  const { features, analogs, comparison, frequency, user_patent, user_comparison, analog_counts } = data

  const headerRow1 = [
    TABLE_HEADERS.mainRow.features,
    ...Array(analogs.length).fill(TABLE_HEADERS.mainRow.analogs),
    TABLE_HEADERS.mainRow.frequency,
    TABLE_HEADERS.mainRow.userComparison,
    ...Array(analogs.length).fill(TABLE_HEADERS.mainRow.userComparison)
  ]

  const headerRow2 = [
    '',
    ...analogs,
    '',
    TABLE_HEADERS.subRow.userPatent,
    ...analogs
  ]
  
  const rows = features.map((feature, idx) => [
    feature,
    ...comparison[idx],
    frequency[idx],
    user_patent[idx],
    ...user_comparison[idx]
  ])

  rows.push(['Итого', ...Array(analogs.length).fill(''), '', '', ...analog_counts])

  const worksheet = XLSX.utils.aoa_to_sheet([headerRow1, headerRow2, ...rows])
  
  const colWidths = [
    { wch: 60 },
    ...analogs.map(() => ({ wch: 15 })),
    { wch: 25 },
    { wch: 20 },
    ...analogs.map(() => ({ wch: 15 }))
  ]
  
  worksheet['!cols'] = colWidths

  const merges = []
  merges.push({ s: { r: 0, c: 0 }, e: { r: 1, c: 0 } })
  merges.push({ s: { r: 0, c: 1 }, e: { r: 0, c: analogs.length } })
  const frequencyCol = analogs.length + 1
  merges.push({ s: { r: 0, c: frequencyCol }, e: { r: 1, c: frequencyCol } })
  const userStartCol = frequencyCol + 1
  const userEndCol = userStartCol + analogs.length
  merges.push({ s: { r: 0, c: userStartCol }, e: { r: 0, c: userEndCol } })

  worksheet['!merges'] = merges

  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Сопоставление')

  const fileName = `comparison_${patentId}_${new Date().toISOString().slice(0, 10)}.xlsx`
  XLSX.writeFile(workbook, fileName)
}

const downloadFeaturesExcel = (analogFeatures, patentFeatures, fileName) => {
  const headers = ['Номер', 'Признаки аналога', 'Признаки патента']
  const rows = analogFeatures.map((analogFeature, idx) => [
    idx + 1,
    analogFeature,
    patentFeatures[idx] || ''
  ])

  const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows])
  worksheet['!cols'] = [
    { wch: 10 },
    { wch: 60 },
    { wch: 60 }
  ]

  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Признаки')
  XLSX.writeFile(workbook, fileName)
}

const downloadAnalogsOnlyExcel = (analogFeatures, fileName) => {
  const headers = ['Номер', 'Признаки аналога']
  const rows = analogFeatures.map((feature, idx) => [idx + 1, feature])

  const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows])
  worksheet['!cols'] = [{ wch: 10 }, { wch: 60 }]

  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Признаки аналогов')
  XLSX.writeFile(workbook, fileName)
}

const downloadPatentOnlyExcel = (patentFeatures, fileName) => {
  const headers = ['Номер', 'Признаки патента']
  const rows = patentFeatures.map((feature, idx) => [idx + 1, feature])

  const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows])
  worksheet['!cols'] = [{ wch: 10 }, { wch: 60 }]

  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Признаки патента')
  XLSX.writeFile(workbook, fileName)
}

export default function AnaloguesPatentComparison() {
  const { id } = useParams()
  const { startCompareTask, getCompareTask } = useReference()
  const { showWarning, showSuccess } = useToast()
  
  const [confirmModalVisible, setConfirmModalVisible] = useState(false)
  const [viewMode, setViewMode] = useState('table')
  
  const task = getCompareTask(id)
  const loading = task?.status === TASK_STATUS.RUNNING
  const error = task?.error
  const comparisonData = task?.data
  const isCompleted = task?.status === TASK_STATUS.SUCCESS && comparisonData

  const handleCompare = async () => {
    if (isCompleted) {
      setConfirmModalVisible(true)
      return
    }
    
    try {
      await startCompareTask(id)
    } catch (err) {
      console.error('Ошибка запуска задачи:', err)
    }
  }

  const confirmRestart = async () => {
    setConfirmModalVisible(false)
    try {
      await startCompareTask(id)
    } catch (err) {
      console.error('Ошибка запуска задачи:', err)
    }
  }

  const cancelRestart = () => {
    setConfirmModalVisible(false)
  }

  const handleDownload = () => {
    if (!isCompleted) {
      showWarning('Сначала выполните сопоставление патента с аналогами')
      return
    }

    downloadExcel(comparisonData, id)
    showSuccess('Таблица сопоставления успешно скачана')
  }

  const handleGetFeatures = () => {
    if (!isCompleted) {
      showWarning('Сначала выполните сопоставление патента с аналогами')
      return
    }
    setViewMode('features-menu')
  }

  const handleBackToTable = () => {
    setViewMode('table')
  }

  const handleBackToFeaturesMenu = () => {
    setViewMode('features-menu')
  }

  const handleShowAllFeatures = () => {
    setViewMode('features-all')
  }

  const handleShowAnalogsFeatures = () => {
    setViewMode('features-analogs')
  }

  const handleShowPatentFeatures = () => {
    setViewMode('features-patent')
  }

  const handleDownloadAllFeatures = () => {
    if (!comparisonData?.analog_features || !comparisonData?.patent_features) {
      showWarning('Данные признаков недоступны')
      return
    }
    downloadFeaturesExcel(
      comparisonData.analog_features,
      comparisonData.patent_features,
      `features_all_${id}_${new Date().toISOString().slice(0, 10)}.xlsx`
    )
    showSuccess('Признаки патента и аналогов успешно скачаны')
  }

  const handleDownloadAnalogsFeatures = () => {
    if (!comparisonData?.analog_features) {
      showWarning('Данные признаков аналогов недоступны')
      return
    }
    downloadAnalogsOnlyExcel(
      comparisonData.analog_features,
      `features_analogs_${id}_${new Date().toISOString().slice(0, 10)}.xlsx`
    )
    showSuccess('Признаки аналогов успешно скачаны')
  }

  const handleDownloadPatentFeatures = () => {
    if (!comparisonData?.patent_features) {
      showWarning('Данные признаков патента недоступны')
      return
    }
    downloadPatentOnlyExcel(
      comparisonData.patent_features,
      `features_patent_${id}_${new Date().toISOString().slice(0, 10)}.xlsx`
    )
    showSuccess('Признаки патента успешно скачаны')
  }

  const renderComparisonTable = () => {
    if (!comparisonData) return null

    const { features, analogs, comparison, frequency, user_patent, user_comparison, analog_counts } = comparisonData

    return (
      <div className={styles.tableWrapper}>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th rowSpan="2" className={styles.featureHeader}>{TABLE_HEADERS.mainRow.features}</th>
                <th colSpan={analogs.length} className={styles.sectionHeader}>{TABLE_HEADERS.mainRow.analogs}</th>
                <th rowSpan="2">{TABLE_HEADERS.mainRow.frequency}</th>
                <th colSpan={analogs.length + 1} className={styles.sectionHeader}>{TABLE_HEADERS.mainRow.userComparison}</th>
              </tr>
              <tr>
                {analogs.map((analog, idx) => (
                  <th key={idx}>{analog}</th>
                ))}
                <th>{TABLE_HEADERS.subRow.userPatent}</th>
                {analogs.map((analog, idx) => (
                  <th key={`user-${idx}`}>{analog}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature, featureIdx) => (
                <tr key={featureIdx}>
                  <td className={styles.featureCell}>{feature}</td>
                  {comparison[featureIdx].map((value, analogIdx) => (
                    <td key={analogIdx} className={styles.valueCell}>{value}</td>
                  ))}
                  <td className={styles.frequencyCell}>{frequency[featureIdx]}</td>
                  <td className={styles.valueCell}>{user_patent[featureIdx]}</td>
                  {user_comparison[featureIdx].map((value, analogIdx) => (
                    <td key={`user-comp-${analogIdx}`} className={styles.valueCell}>{value}</td>
                  ))}
                </tr>
              ))}
              <tr className={styles.totalRow}>
                <td className={styles.totalLabel}>Итого</td>
                {analogs.map((_, idx) => (
                  <td key={`empty-analog-${idx}`}></td>
                ))}
                <td></td>
                <td></td>
                {analog_counts.map((count, idx) => (
                  <td key={`user-total-${idx}`} className={styles.totalCell}>{count}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  const renderFeaturesAll = () => {
    if (!comparisonData?.analog_features || !comparisonData?.patent_features) return null

    return (
      <div className={styles.tableWrapper}>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.numberHeader}>Номер</th>
                <th className={styles.featureHeader}>Признаки аналога</th>
                <th className={styles.featureHeader}>Признаки патента</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.analog_features.map((analogFeature, idx) => (
                <tr key={idx}>
                  <td className={styles.numberCell}>{idx + 1}</td>
                  <td className={styles.featureCell}>{analogFeature}</td>
                  <td className={styles.featureCell}>{comparisonData.patent_features[idx]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  const renderFeaturesAnalogs = () => {
    if (!comparisonData?.analog_features) return null

    return (
      <div className={styles.tableWrapper}>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.numberHeader}>Номер</th>
                <th className={styles.featureHeader}>Признаки аналога</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.analog_features.map((feature, idx) => (
                <tr key={idx}>
                  <td className={styles.numberCell}>{idx + 1}</td>
                  <td className={styles.featureCell}>{feature}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  const renderFeaturesPatent = () => {
    if (!comparisonData?.patent_features) return null

    return (
      <div className={styles.tableWrapper}>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.numberHeader}>Номер</th>
                <th className={styles.featureHeader}>Признаки патента</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.patent_features.map((feature, idx) => (
                <tr key={idx}>
                  <td className={styles.numberCell}>{idx + 1}</td>
                  <td className={styles.featureCell}>{feature}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className={styles.container}>
        {viewMode === 'table' && (
          <div className={styles.buttonContainer}>
            <button 
              className={`${styles.actionButton} ${loading ? styles.loading : ''} ${isCompleted ? styles.completed : ''}`}
              onClick={handleCompare}
              disabled={loading}
            >
              Сопоставить патент с аналогами
            </button>
            <button 
              className={`${styles.actionButton} ${!isCompleted ? styles.inactive : ''}`}
              onClick={handleDownload}
            >
              Скачать таблицу сопоставления
            </button>
            <button 
              className={`${styles.actionButton} ${!isCompleted ? styles.inactive : ''}`}
              onClick={handleGetFeatures}
            >
              Получить признаки патента и аналогов
            </button>
          </div>
        )}

        {viewMode === 'features-menu' && (
          <div className={styles.buttonContainer}>
            <button 
              className={styles.actionButton}
              onClick={handleBackToTable}
            >
              Назад
            </button>
            <button 
              className={styles.actionButton}
              onClick={handleShowAllFeatures}
            >
              Признаки патента и аналогов
            </button>
            <button 
              className={styles.actionButton}
              onClick={handleShowAnalogsFeatures}
            >
              Признаки аналогов
            </button>
            <button 
              className={styles.actionButton}
              onClick={handleShowPatentFeatures}
            >
              Признаки патента
            </button>
          </div>
        )}

        {viewMode === 'features-all' && (
          <div className={styles.buttonContainer}>
            <button 
              className={styles.actionButton}
              onClick={handleBackToFeaturesMenu}
            >
              Назад
            </button>
            <button 
              className={styles.actionButton}
              onClick={handleDownloadAllFeatures}
            >
              Скачать признаки
            </button>
          </div>
        )}

        {viewMode === 'features-analogs' && (
          <div className={styles.buttonContainer}>
            <button 
              className={styles.actionButton}
              onClick={handleBackToFeaturesMenu}
            >
              Назад
            </button>
            <button 
              className={styles.actionButton}
              onClick={handleDownloadAnalogsFeatures}
            >
              Скачать признаки
            </button>
          </div>
        )}

        {viewMode === 'features-patent' && (
          <div className={styles.buttonContainer}>
            <button 
              className={styles.actionButton}
              onClick={handleBackToFeaturesMenu}
            >
              Назад
            </button>
            <button 
              className={styles.actionButton}
              onClick={handleDownloadPatentFeatures}
            >
              Скачать признаки
            </button>
          </div>
        )}

        {error && (
          <div className={styles.error}>
            {error}
          </div>
        )}

        {comparisonData && viewMode === 'table' && renderComparisonTable()}
        {comparisonData && viewMode === 'features-all' && renderFeaturesAll()}
        {comparisonData && viewMode === 'features-analogs' && renderFeaturesAnalogs()}
        {comparisonData && viewMode === 'features-patent' && renderFeaturesPatent()}
      </div>

      {confirmModalVisible && createPortal(
        <div className={styles.modalOverlay} onClick={cancelRestart}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3 className={styles.modalTitle}>Повторное сопоставление?</h3>
            <p className={styles.modalText}>
              Вы уверены, что хотите выполнить повторное сопоставление патента с аналогами?
            </p>
            <p className={styles.modalWarning}>
              Данные следующих шагов (Прототип) станут неактуальными и их нужно будет обновить.
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