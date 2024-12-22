'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import StepBar from "@/app/stepbar/stepbar";

export default function Component() {
  const router = useRouter()
  const searchParams = useSearchParams();
  const nickName = searchParams.get('nickName'); // クエリパラメータからNickNameを取得
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState(0);
  
  const [image, setImage] = useState(null);

  useEffect(() => {
    // ページロード時にlocalStorageから画像を取得
    const storedImage = localStorage.getItem('uploadedImage');
    const storedFileName = localStorage.getItem('uploadedFileName');
    const storedFileSize = localStorage.getItem('uploadedFileSize');


    if (storedImage) {
      setImage({
        preview: storedImage,
        name: storedFileName,
        size: storedFileSize ? Math.round(storedFileSize / 1024) : 0, // KBに変換
      });
    }
  }, []);
    

  const handlePayment = async () => {
    if (!image) {
      alert('画像を選択してください');
      return;
    }

    router.push('../stripe');
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-8">
      {/* Progress Steps */}
      <StepBar currentStep={2} />

      <div className="space-y-4">
        <h1 className="text-2xl font-bold">入力情報確認</h1>
        <p className="text-muted-foreground">
          登録内容をご確認ください。問題がなければ、支払い手続きへお進みください。
        </p>
      </div>

      {image && (
        <div className="border rounded-lg p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-sm space-y-1">
              <p className="font-medium">{image.name}</p>
              <p className="text-muted-foreground">{image.size} KB</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" disabled>
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>
          <div className="mt-4 space-y-4">
            <img src={image.preview} alt="Preview" className="max-w-full h-auto rounded-lg" />
            <div className="flex items-center gap-2">
              <p className="max-w-sm bg-muted p-2 rounded">{nickName}</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between pt-4">
        <Button
          variant="outline"
          onClick={() => router.push('/registration/pre')}
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
  );
}
