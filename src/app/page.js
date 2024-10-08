import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.link}>
        <Link href='login'>login!!</Link>
      </div>
      <div className={styles.link_blue}>
        <Link href='top'>top!!</Link>
      </div>
    </div>
  );
}
