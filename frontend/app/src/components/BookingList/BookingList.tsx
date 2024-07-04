"use client";

import React, { useState, useEffect, SetStateAction, Dispatch } from "react";
import Link from "next/link";

import { Booking } from "../../../utils/interface";
import { getAllBookings } from "../../service/booking";

import { CiCalendarDate } from "react-icons/ci";
import { CiTimer } from "react-icons/ci";
import BookingSkeleton from "../Skeleton/Skeleton";

const BookingsList: React.FC = (): JSX.Element => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const bookingsData: Booking[] = await getAllBookings();
        setBookings(bookingsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center">
        {Array.from({ length: 15 }).map((_, index) => (
          <BookingSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (bookings?.length === 0) {
    return (
      <div className="w-full h-[60px] mt-10 flex items-center justify-center">
        <h1 className="text-gray-500 font-bold text-3xl">No bookings yet!</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="font-semibold text-4xl my-5">Bookings List</h2>
      <div className="w-full max-w-3xl space-y-4">
        {bookings.map((booking: Booking) => (
          <div
            key={booking.id}
            className="w-full p-5 bg-white rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-300"
          >
            <Link href={`/booking/${booking.id}`}>
              <div className="flex justify-between">
                <div className="flex items-center">
                  <CiCalendarDate className="text-xl mr-2 text-gray-600" />
                  <span className="font-semibold text-gray-800">
                    A Booking on Date:
                  </span>
                  <span className="ml-2 text-gray-700">{booking.date}</span>
                </div>
                <div className="flex items-center w-35 mx-2">
                  <CiTimer className="text-xl mr-2 text-gray-600" />
                  <span className="font-semibold text-gray-800">
                    Starting At:
                  </span>
                  <span className="ml-2 text-gray-700">
                    {booking.start_time}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingsList;
