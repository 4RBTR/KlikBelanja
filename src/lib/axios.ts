import axios from "axios";
import { signOut } from "next-auth/react";

const api = axios.create();

// Global response interceptor: auto sign-out on 401 from proxy APIs
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      axios.isAxiosError(error) &&
      error.response?.status === 401 &&
      error.config?.url?.startsWith("/api/proxy/")
    ) {
      // Mark as handled so catch blocks can skip noisy logging
      (error as Error & { __handled?: boolean }).__handled = true;
      
      // Prevent infinite loop: only sign out once
      if (typeof window !== "undefined" && !window.__signingOut) {
        window.__signingOut = true;
        console.warn("[Auth] Sesi telah berakhir — mengalihkan ke halaman login...");
        await signOut({ callbackUrl: "/login" });
      }
    }
    return Promise.reject(error);
  }
);

export default api;
