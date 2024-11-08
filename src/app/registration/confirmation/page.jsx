'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import StepBar from "@/app/stepbar/stepbar";

export default function Component() {
  const router = useRouter()

  // In a real application, you would fetch this data from your state management solution or API
  const mockData = {
    fileName: '血統書01.jpg',
    fileSize: '200 KB',
    previewUrl: '/placeholder.svg?height=400&width=300',
    callName: 'タマ'
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-8">
      {/* Progress Steps */}
      <StepBar/>

      <div className="space-y-4">
        <h1 className="text-2xl font-bold">猫登録確認</h1>
        <p className="text-muted-foreground">
          登録内容をご確認ください。問題がなければ、支払い手続きへお進みください。
        </p>
      </div>

      <div className="border rounded-lg p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-sm space-y-1">
              <p className="font-medium">{mockData.fileName}</p>
              <p className="text-muted-foreground">{mockData.fileSize}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" disabled>
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
        <div className="mt-4 space-y-4">
          <img src={mockData.previewUrl} alt="Preview" className="max-w-full h-auto rounded-lg" />
          <div className="flex items-center gap-2">
            <Input
              value={mockData.callName}
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
          onClick={() => router.push('/registration/payment')}
        >
          支払い手続き
        </Button>
      </div>
    </div>
  )
}