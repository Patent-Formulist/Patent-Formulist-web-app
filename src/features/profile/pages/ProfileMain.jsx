import { useState, useEffect, useRef } from 'react'
import profileService from '../../../services/profile/profileService'
import styles from '../styles/ProfileMain.module.css'

import plus from '../../../resources/plus.svg'

const FORM_STORAGE_KEY = 'profile_main_form'

const getStoredValues = () => {
  if (typeof window === 'undefined') return {}
  const saved = localStorage.getItem(FORM_STORAGE_KEY)
  return saved ? JSON.parse(saved) : {}
}

export default function ProfileMain() {
  const [name, setName] = useState('')
  const [about, setAbout] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  
  const shouldSaveRef = useRef(true)

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setInitialLoading(true)
        
        const profileData = await profileService.getProfile()

        const stored = getStoredValues()
        
        setName(stored.name !== undefined ? stored.name : profileData.name || '')
        setAbout(stored.about !== undefined ? stored.about : profileData.about || '')
        setEmail(stored.email !== undefined ? stored.email : profileData.email || '')
      } catch (error) {
        setErrorMessage(error.message || 'Ошибка загрузки профиля')
      } finally {
        setInitialLoading(false)
      }
    }

    loadProfile()
  }, [])

  useEffect(() => {
    if (shouldSaveRef.current && !initialLoading) {
      localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify({ name, about, email }))
    }
  }, [name, about, email, initialLoading])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setErrorMessage('')

    try {
      const profileData = { name, about, email }
      
      const result = await profileService.updateProfile(profileData)
      
      shouldSaveRef.current = false
      localStorage.removeItem(FORM_STORAGE_KEY)
      
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
    
    setInitialLoading(true)
    profileService.getProfile()
      .then(profileData => {
        setName(profileData.name || '')
        setAbout(profileData.about || '')
        setEmail(profileData.email || '')
        setErrorMessage('')
      })
      .catch(error => setErrorMessage(error.message || 'Ошибка загрузки'))
      .finally(() => {
        setInitialLoading(false)
        shouldSaveRef.current = true
      })
  }

  const handleAvatarClick = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = async (e) => {
      const file = e.target.files[0]
      if (!file) return

      try {
        setLoading(true)
        const result = await profileService.uploadAvatar(file)
        alert('Аватар успешно загружен')
      } catch (error) {
        setErrorMessage(error.message || 'Ошибка загрузки аватара')
      } finally {
        setLoading(false)
      }
    }
    input.click()
  }

  if (initialLoading) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Личный кабинет</h2>
        <p className={styles.loadingText}>Загрузка...</p>
      </div>
    )
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
            disabled={loading}
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