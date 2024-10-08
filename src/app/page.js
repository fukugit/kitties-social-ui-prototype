import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Link href='login'>
        login!!
      </Link>
      <Link href='top'>
        top!!
      </Link>
    </div>
  );
}
