import { useEffect, useState } from "react";
import axiosInstance from "../lib/axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  donorType?: string;
  donations?: string[];
  role?: string; // For admin users
};

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userType = localStorage.getItem("userType");
        let endpoint = "/donor/auth/me"; // Default to donor endpoint

        if (userType === "admin") {
          endpoint = "/admin/get-admin"; // Endpoint for admin
        }

        const response = await axiosInstance.get(endpoint);
        setUser(response.data.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    const token = localStorage.getItem("token");
    const userType = localStorage.getItem("userType");

    if (token && userType) {
      fetchUser();
    } else {
      setLoading(false);
      navigate("/login");
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    setUser(null);
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return { user, loading, logout };
};
