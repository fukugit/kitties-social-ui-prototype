'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Trash2 } from 'lucide-react'
import { pedigreeUpload } from "@/service/pedigreeService";

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import StepBar from "@/app/stepbar/stepbar";

export default function Component() {
  const router = useRouter()
  const searchParams = useSearchParams();
  const nickName = searchParams.get('nickName'); // クエリパラメータからNickNameを取得

  
  const [image, setImage] = useState(null);

  useEffect(() => {
    // ページロード時にlocalStorageから画像を取得
    const storedImage = localStorage.getItem('uploadedImage');
    console.log(storedImage)
    if (storedImage) {
      
      setImage(storedImage);
    }
  }, []);

  //画像登録＆支払い処理
  const handlePayment = async() => {
    // //console.log("Hi")
    // if (!image) {
    //   alert('画像を選択してください');
    //   return;
    // }

    // // Blob URLからBlobオブジェクトを取得
    // const blob = await fetch(image).then((res) => res.blob());

    // const formData = new FormData();
    // formData.append('nickname',nickName);
    // // formData.append('file', image);
    // formData.append('file', blob, 'uploaded-image.jpg'); // ファイル名を指定
    // console.log(image);

    // try {
    //   // JWTトークンを取得（ここではlocalStorageから取得する例を示します）
    //   // const token = localStorage.getItem('jwtToken'); // トークンの保存場所に応じて変更してください
    //   const response = await pedigreeUpload(formData)
    //   console.log('成功:', response.data);
    // } catch (error) {
    //   console.error('エラー:', error);
    // }  
    
    //stripe pageに遷移
    router.push('../stripe');

  };

  

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-8">
      {/* Progress Steps */}
      <StepBar/>

      <div className="space-y-4">
        <h1 className="text-2xl font-bold">入力情報確認</h1>
        <p className="text-muted-foreground">
          登録内容をご確認ください。問題がなければ、支払い手続きへお進みください。
        </p>
      </div>

      <div className="border rounded-lg p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-sm space-y-1">
              <p className="font-medium">aaa</p>
              <p className="text-muted-foreground">bbb</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" disabled>
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
        <div className="mt-4 space-y-4">
          <img src={image} alt="Preview" className="max-w-full h-auto rounded-lg" />
          <div className="flex items-center gap-2">
            <Input
              value={nickName}
              disabled
              className="max-w-sm bg-muted"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button
          variant="outline"
          onClick={() => router.push('/registration/enter')}
        >
          戻る
        </Button>
        <Button
          onClick={handlePayment}
        >
          支払い手続き
        </Button>
      </div>
    </div>
  )
}