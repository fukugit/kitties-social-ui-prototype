'use client'
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import axios from "axios";
import { Button } from "@/components/ui/button"

export default function Registration() {
  const router = useRouter()

  const run_add = () => {
    axios.post('http://127.0.0.1:5000/cat/add', {
      id: "aaaa",
      pw: "dddd"
    })
    .then( (response) => {
      alert(response.data.data.id)
    })
    .catch( (error) => {
      alert("error!!!")
    })
  }

  // stripeの商品登録ページに遷移する
  const product_add = () => {
    router.push('../stripe/product');
  }
  // stripeの決済ページ
  const product_checkout = () => {
    router.push('../stripe/checkout');
  }

  return (
    <>
      <div className="flex justify-center h-screen w-full mt-10">
        <div className="w-80 flex gap-2 flex-col items-center">
          <p className="text-2xl">開発者用ツール</p>
          <Button className="mt-20 w-full bg-blue-800 hover:bg-blue-900" size="lg" variant="default"
            onClick={run_add}>/cat/add
          </Button>
          <Button className="mt-20 w-full bg-green-400 hover:bg-blue-900" size="lg" variant="default"
            onClick={product_add}>/stripe
          </Button>
          <Button className="mt-20 w-full bg-green-400 hover:bg-blue-900" size="lg" variant="default"
            onClick={product_checkout}>/stripe/checkout
          </Button>
        </div>

      </div>
    </>
  )
}
