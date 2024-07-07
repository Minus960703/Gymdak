'use client'

import React, { useCallback } from 'react'
import styles from './Header.module.scss'
import Link from 'next/link'


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

const currentLanguage = 'KR';

function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.header__menu}>
        <div className={styles.menu__main}>
          <div className={styles.logo}>
            <a href={'/'}>Gym Dak</a> {/** Link의 경우 라우터 처럼 보이기 때문에 페이지를 다시 로드하지 않기 때문에 active 클래스가 남아있게 된다. */}
          </div>
          <ul> 
            <li>
              로그인
            </li>
            <li>
              장바구니
            </li>
          </ul>
        </div>
        <div className={styles.menu__sub}>
          <ul>
            {MenuList.map((item) => {
              const isActive = location.pathname === item.path ? true : false;
              console.log(location.pathname);
              console.log(isActive);
              console.log(item.path);
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