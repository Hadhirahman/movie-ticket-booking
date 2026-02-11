"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";

export default function BookingForm({ movie }) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    showtime: "",
    numberOfTickets: 1
  });

  const [selectedSeats, setSelectedSeats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  

  const handleChange = (e) => {
setError("");
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const handleShowtimeChange = (e) => {
    const time = e.target.value;
    setFormData({ ...formData, showtime: time });

    const selected = movie.showtimes.find(s => s.time === time)
    console.log("Selected showtime:", selected);

    setSelectedSeats(selected?.availableSeats ?? 0);
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (formData.numberOfTickets > selectedSeats) {
      setError("Not enough seats available");
      setLoading(false);
      return;
    }

    try {
      const { data } = await api.post("/bookings", {
        ...formData,
        movieId: movie._id
      });

      router.push(`/success?code=${data.confirmationCode}`);
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 bg-white/10 backdrop-blur-md rounded-xl p-5 w-[340px]"
    >
      <h3 className="text-sm font-semibold mb-3">
          Select Showtime
        </h3>

      {error && (
        <p className="text-red-600 text-sm">{error}</p>
      )}

      <input
        name="name"
        placeholder="Your Name"
        required
        onChange={handleChange}
         className="w-full mb-4 bg-black/40 border border-white/20 
                 rounded-lg px-3 py-2 text-sm"
      />

      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        onChange={handleChange}
         className="w-full mb-4 bg-black/40 border border-white/20 
                 rounded-lg px-3 py-2 text-sm"
      />
      

      <select
       
        onChange={handleShowtimeChange}
        className="w-full mb-3 bg-black/40 border border-white/20 
                       rounded-lg px-3 py-2 text-sm"
      >
        <option value="">Select Showtime</option>
        {movie.showtimes.map((s) => (
          <option
            key={s.time} value={s.time} disabled={s.availableSeats === 0}
          >
            {new Date(s.time).toLocaleString()}
          </option>
        ))}
      </select>

      {selectedSeats !== null && (
        <p className="text-sm text-gray-600">
          Available Seats:{" "}
          <span className="font-semibold">
            {selectedSeats}
          </span>
        </p>
      )}

      <input
        name="numberOfTickets"
        type="number"
        min="1"
        onChange={handleChange}
         className="w-full mb-4 bg-black/40 border border-white/20 
                 rounded-lg px-3 py-2 text-sm"
      />

      <button
        disabled={loading || selectedSeats === 0} className="w-full bg-red-600 hover:bg-red-700 
                 py-2.5 rounded-lg font-medium transition">
        {loading ? "Booking..." : "Confirm Booking"}
      </button>

          
     
    </form>

    
  );
}