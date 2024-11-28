'use client'

import React, { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Upload, Trash2, HelpCircle } from 'lucide-react'
import { useDropzone } from 'react-dropzone'

import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import StepBar from "@/app/stepbar/stepbar";

export default function Component() {
  const router = useRouter()
  const [uploadedFile, setUploadedFile] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [previewUrl, setPreviewUrl] = useState('')
  const [nickName, setNickName] = useState('')

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0]
    if (file) {
      // setUploadedFile(file)
      const imageUrl = URL.createObjectURL(file);
      setUploadedFile({ file, preview: imageUrl });
      // 画像URLをlocalStorageに保存
      localStorage.setItem('uploadedImage', imageUrl);
      // プレビュー表示
      setPreviewUrl(imageUrl)
      // Simulate upload progress
      setUploadProgress(0)
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 10
        })
      }, 200)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
    },
    maxSize: 5242880, // 5MB
    multiple: false
  })

  const handleDelete = () => {
    setUploadedFile(null)
    setPreviewUrl('')
    setUploadProgress(0)
    setNickName('')
  }

  const handleSetNickName = (e) => {
    setNickName(e.target.value); // 入力された値を更新
  };

  const handleNextpage = () => {
    router.push(`/registration/confirmation?nickName=${encodeURIComponent(nickName)}`);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-8">
      {/* Progress Steps */}
      <StepBar/>

      <div className="space-y-4">
        <h1 className="text-2xl font-bold">猫登録</h1>
        <p className="text-muted-foreground">
          血統書の情報から親猫情報を登録します。登録する猫の頭数分の血統書をアップロードしてください。
        </p>
      </div>

      {uploadedFile ? (
        <div className="border rounded-lg p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-sm space-y-1">
                <p className="font-medium">{uploadedFile.name}</p>
                <p className="text-muted-foreground">{Math.round(uploadedFile.size / 1024)} KB</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={handleDelete}>
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>
          <Progress value={uploadProgress} className="w-full" />
          {previewUrl && (
            <div className="mt-4 space-y-4">
              <img src={previewUrl} alt="Preview" className="max-w-full h-auto rounded-lg" />
              <div className="flex items-center gap-2">
                <Input
                  placeholder="コールネームを追加"
                  value={nickName}
                  onChange={handleSetNickName}
                  className="max-w-sm"
                />
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <HelpCircle className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>コールネーム（呼び方など）を追加してください。後から修正することもできます。コールネームは、親猫を識別する際に使用します。</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center hover:bg-muted/50 transition-colors cursor-pointer ${
            isDragActive ? 'border-primary' : 'border-muted-foreground/25'
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
          <p className="mt-2 text-sm font-medium">クリックしてアップロード</p>
          <p className="text-xs text-muted-foreground mt-1">またはドラッグアンドドロップ</p>
          <p className="text-xs text-muted-foreground mt-1">PNG、またはJPG (最大800×400px)</p>
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
          onClick={handleNextpage}
          disabled={!uploadedFile}
        >
          登録内容を確認する
        </Button>
      </div>
    </div>
  )
}