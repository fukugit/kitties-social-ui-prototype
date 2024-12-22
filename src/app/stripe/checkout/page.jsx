'use client';

import React,{ useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '@/components/checkoutForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createPaymentIntent } from '@/service/checkoutService';

export default function Home() {
  const [clientSecret, setClientSecret] = useState('');
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

  useEffect(() => {

    //PaymentIntent
    createPaymentIntent({
      amount: 2000,
      currency: 'JPY',
      payment_method_types: 'card'
    })
      .then((data) => {
        setClientSecret(data.data.clientSecret);
        console.log('setClientSecretは成功しました');
      })
      .catch((error) => {
        setMessage('決済の初期化に失敗しました。');
        console.error('Error:', error);
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

