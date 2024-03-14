import { currencyFormat, slugify } from '@/app/lib/utils'
import styles from './input-range.module.scss'

interface HTMLInputRangeAttributes extends React.HTMLAttributes<HTMLInputElement> {
  max?: number
  min?: number
  step?: number
}

export default function InputRange({
  title, value, ...rest
}: {
  title?: string
  value?: number
} & HTMLInputRangeAttributes) {
  return (
    <>
      {(title || value) && (
        <p className={styles.title}>
          {title ? (value !== undefined ? `${title}: `: title) : null}
          {value !== undefined ? currencyFormat(value) : null}
        </p>
      )}
      <span>
        <input className={styles.input} defaultValue={value} type="range" {...rest} />
      </span>
    </>
  )
}
