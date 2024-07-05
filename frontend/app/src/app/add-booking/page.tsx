"use client";

import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import { IoWarningOutline } from "react-icons/io5";
import { SyncLoader } from "react-spinners";
import { useToast } from "@/components/ui/use-toast";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { addBooking } from "@/service/booking";
import { newBookingValidationSchema } from "@/validation/newBooking.validation.schema";
import { endTimes, startTimes } from "../../../utils/data";

const AddNewBooking: React.FC = (): JSX.Element => {
  const [error, setError] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: {
      service: "Service A",
      doctor_name: "",
      start_time: "09:00 AM",
      end_time: "10:00 AM",
      date: "",
    },
    validationSchema: newBookingValidationSchema,
    validate: (values) => {
      const errors: Record<string, string> = {};
      const startTimeIndex = startTimes.indexOf(values.start_time);
      const endTimeIndex = endTimes.indexOf(values.end_time);

      if (startTimeIndex >= endTimeIndex) {
        errors.end_time = "End time must be later than start time";
      }

      return errors;
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await addBooking(values);
        console.log("Adding new booking response:", response);
        if (response) {
          toast({ description: "Booking successfully added!" });
          router.push("/");
        } else {
          toast({ description: "Something went wrong please try again." });
          setError(true);
        }
      } catch (error) {
        setError(true);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const serviceOptions = [
    "Service A",
    "Service B",
    "Service C",
    "Service D",
    "Service E",
  ];

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full md:w-[600px] bg-white shadow-lg rounded-lg px-8 py-6">
        <h2 className="text-2xl font-bold text-center mb-6">Add new booking</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col">
              <label htmlFor="service" className="text-sm font-medium">
                Service Type
              </label>
              <select
                id="service"
                name="service"
                value={values.service}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`h-12 mt-1 pl-4 pr-8 rounded border ${
                  touched.service && errors.service
                    ? "border-red-500"
                    : "border-gray-300 focus:border-blue-500"
                }`}
              >
                {serviceOptions.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
              {touched.service && errors.service && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.service}
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="doctor_name" className="text-sm font-medium">
                Doctor Name
              </label>
              <input
                id="doctor_name"
                name="doctor_name"
                type="text"
                value={values.doctor_name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`h-12 mt-1 pl-4 pr-8 rounded border ${
                  touched.doctor_name && errors.doctor_name
                    ? "border-red-500"
                    : "border-gray-300 focus:border-blue-500"
                }`}
                placeholder="Enter doctor's name"
              />
              {touched.doctor_name && errors.doctor_name && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.doctor_name}
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="start_time" className="text-sm font-medium">
                Start Time
              </label>
              <select
                id="start_time"
                name="start_time"
                value={values.start_time}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`h-12 mt-1 pl-4 pr-8 rounded border ${
                  touched.start_time && errors.start_time
                    ? "border-red-500"
                    : "border-gray-300 focus:border-blue-500"
                }`}
              >
                {startTimes.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              {touched.start_time && errors.start_time && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.start_time}
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="end_time" className="text-sm font-medium">
                End Time
              </label>
              <select
                id="end_time"
                name="end_time"
                value={values.end_time}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`h-12 mt-1 pl-4 pr-8 rounded border ${
                  touched.end_time && errors.end_time
                    ? "border-red-500"
                    : "border-gray-300 focus:border-blue-500"
                }`}
              >
                {endTimes.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              {touched.end_time && errors.end_time && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.end_time}
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="date" className="text-sm font-medium">
                Date
              </label>
              <input
                id="date"
                name="date"
                type="date"
                value={values.date}
                onChange={handleChange}
                onBlur={handleBlur}
                min={today}
                className={`h-12 mt-1 pl-4 pr-8 rounded border ${
                  touched.date && errors.date
                    ? "border-red-500"
                    : "border-gray-300 focus:border-blue-500"
                }`}
                placeholder="Select date"
              />
              {touched.date && errors.date && (
                <div className="text-red-500 text-sm mt-1">{errors.date}</div>
              )}
            </div>
            {error && (
              <div className="flex items-center mt-2 space-x-2">
                <IoWarningOutline className="text-red w-10 h-10 " />
                <p className="text-sm text-[#ff0000]">
                  Something went wrong inserting new booking. Please try again.
                </p>
              </div>
            )}
            <div className="flex justify-center">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm"
              >
                {isSubmitting ? (
                  <SyncLoader color={"#ffffff"} loading={true} size={8} />
                ) : (
                  "Add Booking"
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewBooking;
