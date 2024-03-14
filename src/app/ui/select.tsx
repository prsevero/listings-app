import styles from './select.module.scss'

export default function Select({
  options, title, ...rest
}: {
  options: string[] | number[]
  title?: string
} & React.HTMLAttributes<HTMLSelectElement>) {
  return (
    <>
      {title && <p className={styles.title}>{title}</p>}
      <select className={styles.select} {...rest}>
        {options.map(option =>
          <option key={option} value={option}>
            {option}
          </option>
        )}
      </select>
    </>
  )
}
