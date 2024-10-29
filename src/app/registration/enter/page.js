'use client'
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import axios from "axios";
import { Button } from "@/components/ui/button"

export default function Registration() {
  const router = useRouter()

  const nextpage = () => {
    router.push('/registration/confirmation')
  }
  return (
    <>
      <div className="container flex justify-center h-screen w-full mt-10">
        <div className="w-80 flex gap-2 flex-col items-center">
          <p className="text-2xl">猫情報登録</p>
          <p className="mb-10">
            xxxxxxxxxxxxx<br/>
          </p>
          <Button className="w-full bg-blue-800 hover:bg-blue-900" size="lg" variant="default"
            onClick={nextpage}>次へ
          </Button>
        </div>

      </div>
    </>
  )
}
