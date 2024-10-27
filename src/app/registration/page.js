'use client'
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import axios from "axios";
import { Button } from "@/components/ui/button"

export default function Registration() {
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
        router.push('/error')
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
        test
      </div>
     </div>
    </>

  );
}
