"use client";

import { CiTimer } from "react-icons/ci";
import { Booking } from "../../../../utils/interface";
import { getBookingById } from "../../../service/booking";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaUserDoctor } from "react-icons/fa6";
import BookingSkeleton from "@/components/Skeleton/Skeleton";

interface BookingDetailsPageProps {
  params: {
    id: number;
  };
}

const BookingDetailsPage: React.FC<BookingDetailsPageProps> = ({ params }) => {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const id: number = params.id;

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const bookingsData = await getBookingById(id);
        setBooking(bookingsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setLoading(false);
      }
    };

    fetchBookings();
  }, [id]);

  const handleBackToList = () => {
    router.push("/");
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600">
        {Array.from({ length: 1 }).map((_, index) => (
          <BookingSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!booking) {
    return <div>No booking found.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl p-5 bg-white rounded-lg shadow-lg">
        <h2 className="font-bold text-5xl text-center text-gray-800 mb-8">
          Booking Details
        </h2>
        <div className="flex flex-row items-center mb-6">
          <FaUserDoctor className="text-3xl text-purple-600 mr-4" />
          <div className="text-xl">
            <p className="text-gray-800 font-semibold mb-1">
              This Booking is with
            </p>
            <p className="text-gray-700">{booking.doctor_name}</p>
            <p className="text-gray-700">{booking.service}</p>
          </div>
        </div>
        <div className="flex items-center mb-6">
          <CiTimer className="text-3xl text-purple-600 mr-4" />
          <div className="text-xl">
            <p className="text-gray-800 font-semibold mb-1">and it ends on:</p>
            <p className="text-gray-700">{booking.end_time}</p>
          </div>
        </div>
        <button
          onClick={handleBackToList}
          className=" bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg w-full transition duration-300 ease-in-out"
        >
          Back to Homepage
        </button>
      </div>
    </div>
  );
};

export default BookingDetailsPage;
