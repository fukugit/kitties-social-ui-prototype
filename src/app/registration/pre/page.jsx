'use client'
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function Component() {
  const router = useRouter()

  return (
    <>
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <h1 className="text-2xl font-bold mb-4">猫登録</h1>
        <p className="text-sm text-muted-foreground mb-8">
          以後の必要情報の入力前段階を表示します。まず、利用する上での確認のため以下をよくアプローチしてください。
        </p>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4">事前に準備いただくもの</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>写真1-3枚(JPG/PNG形式でストック、または撮影したデータ)</li>
            <li>ファイル形式：JPG/PNG/HEIF/HEIC</li>
            <li>ファイルサイズ：10MB以下</li>
          </ul>
          <Card className="mt-4 p-4 bg-muted">
            <div className="aspect-[3/4] bg-gray-200 mx-auto max-w-[200px] flex items-center justify-center">
              <p className="text-center text-sm">品種別<br />サンプル画像</p>
            </div>
          </Card>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4">撮影時のポイント</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>ペットの全身写真と、顔がはっきりとわかるような写真にします</li>
            <li>暗い場所で撮影しないように注意します</li>
            <li>スマホで撮影する際は、画面が揺れないようにフレームに収めます</li>
            <li>ペットが落ち着いた時間に、焦らずに上手く撮ってください</li>
          </ul>
          <div className="grid grid-cols-4 gap-4 mt-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-muted rounded-lg" />
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4">iPhoneで撮影する場合</h2>
          <p className="text-sm text-muted-foreground mb-2">
            iPhoneで「HEIC」形式の画像を選択した場合、予め以下をやっておくと良い：
          </p>
          <p className="text-sm font-medium">設定アプリ ＞ [カメラ] ＞ [フォーマット]</p>
          <p className="text-sm mb-2">「互換性優先」を選択</p>
          <p className="text-sm text-muted-foreground">
            撮影したベストショットをアップロードする際に確認してください。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4">手数料</h2>
          <p className="text-sm mb-2">登録手数料：xxx円</p>
          <p className="text-xs text-muted-foreground">※支払方法：クレジットカード決済</p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4">クレジットカード決済について</h2>
          <p className="text-sm mb-4">
            ご利用可能なクレジットカードの種類：Visa/Mastercard/JCB/American Express/Diners Club/Discover/etc
          </p>
          <div className="flex gap-2 flex-wrap">
            {['visa', 'mastercard', 'jcb', 'amex', 'diners', 'discover'].map((card) => (
              <div
                key={card}
                className="w-12 h-8 bg-muted rounded flex items-center justify-center text-xs"
              >
                {card}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4">手数料・返金について</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>手数料は非課税です</li>
            <li>領収書設定画面の「決済情報管理」＞ Stripe管理画面から行えます。</li>
          </ul>
        </section>

        <div className="flex justify-between gap-4 mt-8">
          <Button
            variant="outline"
            onClick={() => router.push('/top')}
            className="w-full"
          >
            戻る
          </Button>
          <Button
            onClick={() => router.push('/registration/enter')}
            className="w-full"
          >
            猫登録へ進む
          </Button>
        </div>
      </div>
    </>
  )
}