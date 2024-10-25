'use client'
import React, { Suspense } from 'react';
import Link from "next/link";
import { useSearchParams } from 'next/navigation';

export default function Home() {
  // Get token from URL query string.
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        {token ? (
          <div className="flex justify-center items-center h-screen w-full bg-emerald-300">
            <p className="w-48">token: {token}</p>
          </div>
        ) : (
          <div className="flex justify-center items-center h-screen w-full bg-amber-300">
            <p className="w-48">API does not work...</p>
          </div>
        )}
      </div>
    </Suspense>
  );
}
