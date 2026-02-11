"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react"; // 1. Import Suspense
import Link from "next/link";

// 2. Move all logic using useSearchParams into this sub-component
function SuccessDetails() {
  const searchParams = useSearchParams();
  const confirmationCode = searchParams.get("code");

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 text-center text-white border border-white/20">
      <div className="text-green-500 text-5xl mb-4">✓</div>
      <h1 className="text-2xl font-bold mb-2">Booking Confirmed!</h1>
      <p className="text-gray-300 mb-6">
        Your confirmation code is: 
        <span className="block text-white font-mono font-bold mt-2 text-xl">
          {confirmationCode || "Checking..."}
        </span>
      </p>
      <Link 
        href="/" 
        className="inline-block bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg transition font-medium"
      >
        Go Back Home
      </Link>
    </div>
  );
}

// 3. The main Page component just provides the layout and the Suspense boundary
export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Suspense fallback={<div className="text-white animate-pulse">Loading Confirmation...</div>}>
        <SuccessDetails />
      </Suspense>
    </div>
  );
}