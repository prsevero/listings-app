import Link from 'next/link'
import styles from './header.module.scss'
import StarIcon from './icons/star'

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/"><b>Listings</b></Link>
      <Link className={styles.star} href="/favorites"><StarIcon /></Link>
    </header>
  );
}
