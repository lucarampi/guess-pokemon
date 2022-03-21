import Image from 'next/image';
import styles from './styles.module.scss'

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Image width={100} height={55} className={styles.image} layout="fixed" src="/images/logo.png" alt="Logo do site" />
        <nav>
            <a className={styles.active} href="">Home</a>
            <a href="">Posts</a>
        </nav>
      </div>
    </header>
  );
}
