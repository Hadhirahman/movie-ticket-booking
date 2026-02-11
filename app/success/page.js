"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function SuccessPage() {
  const params = useSearchParams();
  const router = useRouter();
  const code = params.get("code");

  if (!code) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Invalid confirmation</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">

      <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-black to-black" />

  
      <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl 
                      shadow-2xl p-8 w-full max-w-md text-center text-white">


        <div className="text-5xl mb-4">
          🎉
        </div>

        <h1 className="text-2xl font-bold">
          Booking Confirmed
        </h1>

        <p className="mt-2 text-gray-300 text-sm">
          Your tickets have been successfully booked
        </p>

        <div className="mt-6 bg-black/40 border border-white/20 
                        rounded-xl py-4">
          <p className="text-xs text-gray-400">
            Confirmation Code
          </p>
          <p className="text-3xl font-mono font-bold tracking-widest mt-1">
            {code}
          </p>
        </div>

        <div className="my-6 border-t border-white/10" />

  
        <button
          onClick={() => router.push("/")}
          className="w-full bg-red-600 hover:bg-red-700
                     py-2.5 rounded-lg font-medium transition"
        >
          Book Another Movie
        </button>
      </div>
    </div>
  );
}