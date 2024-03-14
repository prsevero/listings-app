import LoadingIcon from './icons/loading'
import styles from './loading.module.scss'

export function Loading() {
  return (
    <div className={styles.loading}>
      <LoadingIcon />
    </div>
  )
}
