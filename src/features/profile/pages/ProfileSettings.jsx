import { useState, useEffect, useRef } from 'react'
import styles from '../styles/ProfileSettings.module.css'

const AI_MODELS = [
  'GPT-4',
  'GPT-3.5 Turbo',
  'Claude 3 Opus',
  'Claude 3 Sonnet',
  'Gemini Pro',
  'LLaMA 3'
]

const FORM_STORAGE_KEY = 'profile_settings_form'

const getStoredValues = () => {
  if (typeof window === 'undefined') return { isExpert: false, aiModel: AI_MODELS[0] }
  const saved = localStorage.getItem(FORM_STORAGE_KEY)
  return saved ? JSON.parse(saved) : { isExpert: false, aiModel: AI_MODELS[0] }
}

export default function ProfileSettings() {
  const [isExpert, setIsExpert] = useState(false)
  const [aiModel, setAiModel] = useState(AI_MODELS[0])
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  
  const shouldSaveRef = useRef(true)

  useEffect(() => {
    const stored = getStoredValues()
    setIsExpert(stored.isExpert)
    setAiModel(stored.aiModel)
  }, [])

  useEffect(() => {
    if (shouldSaveRef.current) {
      localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify({ isExpert, aiModel }))
    }
  }, [isExpert, aiModel])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setErrorMessage('')

    try {
      // TODO: Реализовать отправку на сервер
      
      console.log('Сохранение настроек:', { isExpert, aiModel })
      
      shouldSaveRef.current = false
      localStorage.removeItem(FORM_STORAGE_KEY)
      
      // Имитация успешного сохранения
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      alert('Настройки успешно обновлены')
    } catch (error) {
      setErrorMessage(error.message || 'Ошибка сохранения')
      shouldSaveRef.current = true
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    shouldSaveRef.current = false
    localStorage.removeItem(FORM_STORAGE_KEY)
    setIsExpert(false)
    setAiModel(AI_MODELS[0])
    setErrorMessage('')
    shouldSaveRef.current = true
  }

  const toggleExpert = () => {
    setIsExpert(prev => !prev)
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
              disabled={loading}
            >
              {AI_MODELS.map(model => (
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
              <span className={styles.subscriptionText}>...</span>
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