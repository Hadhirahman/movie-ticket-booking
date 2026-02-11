"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import api from "@/services/api";

export default function PaymentPage() {
  const params = useSearchParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const paymentData = {
    movieId: params.get("movieId"),
    name: params.get("name"),
    email: params.get("email"),
    showtime: params.get("showtime"),
    numberOfTickets: Number(params.get("tickets")),
  };

  const handlePayment = async () => {
    setLoading(true);
    setError("");

    try {
     
      await api.post("/payments", {
        amount: paymentData.numberOfTickets * 150
      });

    
    const { data } = await api.post("/bookings", {
  ...paymentData,
  amount: paymentData.numberOfTickets * 150, 
});

      router.push(`/success?code=${data.confirmationCode}`);

    } catch (err: any) {
      setError(err.response?.data?.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 w-[360px] text-white">

        <h1 className="text-xl font-semibold mb-4">
          Payment
        </h1>

        <div className="text-sm text-gray-300 space-y-1 mb-4">
          <p>Name: {paymentData.name}</p>
          <p>Email: {paymentData.email}</p>
          <p>Tickets: {paymentData.numberOfTickets}</p>
          <p>
            Amount: ₹{paymentData.numberOfTickets * 150}
          </p>
        </div>

        {error && (
          <p className="text-red-400 text-sm mb-3">
            {error}
          </p>
        )}

        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700
                     py-2.5 rounded-lg font-medium transition"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
}