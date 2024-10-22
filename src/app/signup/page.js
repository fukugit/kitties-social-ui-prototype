'use client'
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const [user_name, setUserName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    console.log(user_name)
    console.log(mail)
    console.log(mail)
    router.push('/top');
  }
  return (
    <>
     <div className={styles.wrapper}>
      <div className={`${styles.column} ${styles.left_screen}`}>
        <h1 className={styles.title}>🐈️ SPP</h1>
        <div className={styles.login_outline}>
          <div className={styles.login_content}>
            <div className={styles.login_content_header}>
              <h2>サインアップ</h2>
              <p>30日間の無料トライアルを開始</p>
            </div>

            <div className={styles.login_content_body}>
              <p>名前</p>
              <input
                className={styles.input_text}
                placeholder={"お名前を入力してください"}
                type={"text"}
                value={user_name}
                onChange={(e) => setUserName(e.target.value)}
              />
              <p>メール</p>
              <input
                className={styles.input_text}
                placeholder={"メールアドレスを入力してください"}
                type={"text"}
                value={mail}
                onChange={(e) => setMail(e.target.value)}
              />
              <p>パスワード</p>
              <input
                className={styles.input_text}
                placeholder={"パスワードを入力してください"}
                type={"text"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className={styles.login_content_footer}>
              <div className={styles.login_button}>
                <a href="#" onClick={handleSubmit}>開始</a>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div className={`${styles.column} ${styles.right_screen}`}>
      </div>
     </div>
      {/* <div className={styles.page}>
        <div className={styles.link}>
          <Link href='login'>login!!</Link>
        </div>
        <div className={styles.link_blue}>
          <Link href='top'>top!!</Link>
        </div>
      </div> */}
    </>

  );
}
