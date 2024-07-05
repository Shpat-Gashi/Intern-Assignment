import { AxiosResponse } from "axios";
import axios from "../../utils/axios";

import { addNewBooking, Booking } from "../../utils/interface";

export const getAllBookings = async (): Promise<Booking[]> => {
  try {
    console.log("hello");
    const response: AxiosResponse<Booking[]> = await axios.get("/api/bookings");
    return response.data;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw new Error("Failed to fetch bookings");
  }
};

export const getBookingById = async (id: number): Promise<Booking> => {
  try {
    const response = await axios.get(`/api/bookings/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching booking:", error);
    throw new Error("Failed to fetch booking");
  }
};

export const addBooking = async (
  newBooking: addNewBooking
): Promise<addNewBooking> => {
  try {
    const response = await axios.post("/api/bookings", newBooking);
    return response.data;
  } catch (error) {
    console.error("Error inserting a new booking:", error);
    throw new Error("Something went wrong!");
  }
};
