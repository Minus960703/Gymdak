import React from 'react'
import styles from './SearchArea.module.scss'

interface SearchAreaProps {
  children: React.ReactNode;
}

function SearchArea({ children }: SearchAreaProps) {
  return (
    <div className={styles.search}>
      {children}
    </div>
  )
}

export { SearchArea };