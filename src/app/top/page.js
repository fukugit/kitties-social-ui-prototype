'use client'
import Link from "next/link";
import { useSearchParams } from 'next/navigation';

export default function Home() {
  // Get token from URL query string.
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  return (
    <div>
      {token ? ( // message が存在する場合のみ表示
        <div className="flex justify-center items-center h-screen w-full bg-emerald-300">
          <p className="w-48">token: {token}</p>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen w-full bg-amber-300">
          <p className="w-48">API doens't work...</p>
        </div>
      )}
    </div>
  );
}
