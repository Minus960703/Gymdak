import { Label } from '@/components/atoms';
import styles from './Footer.module.scss';

type Props = {}

function Footer({ }: Props) {
  return (
    <footer className={styles.footer}>
      <Label text={"@Copyright: 최진우"} />
    </footer>
  )
}

export { Footer };