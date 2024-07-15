'use client'

import React, { useContext, useState  } from 'react'
import styles                           from './Header.module.scss'
import Link                             from 'next/link'
import { usePathname                  } from 'next/navigation';
import { ThemeStateContext            } from '@/context/ThemeStateContext';
import { IconImage                    } from '@/components';
import { LanguageStateContext         } from '@/context/LanguageStateContext';
import { LanguageList, MenuList       } from '@/api/Header/HeaderObject';
import { LoginStateContext            } from '@/context/LoginStateContext';
import { LoginModal } from '../LoginModal/LoginModal';

// dataBase 에서 관리하도록 변경 예정 ( 확장성 )
// Redux에서 한국어, 일본어, 영어 로 관리하기..

function Header() {
  const { theme, onClickThemeButton } = useContext(ThemeStateContext);
  const { language, onClickLanguage } = useContext(LanguageStateContext);
  const { isLogin                   } = useContext(LoginStateContext);
  const [ modalOpen, setModalOpen   ] = useState<boolean>(false);
  
  const isModalActiveButton = () => setModalOpen((prev) => !prev);
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <nav className={styles.header__menu}>
        <div className={styles.menu__main}>
          <div className={styles.logo}>
            <Link href={'/'}>Gym Dak</Link>
          </div>
          <div>
            <ul className='language__setting'>
              <li>
                <button
                  className={theme === 'dark' ? `${styles[theme]}` : undefined}
                  onClick={() => onClickThemeButton()}
                >
                  {theme === 'light'
                    ? <IconImage icon="DARK"/>
                    : <IconImage icon="LIGHT"/>
                  }
                </button>
              </li>
              {LanguageList.map((item) => {
                return (
                  <li
                    className={language === item.value ? 'language__active' : undefined}
                    onClick={() => onClickLanguage(`${item.value}`)}
                    key={item.id}
                  >
                    {item.name}
                  </li>
                )
              })}
            </ul>
            <ul style={{justifyContent: 'flex-end'}}>
              <li>
                <button
                  className={theme === 'dark' ? `${styles[theme]}` : undefined}
                  onClick={() => isModalActiveButton()}
                >
                  <IconImage icon="USER" />
                </button>
              </li>
              <li>
                장바구니
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.menu__sub}>
          <ul>
            {MenuList.map((item) => {
              const isActive = pathname === item.path ? true : false;
              return (
                <li
                  key={item.id}
                  className={isActive ? styles.active : undefined}
                >
                  <Link href={item.path}>{item[`name_${language}`]}</Link>
                </li>
                )})
            }
          </ul>
        </div>
      </nav>
      {modalOpen && <LoginModal modalOpen={modalOpen} isModalActiveButton={isModalActiveButton} />}
    </header>
  )
}

export { Header };