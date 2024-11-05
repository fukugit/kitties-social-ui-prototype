'use client'
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useDropzone } from 'react-dropzone';
import StepBar from "@/app/stepbar/stepbar";

export default function Registration() {
  const router = useRouter();
  const [uploadedFiles, setUploadedFiles] = useState([]); // アップロードされたファイルを管理するステート
  const [callName, setCallName] = useState(""); // コールネームのステート
  const [isTooltipVisible, setTooltipVisible] = useState(false); // ツールチップの表示状態

  const nextpage = () => {
    router.push('/registration/confirmation');
  }
  const prevpage = () => {
    router.push('/registration/confirmation');
  }

  const onDrop = (acceptedFiles) => {
    console.log(acceptedFiles);
    // ファイルのプレビューURLを保存
    const newFiles = acceptedFiles.map(file => {
      return {
        file,
        preview: URL.createObjectURL(file)
      };
    });
    setUploadedFiles([...uploadedFiles, ...newFiles]);
  }

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <>
      <div className="container flex justify-center h-screen w-full mt-10">
        <div className="w-100 flex gap-2 flex-col items-center">
          <StepBar />
          <p className="text-2xl flex justify-start">猫情報登録</p>
          <p className="mb-10">
            血統書の情報から親猫情報を登録します。登録する猫の頭数分の血統書をアップロードしてください。
          </p>
          <div {...getRootProps()} className="border-2 border-dashed border-gray-400 p-4 text-center mb-4">
            <input {...getInputProps()} />
            <p>クリックしてアップロード またはドラッグ＆ドロップしてください</p>
          </div>
          {/* アップロードした画像のプレビュー */}
          <div className="flex flex-wrap gap-4">
            {uploadedFiles.map((fileObj, index) => (
              <div key={index} className="border rounded p-2 text-center">
                <img src={fileObj.preview} alt={fileObj.file.name} className="w-32 h-32 object-cover mb-2" />
                <p>{fileObj.file.name}</p>
                <p>{(fileObj.file.size / 1024).toFixed(2)} KB</p>
              </div>
            ))}
          </div>
          {/* コールネームの入力欄 */}
          <div className="w-full flex flex-col items-center mt-4">
            <label htmlFor="callName" className="text-gray-600 mb-2">コールネームを追加</label>
            <div className="container flex justify-center">
              
              <input
                type="text"
                id="callName"
                value={callName}
                onChange={(e) => setCallName(e.target.value)}
                className="w-full border border-gray-300 rounded p-2 mb-4"
                placeholder="コールネームを追加"
              />
              {/* ツールチップアイコン */}
              <div
                className="relative ml-2 text-gray-500 cursor-pointer"
                onMouseEnter={() => setTooltipVisible(true)}
                onMouseLeave={() => setTooltipVisible(false)}
              >
                <span className="font-bold text-lg">?</span>
                {/* ツールチップ */}
                {isTooltipVisible && (
                  <div className="absolute left-full ml-2 w-48 p-3 bg-black text-white text-sm rounded-lg shadow-lg">
                    <p>コールネーム（猫のあだ名）を追加しておくと、後から探しやすくなります。</p>
                    <p>※コールネームは、猫登録後も編集が可能です。</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="container flex justify-between items-center">
            <Button className="w-full bg-blue-800 hover:bg-blue-900 m-5" size="lg" variant="default"
              onClick={prevpage}>戻る
            </Button>
            <Button className="w-full bg-blue-800 hover:bg-blue-900" size="lg" variant="default"
              onClick={nextpage}>登録内容を確認する
            </Button>  
          </div>
        </div>
      </div>
    </>
  )
}
