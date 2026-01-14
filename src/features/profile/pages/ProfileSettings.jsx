import { useState, useEffect } from 'react'
import profileService from '../../../services/profile/profileService'
import styles from '../styles/ProfileSettings.module.css'

export default function ProfileSettings() {
  const [isExpert, setIsExpert] = useState(false)
  const [aiModel, setAiModel] = useState('')
  const [availableModels, setAvailableModels] = useState([])
  const [subscription, setSubscription] = useState('...')
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')


  useEffect(() => {
    const loadSettings = async () => {
      try {
        setInitialLoading(true)
        
        const [settingsData, models] = await Promise.all([
          profileService.getSettings(),
          profileService.getAvailableModels()
        ])

        setAvailableModels(models)
        setIsExpert(settingsData.isExpert)
        setAiModel(settingsData.aiModel)
        setSubscription(settingsData.subscription || '...')
      } catch (error) {
        setErrorMessage(error.message || 'Ошибка загрузки настроек')
      } finally {
        setInitialLoading(false)
      }
    }

    loadSettings()
  }, [])


  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setErrorMessage('')

    try {
      const settingsData = { isExpert, aiModel }
      
      const result = await profileService.updateSettings(settingsData)
      
      alert('Настройки успешно обновлены')
    } catch (error) {
      setErrorMessage(error.message || 'Ошибка сохранения')
    } finally {
      setLoading(false)
    }
  }


  const handleCancel = () => {
    setInitialLoading(true)
    profileService.getSettings()
      .then(settingsData => {
        setIsExpert(settingsData.isExpert)
        setAiModel(settingsData.aiModel)
        setErrorMessage('')
      })
      .catch(error => setErrorMessage(error.message || 'Ошибка загрузки'))
      .finally(() => {
        setInitialLoading(false)
      })
  }


  const toggleExpert = () => {
    setIsExpert(prev => !prev)
  }


  if (initialLoading) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Настройки</h2>
        <p className={styles.loadingText}>Загрузка...</p>
      </div>
    )
  }


  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Настройки</h2>
      
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.settingItem}>
          <label className={styles.label}>Тип профиля</label>
          <div className={styles.controlArea}>
            <button
              type="button"
              className={`${styles.toggle} ${isExpert ? styles.toggleActive : ''}`}
              onClick={toggleExpert}
              disabled={loading}
              aria-label="Переключить тип профиля"
            >
              <span className={styles.toggleThumb}></span>
            </button>
            <span className={styles.toggleLabel}>
              {isExpert ? 'Эксперт' : 'Любитель'}
            </span>
          </div>
        </div>

        <div className={styles.settingItem}>
          <label htmlFor="aiModel" className={styles.label}>
            ИИ-модель
          </label>
          <div className={styles.controlArea}>
            <select
              id="aiModel"
              className={styles.select}
              value={aiModel}
              onChange={(e) => setAiModel(e.target.value)}
              disabled={loading || availableModels.length === 0}
            >
              {availableModels.map(model => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.settingItem}>
          <label className={styles.label}>Подписка</label>
          <div className={styles.controlArea}>
            <div className={styles.subscriptionInfo}>
              <span className={styles.subscriptionText}>{subscription}</span>
            </div>
          </div>
        </div>

        <div className={styles.buttonGroup}>
          <button
            type="button"
            onClick={handleCancel}
            disabled={loading}
            className={styles.cancelButton}
          >
            Отмена
          </button>
          <button
            type="submit"
            disabled={loading}
            className={styles.submitButton}
          >
            {loading ? 'Сохранение...' : 'Сохранить'}
          </button>
        </div>
      </form>

      <div 
        className={errorMessage ? styles.error : styles.errorPlaceholder} 
        aria-live="polite" 
        role="alert"
      >
        {errorMessage || '\u00A0'}
      </div>
    </div>
  )
}