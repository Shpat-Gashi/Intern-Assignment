export interface Booking {
  id: number;
  date: string;
  start_time: string;
  end_time: string;
  doctor_name: string;
  service: string;
}

export interface addNewBooking {
  date: string;
  start_time: string;
  end_time: string;
  doctor_name: string;
  service: string;
}
