"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";

// 1. Logic inside the child component
function SuccessContent() {
  const searchParams = useSearchParams();
  const confirmationCode = searchParams.get("code");

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 text-center text-white">
      <div className="text-green-500 text-5xl mb-4">✓</div>
      <h1 className="text-2xl font-bold mb-2">Booking Confirmed!</h1>
      <p className="text-gray-300 mb-6">
        Your confirmation code is: <span className="text-white font-mono font-bold">{confirmationCode || "N/A"}</span>
      </p>
      <Link 
        href="/" 
        className="inline-block bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg transition"
      >
        Return Home
      </Link>
    </div>
  );
}

// 2. Main Page component wrapping in Suspense
export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Suspense fallback={<div className="text-white">Loading confirmation...</div>}>
        <SuccessContent />
      </Suspense>
    </div>
  );
}