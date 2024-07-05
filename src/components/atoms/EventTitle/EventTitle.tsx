import styles from './EventTitle.module.scss'

interface EventTitleProps {
  title: string;
}

function EventTitle({ title }: EventTitleProps) {
  return (
    <h4 className={styles.title}>{title}</h4>
  )
}

export { EventTitle };