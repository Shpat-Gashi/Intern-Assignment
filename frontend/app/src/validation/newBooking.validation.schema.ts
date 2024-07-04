import * as Yup from "yup";

export const newBookingValidationSchema = Yup.object().shape({
  service: Yup.string().required("Service is required"),
  doctor_name: Yup.string().required("Doctor name is required"),
  start_time: Yup.string().required("Start time is required"),
  end_time: Yup.string().required("End time is required"),
  date: Yup.string().required("Date is required"),
});
