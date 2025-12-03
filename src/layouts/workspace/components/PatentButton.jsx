import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { usePatents } from '../../../contexts/PatentsContext'

import styles from '../styles/PatentButton.module.css'

import dots from '../../../resources/dots.svg'
import bin from '../../../resources/bin.svg'
import pen from '../../../resources/pen.svg'

export default function PatentButton({ patent, isActive, isPanelVisible }) {
    const [menuVisible, setMenuVisible] = useState(false)
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 })
    const menuRef = useRef(null)
    const triggerRef = useRef(null)
    
    const navigate = useNavigate()
    const location = useLocation()
    const { deletePatent } = usePatents()

    useEffect(() => {
        if (!isPanelVisible) {
            setMenuVisible(false)
        }
    }, [isPanelVisible])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target) &&
                triggerRef.current && !triggerRef.current.contains(event.target)) {
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

    const toggleMenu = (e) => {
        e.stopPropagation()
        
        if (!menuVisible && triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect()
            setMenuPosition({
                top: rect.bottom + 4,
                left: rect.right - 160 
            })
        }
        
        setMenuVisible(!menuVisible)
    }

    const onDelete = async (e) => {
        e.stopPropagation()
        try {
            setMenuVisible(false)
            const isOnPatentPage = location.pathname.includes(`/patents/${patent.id}`)
            await deletePatent(patent.id)
            if (isOnPatentPage) {
                navigate('/workspace')
            }
        } catch (e) {
            alert(`Ошибка удаления патента: ${e.message}`)
        }
    }

    const onEditClick = (e) => {
        e.stopPropagation()
        setMenuVisible(false)
        navigate(`/workspace/patents/${patent.id}/edit`)
    }

    const onPatentClick = (e) => {
        if (e.target.closest(`.${styles.menuTrigger}`) || 
            e.target.closest(`.${styles.menu}`)) {
            return
        }
        navigate(`/workspace/patents/${patent.id}`)
    }

    return (
        <div
            className={`${styles.patentButton} ${isActive ? styles.active : ''}`}
            onClick={onPatentClick}
        >
            <span className={styles.patentName}>{patent.name}</span>

            <div
                ref={triggerRef}
                className={`${styles.menuTrigger} ${menuVisible ? styles.active : ''}`}
                onClick={toggleMenu}
                aria-label="Меню патента"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        toggleMenu(e)
                    }
                }}
            >
                <img src={dots} alt="Меню патента" />
            </div>

            {menuVisible && (
                <div 
                    className={styles.menu} 
                    ref={menuRef}
                    style={{
                        position: 'fixed',
                        top: `${menuPosition.top}px`,
                        left: `${menuPosition.left}px`
                    }}
                >
                    <button className={styles.menuItem} onClick={onEditClick} type="button">
                        <img src={pen} alt="Редактировать" className={styles.menuItemIcon} />
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