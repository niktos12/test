import axios from "axios";
import { useAuthStore } from "@/app/store/store";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const router = useRouter();
  const { user, token, setUser, setToken, logout } = useAuthStore();
  const savedTokenRef = useRef<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    savedTokenRef.current = savedToken;
    if (savedToken && !token) {
      setToken(savedToken);
      axios
        .get("http://localhost:3002/me", {
          headers: { Authorization: `Bearer ${savedToken}` },
        })
        .then((response) => {
          setUser(response.data.user);
        })
        .catch(() => {
          localStorage.removeItem("token");
          logout();
          router.push("/");
        });
    }
  }, [setUser, setToken, token, logout, router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
    logout();
  };
  return { user, token, handleLogout };
};
