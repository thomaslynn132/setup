
import axios from "axios";
import { InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
// import Cookies from "js-cookie";
// import { jwtDecode } from "jwt-decode";
const TOKEN_NAME = "token";
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

// const CSRF_TOKEN_NAME =
//    import.meta.env.VITE_TOKEN_KEY + "_csrf_token" || "csrf_token";

// let isRefreshing = false;
const token = Cookies.get(TOKEN_NAME);
// Request interceptor: set Accept header
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
   if (config.headers) {
      config.headers.Accept = "application/json";
      if (token) {
         config.headers.Authorization = `Bearer ${token}`;
      }
   }
   return config;
});

// Refresh token function
// async function attemptTokenRefresh(): Promise<boolean> {
//    if (isRefreshing) return false;
//    isRefreshing = true;

//    try {
//       const res = await api.post(
//          "/refresh",
//          { siteUrl: env.API_URL.replace("/api/v1", "") },
//          {
//             headers: {
//                "x-csrf-token": csrfToken,
//                "Content-Type": "application/json",
//             },
//             withCredentials: true, // ensure browser sends cookies
//          }
//       );

//       // Optional: store user info from returned access token
//       const accessToken = res?.data?.data?.accessToken;
//       if (accessToken) {
//          console.log("✅ Token refreshed successfully");
//          try {
//             const decoded = jwtDecode(accessToken);
//             localStorage.setItem(
//                "employeeId",
//                decoded?.admin?.employeeId || ""
//             );
//             localStorage.setItem("userId", decoded?.admin?.id || "");
//          } catch (err) {
//             console.warn("Failed to decode new token:", err);
//          }
//          return true;
//       } else {
//          console.error("No new token received");
//          return false;
//       }
//    } catch (error) {
//       console.error("❌ Token refresh failed:", error);
//       return false;
//    } finally {
//       isRefreshing = false;
//    }
// }

// Response interceptor
api.interceptors.response.use(
   res => res.data,
   async error => {
      // const originalRequest = error.config;

      if (!error.response) {
         console.log("❌ No response (CORS/network error)");
         return Promise.reject(error);
      }

      // Handle 401
      if (error.response.status === 401) {
         // originalRequest._retry = true;
         // console.log("🚨 Got 401 — attempting refresh");
         // const refreshed = await attemptTokenRefresh();
         // console.log("Refresh result:", refreshed);
         // if (refreshed) {
         //    console.log("🔁 Retrying original request...");
         //    // Browser will send the refreshed cookie automatically
         //    return api(originalRequest);
         // } else {
         //    console.log("❌ Refresh failed — redirecting to login");
         localStorage.removeItem("auth-storage");
         // }
      }

      return Promise.reject(error);
   }
);
