'use client'
import React, { Suspense } from 'react';
import Link from "next/link";
import Detail from './detail';

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Detail />
    </Suspense>
  );
}
