'use client'

import React, { useCallback } from 'react'
import styles from './Header.module.scss'
import { useRouter } from 'next/router'
import Link from 'next/link'


// dataBase 에서 관리하도록 변경 예정 ( 확장성 )
// Redux에서 한국어, 일본어, 영어 로 관리하기..
const MenuList = [
  {
    id: 1,
    name_KR: "",
    name_EN: "Gym Dak",
    name_JP: "Gym Dak",
    path: '/'
  },
  {
    id: 2,
    name_KR: "RESERVE",
    name_EN: "Gym Dak",
    name_JP: "Gym Dak",
    path: '/'
  },
  {
    id: 3,
    name_KR: "연락",
    name_EN: "CONTACT",
    name_JP: "れんらく",
    path: '/'
  },
];

const currentLanguage = 'KR';

function Header() {
  // const router = useRouter();
  // const goToPage = useCallback((href: string) => router.push(href), [router]);

  return (
    <header className={styles.header}>
      <nav className={styles.menu}>
        <div className={styles.logo}>
          <Link href={'/'}>Gym Dak</Link>
        </div>
        <ul> 
          {MenuList.map((item) => {
            return (
              <li
                key={item.id}
              >
                <Link href={item.path} key={item.id}>{item[`name_${currentLanguage}`]}</Link>
              </li>
              )})
          }
          {/* <li
            // className={router.pathname === '/event' ? styles.active : ''}
            // onClick={() => goToPage("/event")}
          >
            <Link href={'/event'}>EVENT</Link>
            EVENT
          </li>
          <li
            // className={router.pathname === '/post' ? styles.active : ''}
            // onClick={() => goToPage("/post")}
          >
            POST
          </li> */}
        </ul>
      </nav>
    </header>
  )
}

export { Header };