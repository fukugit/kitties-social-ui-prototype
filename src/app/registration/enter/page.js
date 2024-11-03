'use client'
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import axios from "axios";
import { Button } from "@/components/ui/button"
import { useDropzone } from 'react-dropzone';

export default function Registration() {
  const router = useRouter()

  const nextpage = () => {
    router.push('/registration/confirmation')
  }

  const onDrop = (acceptedFiles) => {
    console.log(acceptedFiles);
  }

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <>
      <div className="container flex justify-center h-screen w-full mt-10">
        <div className="w-100 flex gap-2 flex-col items-center">
          <p className="text-2xl flex justify-start">猫情報登録</p>
          <p className="mb-10">
            血統書の情報から親猫情報を登録します。登録する猫の頭数分の血統書をアップロードしてください。
          </p>
          <div {...getRootProps()} className="border-2 border-dashed border-gray-400 p-4 text-center">
            <input {...getInputProps()} />
            <p>クリックしてアップロード またはドラッグ＆ドロップしてください</p>
          </div>
          <Button className="w-full bg-blue-800 hover:bg-blue-900" size="lg" variant="default"
            onClick={nextpage}>次へ
          </Button>
        </div>

      </div>
    </>
  )
}
