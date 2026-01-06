import axiosInstance from "./axiosInstance";
import { SubscriptionFormData } from "./subscriptionSchema";

export const subscribeToNewsletter = async (data: SubscriptionFormData) => {
  try {
    const response = await axiosInstance.post("/subscribe", data);
    return response.data;
  } catch (error: any) {
    // Extract error message from response
    const errorMessage = error.response?.data?.message || "Subscription failed. Please try again.";
    throw new Error(errorMessage);
  }
};
