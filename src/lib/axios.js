import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

const axiosClient = axios.create({
    baseURL,
    withCredentials: true, // ✅ send cookies
});

export default axiosClient;
