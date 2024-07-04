import axiosInstace from "axios";

const axios = axiosInstace.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export default axios;
