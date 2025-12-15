import { useState, useEffect, useRef } from 'react'
import styles from '../styles/ProfileMain.module.css'

import plus from '../../../resources/plus.svg'

const FORM_STORAGE_KEY = 'profile_main_form'

const getStoredValues = () => {
  if (typeof window === 'undefined') return {}
  const saved = localStorage.getItem(FORM_STORAGE_KEY)
  return saved ? JSON.parse(saved) : {}
}

export default function ProfileMain() {
  // TODO: Получать email из authService или контекста пользователя
  const [currentEmail] = useState('user@example.com')
  
  const [name, setName] = useState('')
  const [about, setAbout] = useState('')
  const [email, setEmail] = useState(currentEmail)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  
  const shouldSaveRef = useRef(true)

  useEffect(() => {
    const stored = getStoredValues()
    if (stored.name) setName(stored.name)
    if (stored.about) setAbout(stored.about)
    if (stored.email) setEmail(stored.email)
  }, [])

  useEffect(() => {
    if (shouldSaveRef.current) {
      localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify({ name, about, email }))
    }
  }, [name, about, email])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setErrorMessage('')

    try {
      // TODO: Реализовать отправку на сервер
      
      console.log('Сохранение данных профиля:', { name, about, email })
      
      shouldSaveRef.current = false
      localStorage.removeItem(FORM_STORAGE_KEY)
      
      // Имитация успешного сохранения
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      alert('Профиль успешно обновлен')
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
    setName('')
    setAbout('')
    setEmail(currentEmail)
    setErrorMessage('')
    shouldSaveRef.current = true
  }

  const handleAvatarClick = () => {
    console.log('Выбор аватара')
    // TODO: Реализовать загрузку аватара
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Личный кабинет</h2>
      
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.avatarSection}>
          <button
            type="button"
            className={styles.avatarButton}
            onClick={handleAvatarClick}
            aria-label="Загрузить фото профиля"
          >
            <img src={plus} alt="Добавить фото" className={styles.avatarIcon} />
          </button>

          <div className={styles.formGroup}>
            <input
              id="name"
              type="text"
              placeholder="Ваше имя"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="about" className={styles.label}>
            О себе
          </label>
          <textarea
            id="about"
            placeholder="О себе"
            rows={4}
            className={styles.textarea}
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Почта
          </label>
          <input
            id="email"
            type="email"
            placeholder="Почта"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
          />
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