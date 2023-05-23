import styles from './styles.module.css'

export function Loading() {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}
