'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useStripe } from '@stripe/react-stripe-js';



function CompletionContent() {
    const [message, setMessage] = useState('');
    const searchParams = useSearchParams();
    const stripe = useStripe();
  
    useEffect(() => {
      if (!stripe) {
        return;
      }
  
      const clientSecret = searchParams.get('payment_intent_client_secret');
  
      if (clientSecret) {
        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
          switch (paymentIntent.status) {
            case 'succeeded':
              setMessage('決済が完了しました！');
              break;
            case 'processing':
              setMessage('決済処理中です。');
              break;
            case 'requires_payment_method':
              setMessage('決済に失敗しました。別の決済方法をお試しください。');
              break;
            default:
              setMessage('エラーが発生しました。');
              break;
          }
        });
      }
    }, [stripe, searchParams]);
  
    return (
      <div>
        <h1>決済結果</h1>
        <p>{message}</p>
      </div>
    );
  }
  
  export default function CompletionPage() {
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    
    return (
      <Elements stripe={stripePromise}>
        <CompletionContent />
      </Elements>
    );
  }