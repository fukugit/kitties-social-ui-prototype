'use client';

import React, { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '@/components/checkoutForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createPaymentIntent } from '@/service/checkoutService'; // サーバーとの通信ロジック

export default function Home() {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    //console.log('Request URL:', `${process.env.NEXT_PUBLIC_BASE_URL}/payment_intent/createpaymentintent`);
    console.log("アクセススタート");
    // サーバーからclientSecretを取得
    createPaymentIntent({
      amount: 2000, // 金額
      currency:  'JPY', // 通貨
      payment_method_types: 'card', // 支払い方法
    })
      .then((data) => {
        //console.log(data.data.clientSecret)
        setClientSecret(data.data.clientSecret);
      })
      .catch((error) => {
        console.error('Error retrieving payment intent:', error);
      });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Stripe Payment Demo</h1>
      <Card className="w-full max-w-[520px] mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">決済フォーム</CardTitle>
          <CardDescription>カード情報を入力して決済を完了してください。</CardDescription>
        </CardHeader>
        <CardContent>
          {clientSecret ? (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm />
            </Elements>
          ) : (
            <p>Loading payment form...</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}