import Link from 'next/link'
import styles from './button.module.scss'


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

interface LinkButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode
  href: string
}

export function Button({ children, ...rest }: ButtonProps) {
  return (
    <button className={styles.button} type="button" {...rest}>
      {children}
    </button>
  )
}

export function LinkButton({ children, href, ...rest }: LinkButtonProps) {
  return (
    <Link className={styles.button} href={href} {...rest}>
      {children}
    </Link>
  )
}
