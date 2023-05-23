import styles from './styles.module.css'

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <p className={styles.headerTitle}>
        Olá! Seja bem-vindo(a) ao <span>iClima</span>
      </p>

      <span className={styles.headerDescription}>
        Aqui você pode visualizar todas as informações do Clima em tempo real!
        😍
      </span>
    </header>
  )
}
