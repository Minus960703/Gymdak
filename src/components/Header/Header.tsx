'use client'

import React, { useCallback } from 'react'
import styles from './Header.module.scss'
import Link from 'next/link'
import { usePathname } from 'next/navigation';


// dataBase 에서 관리하도록 변경 예정 ( 확장성 )
// Redux에서 한국어, 일본어, 영어 로 관리하기..
const MenuList = [
  {
    id: 1,
    name_KR: "사진",
    name_EN: "PHOTO",
    name_JP: "Gym Dak",
    path: '/photo'
  },
  {
    id: 2,
    name_KR: "촬영문의",
    name_EN: "CONTACT",
    name_JP: "れんらく",
    path: '/contact'
  },
];

const LanguageList = [
  {
    id: 1,
    name: 'KO',
    value: 'KR'
  },
  {
    id: 2,
    name: 'EN',
    value: 'EN'
  },
  {
    id: 3,
    name: 'JP',
    value: 'JP'
  },
];

const currentLanguage = 'KR';

function Header() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <nav className={styles.header__menu}>
        <div className={styles.menu__main}>
          <div className={styles.logo}>
            <Link href={'/'}>Gym Dak</Link>
          </div>
          <div>
            <ul>
              {LanguageList.map((item) => {
                return (
                  <li key={item.id}>{item.name}</li>
                )
              })}
            </ul>
            <ul>
              <li>
                로그인
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
                  className={isActive ? styles.active : ''}
                >
                  <Link href={item.path} key={item.id}>{item[`name_${currentLanguage}`]}</Link>
                </li>
                )})
            }
          </ul>
        </div>
      </nav>
    </header>
  )
}

export { Header };