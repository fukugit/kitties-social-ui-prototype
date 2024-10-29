'use client'
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import axios from "axios";
import { Button } from "@/components/ui/button"

export default function Home() {
  const router = useRouter();

  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    axios.post('http://127.0.0.1:5000/auth', {
      id: mail,
      pw: password
    })
    .then( (response) => {
      if (response.data.result === 'success') {
        const token = response.data.access_token
        router.push(`/top?token=${encodeURIComponent(token)}`);
      } else {
        router.push('/top')
      }
    })
    .catch( (error) => {
      router.push('/top')
    })
  }
  return (
    <>
     <div className="flex">
      <div className="h-screen w-full">
        <h1 className="ml-10 mt-6">🐈️ SPP</h1>
        <div className="h-4/5 flex flex-col justify-center items-center">
          <div className="w-80 flex flex-col items-start gap-1">

            <div className="w-full mb-6">
              <p>メール</p>
              <input
                className="mb-6 w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder={"メールアドレスを入力してください"}
                type={"text"}
                value={mail}
                onChange={(e) => setMail(e.target.value)}
              />
              <p>パスワード</p>
              <input
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder={"パスワードを入力してください"}
                type={"text"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button className="w-full bg-blue-800 hover:bg-blue-900" size="lg" variant="default"
              onClick={login}>ログイン
            </Button>

            <div className="w-full mt-10">
              <h2>アカウントをまだお待ちになっていない方は</h2>
              <Link href="/signup">
                <p className="font-medium text-blue-800 dark:text-blue-800 hover:underline">30日間の無料トライアルを開始</p>
              </Link>
            </div>

          </div>
        </div>
      </div>
      <div className="h-screen w-full bg-yellow-200">
      </div>
     </div>
    </>

  );
}
