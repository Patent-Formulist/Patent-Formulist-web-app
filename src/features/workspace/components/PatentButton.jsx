import { useState, useRef, useEffect } from 'react'

import patentService from '../../../services/patent/patentService'

import styles from '../styles/PatentButton.module.css'

import dots from '../../../resources/dots.svg'
import bin from '../../../resources/bin.svg'; 

export default function PatentButton({ patent, isActive, onClick, onDeleted, onEdit }) {
    const [menuVisible, setMenuVisible] = useState(false)
    const menuRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuVisible(false)
            }
        }
        if (menuVisible) {
            document.addEventListener('mousedown', handleClickOutside)
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [menuVisible])

    const onDelete = async () => {
        try {
            await patentService.deletePatent(patent.id)
            setMenuVisible(false)
            onDeleted(patent.id)
        } catch (e) {
            alert(`Ошибка удаления патента: ${e.message}`)
        }
    }

    const onEditClick = () => {
        setMenuVisible(false)
        onEdit(patent.id)
    }

    const onContainerClick = (e) => {
        if (
            e.target.closest(`.${styles.menuTrigger}`) ||
            e.target.closest(`.${styles.menu}`)
        ) {
            return
        }
        onClick(patent.id)
    }
  
    return (
        <div
        className={`${styles.patentButton} ${isActive ? styles.active : ''}`}
        onClick={onContainerClick}
        >
            <span className={styles.patentName}>{patent.name}</span>

            <div
                className={`${styles.menuTrigger} ${menuVisible ? styles.active : ''}`}
                onClick={(e) => {
                    e.stopPropagation()
                    setMenuVisible(!menuVisible)
                }}
                aria-label="Меню патента"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                    e.stopPropagation()
                    setMenuVisible(!menuVisible)
                    }
                }}
            >
                <img src={dots} alt="Меню патента" />
            </div>

            {menuVisible && (
                <div className={styles.menu} ref={menuRef}>
                <button className={styles.menuItem} onClick={onEditClick} type="button">
                    Редактировать
                </button>
                <button className={styles.menuItem} onClick={onDelete} type="button">
                    <img src={bin} alt="Удалить" className={styles.menuItemIcon} />
                    Удалить
                </button>
                </div>
            )}
        </div>
    )
}