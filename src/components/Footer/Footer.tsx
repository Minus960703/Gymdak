'use client';

import { Label } from '@/components/atoms';
import styles from './Footer.module.scss';
import { IconImage } from '../IconImage/IconImage';
import { useContext } from 'react';
import { ThemeStateContext } from '@/context/ThemeStateContext';

type Props = {}

function Footer({ }: Props) {
  const { theme } = useContext(ThemeStateContext);
  const openPagePopUp = (value: 'INSTAGRAM' | 'KAKAOTALK') => {
    if (value === 'INSTAGRAM') {
      const url = 'https://www.instagram.com/gym.dak.photo';
      const target = '_blank';
      window.open(url, target);
    } else if(value === 'KAKAOTALK') {
      const url = 'https://www.instagram.com/gym.dak';
      const target = '_blank';
      window.open(url, target);
    }
  }
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__image}>
        <button
          className={theme === 'dark' ? `${styles[theme]}` : undefined}
          onClick={() => openPagePopUp('INSTAGRAM')}
        >
          <IconImage icon='INSTAGRAM' />
        </button>
        {/* <button
          className={theme === 'dark' ? `${styles[theme]}` : undefined}
          onClick={() => {}}
        >
          <IconImage icon='KAKAOTALK' />
        </button> */}
      </div>
      <Label text={"@Copyright: 최진우"} />
    </footer>
  )
}

export { Footer };