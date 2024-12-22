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
  const [error, setError] = useState('')

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    const file = acceptedFiles[0];

    if (rejectedFiles.length > 0) {
      setError('ファイル形式またはサイズが不正です');
      return;
    }

    if (file) {
        const imageUrl = URL.createObjectURL(file);
        setUploadedFile({ file, preview: imageUrl });
        localStorage.setItem('uploadedImage', imageUrl);
        localStorage.setItem('uploadedFileName', file.name);
        localStorage.setItem('uploadedFileSize', file.size);
        setPreviewUrl(imageUrl);
        setUploadProgress(0);

      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 200);

      setError(''); // エラーをクリア
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
    },
    maxSize: 5242880, // 5MB
    multiple: false,
  });

  const handleDelete = () => {
    setUploadedFile(null);
    setPreviewUrl('');
    setUploadProgress(0);
    setNickName('');
    setError('');
  };

  const validateNickName = (value) => {
    const maxLength = 20;
    const pattern = /^[ぁ-んァ-ヶ一-龥０-９0-9a-zA-Z]+$/;

    if (!pattern.test(value)) {
      return 'コールネームには全角文字（ひらがな、カタカナ、漢字、数字、アルファベット）のみを入力してください';
    }

    if (value.length > maxLength) {
      return `コールネームは最大${maxLength}文字までです`;
    }

    // ここで既存のニックネームとの重複をチェック
    const existingNickNames = ['猫1', '猫2']; // 仮の既存データ
    if (existingNickNames.includes(value)) {
      return 'コールネームが重複しています';
    }

    return ''; // エラーなし
  };

  const handleSetNickName = (e) => {
    const value = e.target.value;
    setNickName(value);
};

  const handleNextpage = () => {
    const maxLength = 20;
    const pattern = /^[ぁ-んァ-ヶ一-龥０-９0-9a-zA-Z]+$/;

    if (!uploadedFile) {
        alert('画像をアップロードしてください');
        return;
    }

    if (!nickName) {
        alert('コールネームを入力してください');
        return;
    }

    if (!pattern.test(nickName)) {
      return 'コールネームには全角文字（ひらがな、カタカナ、漢字、数字、アルファベット）のみを入力してください';
        return;
    }

    if (nickName.length > maxLength) {
        alert(`コールネームは最大${maxLength}文字までです`);
        return;
    }

    // 既存のニックネームとの重複チェック
    const existingNickNames = ['猫1', '猫2']; // 仮の既存データ
    if (existingNickNames.includes(nickName)) {
        alert('コールネームが重複しています');
        return;
    }

    router.push(`/registration/confirmation?nickName=${encodeURIComponent(nickName)}`);
};

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-8">
      {/* Progress Steps */}
      <StepBar currentStep={1}/>

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
                <p className="font-medium">{uploadedFile.file.name}</p>
                <p className="text-muted-foreground">{Math.round(uploadedFile.file.size / 1024)} KB</p>
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
              {error && <p className="text-red-500 text-sm">{error}</p>}
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
          disabled={!uploadedFile || !nickName || error}
        >
          登録内容を確認する
        </Button>
      </div>
    </div>
  )
}
