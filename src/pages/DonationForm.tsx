import { z } from "zod";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosInstance";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useLocation } from "react-router-dom";

// Define the Zod schema for form validation
const donationFormSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().length(10, { message: "Phone number must be exactly 10 digits" }).regex(/^\d+$/, { message: "Phone number must contain only digits" }),
  address: z.string().min(1, { message: "Address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  zipCode: z.string().min(1, { message: "Zip code is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  amount: z.number().min(1, { message: "Amount is required" }),
  panCard: z.string().optional(),
  donorType: z.string().optional(),
  frequency: z.string().optional(),
});

type DonationFormValues = z.infer<typeof donationFormSchema>;

const DonationForm = () => {
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [donationData, setDonationData] = useState<any>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<DonationFormValues>({
    resolver: zodResolver(donationFormSchema),
  });

  // const amount = watch("amount");

  useEffect(() => {
    if (location.state) {
      const { type, amount, tier, customAmount } = location.state;
      const calculatedAmount = amount || customAmount;

      if (calculatedAmount) {
        setValue("amount", calculatedAmount);
      }

      if (type) {
        setValue("frequency", type);
      }

      if (tier) {
        setValue("donorType", tier);
      }
    }
  }, [location.state, setValue]);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const initiateRazorpayPayment = async (orderData: any) => {
    try {
      setPaymentLoading(true);

      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        throw new Error('Razorpay SDK failed to load');
      }

      const options = {
        // key: 'rzp_test_HcrOflmaNTnjgB', 
        key: 'rzp_live_R7W4B9PPioBX2X', // Replace with your test key
        amount: orderData.amount * 100, // Razorpay expects amount in paise
        currency: 'INR',
        name: 'NEIEA Donation',
        description: `Donation for ${orderData.donorType || 'General'}`,
        order_id: orderData.razorpayOrderId,
        handler: async (response: any) => {
          try {
            const verificationResponse = await axiosInstance.post('/donation/verify-payment', {
              razorpayOrderId: orderData.razorpayOrderId,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              donationData: orderData
            });

            if (verificationResponse.data.success) {
              setIsSuccessDialogOpen(true);
              reset();
              toast.success("Payment successful! Thank you for your donation.");
            } else {
              toast.error("Payment verification failed. Please contact support.");
            }
          } catch (error) {
            toast.error("Payment verification failed. Please contact support.");
          } finally {
            setPaymentLoading(false);
          }
        },
        prefill: {
          name: `${orderData.firstName} ${orderData.lastName}`,
          email: orderData.email,
          contact: orderData.phone
        },
        theme: {
          color: '#4f46e5' // Your brand color
        }
      };

      // @ts-ignore
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Payment error:', error);
      toast.error("Failed to initiate payment. Please try again.");
      setPaymentLoading(false);
    }
  };

  const onSubmit = async (data: DonationFormValues) => {
    setIsSubmitting(true);
    try {
      const payload = {
        ...data,
        panCard: data.panCard,
      };
      setDonationData(payload);

      const orderResponse = await axiosInstance.post('/donation/create-donation', {
        amount: payload.amount,
        currency: 'INR',
        receipt: `donation_${Date.now()}`,
        notes: {
          donorType: payload.donorType,
          frequency: payload.frequency
        }
      });

      if (orderResponse.data.success) {
        await initiateRazorpayPayment({
          ...payload,
          razorpayOrderId: orderResponse.data.orderId
        });
      } else {
        toast.error("Failed to create payment order. Please try again.");
      }
    } catch (error) {
      console.error('Donation error:', error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <section 
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #F3F4F6 0%, #ffffff 50%, #F3F4F6 100%)',
          position: 'relative',
          overflow: 'hidden',
          padding: '80px 0'
        }}
      >
        {/* Background decorative elements */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          <div style={{
            position: 'absolute',
            top: '-150px',
            right: '-150px',
            width: '300px',
            height: '300px',
            background: 'rgba(6, 3, 143, 0.05)',
            borderRadius: '50%',
            filter: 'blur(60px)'
          }}></div>
          <div style={{
            position: 'absolute',
            bottom: '-150px',
            left: '-150px',
            width: '300px',
            height: '300px',
            background: 'rgba(255, 103, 31, 0.05)',
            borderRadius: '50%',
            filter: 'blur(60px)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: '20%',
            left: '10%',
            width: '200px',
            height: '200px',
            background: 'rgba(59, 130, 246, 0.03)',
            borderRadius: '50%',
            filter: 'blur(40px)'
          }}></div>
        </div>

        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '0 16px', 
          position: 'relative', 
          zIndex: 10 
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {/* Header Section */}
            <div style={{ textAlign: 'center', marginBottom: '48px', marginTop:'48px' }}>
              <h1 style={{
                fontSize: '3rem',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #06038F 0%, #3B82F6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '16px',
                fontFamily: 'Roboto, sans-serif'
              }}>
                Complete Your Donation
              </h1>
              <p style={{
                fontSize: '1.125rem',
                color: '#1F2937',
                maxWidth: '500px',
                margin: '0 auto',
                fontFamily: 'Roboto, sans-serif',
                lineHeight: '1.6'
              }}>
                Fill in your details to complete the donation process and make a lasting impact.
              </p>

              {donationData && (
                <div style={{
                  marginTop: '32px',
                  padding: '24px',
                  backgroundColor: 'rgba(224, 231, 255, 0.3)',
                  borderRadius: '16px',
                  border: '1px solid rgba(224, 231, 255, 0.5)',
                  maxWidth: '600px',
                  margin: '32px auto 0 auto'
                }}>
                  <h3 style={{
                    fontWeight: '600',
                    fontSize: '1.125rem',
                    color: '#1F2937',
                    marginBottom: '16px',
                    fontFamily: 'Roboto, sans-serif'
                  }}>Your Donation Details</h3>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '8px',
                    fontFamily: 'Roboto, sans-serif'
                  }}>
                    {donationData.donorType && (
                      <p style={{ color: '#374151' }}>
                        <span style={{ fontWeight: '500' }}>Donor Type:</span> {donationData.donorType}
                      </p>
                    )}
                    {donationData.frequency && (
                      <p style={{ color: '#374151' }}>
                        <span style={{ fontWeight: '500' }}>Frequency:</span> {donationData.frequency}
                      </p>
                    )}
                    <p style={{ color: '#374151' }}>
                      <span style={{ fontWeight: '500' }}>Amount:</span> ₹{donationData.amount}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <Card style={{
              border: 'none',
              boxShadow: '0 20px 60px -10px rgba(0, 0, 0, 0.15), 0 8px 12px -4px rgba(0, 0, 0, 0.1)',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              borderRadius: '24px',
              overflow: 'hidden'
            }}>
              <CardContent style={{ padding: '48px', paddingTop: '50px' }}>
                <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding:'20px 10px' }}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '24px'
                  }}>
                    <div>
                      <Label htmlFor="firstName" style={{
                        color: '#1F2937',
                        fontWeight: '600',
                        fontSize: '1rem',
                        display: 'block',
                        marginBottom: '8px',
                        fontFamily: 'Roboto, sans-serif'
                      }}>First Name *</Label>
                      <Input
                        id="firstName"
                        placeholder="Enter your first name"
                        {...register("firstName")}
                        style={{
                          height: '48px',
                          fontSize: '1rem',
                          border: '2px solid #E5E7EB',
                          borderRadius: '12px',
                          backgroundColor: 'rgba(255, 255, 255, 0.8)',
                          backdropFilter: 'blur(10px)',
                          color: '#1F2937',
                          padding: '0 16px',
                          width: '100%',
                          fontFamily: 'Roboto, sans-serif',
                          transition: 'all 0.3s ease'
                        }}
                      />
                      {errors.firstName && (
                        <p style={{
                          marginTop: '4px',
                          fontSize: '0.875rem',
                          color: '#EF4444',
                          fontFamily: 'Roboto, sans-serif'
                        }}>
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="lastName" style={{
                        color: '#1F2937',
                        fontWeight: '600',
                        fontSize: '1rem',
                        display: 'block',
                        marginBottom: '8px',
                        fontFamily: 'Roboto, sans-serif'
                      }}>Last Name *</Label>
                      <Input
                        id="lastName"
                        placeholder="Enter your last name"
                        {...register("lastName")}
                        style={{
                          height: '48px',
                          fontSize: '1rem',
                          border: '2px solid #E5E7EB',
                          borderRadius: '12px',
                          backgroundColor: 'rgba(255, 255, 255, 0.8)',
                          backdropFilter: 'blur(10px)',
                          color: '#1F2937',
                          padding: '0 16px',
                          width: '100%',
                          fontFamily: 'Roboto, sans-serif',
                          transition: 'all 0.3s ease'
                        }}
                      />
                      {errors.lastName && (
                        <p style={{
                          marginTop: '4px',
                          fontSize: '0.875rem',
                          color: '#EF4444',
                          fontFamily: 'Roboto, sans-serif'
                        }}>
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email" style={{
                      color: '#1F2937',
                      fontWeight: '600',
                      fontSize: '1rem',
                      display: 'block',
                      marginBottom: '8px',
                      fontFamily: 'Roboto, sans-serif'
                    }}>Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      {...register("email")}
                      style={{
                        height: '48px',
                        fontSize: '1rem',
                        border: '2px solid #E5E7EB',
                        borderRadius: '12px',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(10px)',
                        color: '#1F2937',
                        padding: '0 16px',
                        width: '100%',
                        fontFamily: 'Roboto, sans-serif',
                        transition: 'all 0.3s ease'
                      }}
                    />
                    {errors.email && (
                      <p style={{
                        marginTop: '4px',
                        fontSize: '0.875rem',
                        color: '#EF4444',
                        fontFamily: 'Roboto, sans-serif'
                      }}>
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="phone" style={{
                      color: '#1F2937',
                      fontWeight: '600',
                      fontSize: '1rem',
                      display: 'block',
                      marginBottom: '8px',
                      fontFamily: 'Roboto, sans-serif'
                    }}>Phone *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      {...register("phone")}
                      maxLength={10}
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      style={{
                        height: '48px',
                        fontSize: '1rem',
                        border: '2px solid #E5E7EB',
                        borderRadius: '12px',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(10px)',
                        color: '#1F2937',
                        padding: '0 16px',
                        width: '100%',
                        fontFamily: 'Roboto, sans-serif',
                        transition: 'all 0.3s ease'
                      }}
                    />
                    {errors.phone && (
                      <p style={{
                        marginTop: '4px',
                        fontSize: '0.875rem',
                        color: '#EF4444',
                        fontFamily: 'Roboto, sans-serif'
                      }}>
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="address" style={{
                      color: '#1F2937',
                      fontWeight: '600',
                      fontSize: '1rem',
                      display: 'block',
                      marginBottom: '8px',
                      fontFamily: 'Roboto, sans-serif'
                    }}>Address *</Label>
                    <Input
                      id="address"
                      placeholder="Enter your address"
                      {...register("address")}
                      style={{
                        height: '48px',
                        fontSize: '1rem',
                        border: '2px solid #E5E7EB',
                        borderRadius: '12px',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(10px)',
                        color: '#1F2937',
                        padding: '0 16px',
                        width: '100%',
                        fontFamily: 'Roboto, sans-serif',
                        transition: 'all 0.3s ease'
                      }}
                    />
                    {errors.address && (
                      <p style={{
                        marginTop: '4px',
                        fontSize: '0.875rem',
                        color: '#EF4444',
                        fontFamily: 'Roboto, sans-serif'
                      }}>
                        {errors.address.message}
                      </p>
                    )}
                  </div>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '24px'
                  }}>
                    <div>
                      <Label htmlFor="city" style={{
                        color: '#1F2937',
                        fontWeight: '600',
                        fontSize: '1rem',
                        display: 'block',
                        marginBottom: '8px',
                        fontFamily: 'Roboto, sans-serif'
                      }}>City *</Label>
                      <Input
                        id="city"
                        placeholder="Enter your city"
                        {...register("city")}
                        style={{
                          height: '48px',
                          fontSize: '1rem',
                          border: '2px solid #E5E7EB',
                          borderRadius: '12px',
                          backgroundColor: 'rgba(255, 255, 255, 0.8)',
                          backdropFilter: 'blur(10px)',
                          color: '#1F2937',
                          padding: '0 16px',
                          width: '100%',
                          fontFamily: 'Roboto, sans-serif',
                          transition: 'all 0.3s ease'
                        }}
                      />
                      {errors.city && (
                        <p style={{
                          marginTop: '4px',
                          fontSize: '0.875rem',
                          color: '#EF4444',
                          fontFamily: 'Roboto, sans-serif'
                        }}>
                          {errors.city.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="state" style={{
                        color: '#1F2937',
                        fontWeight: '600',
                        fontSize: '1rem',
                        display: 'block',
                        marginBottom: '8px',
                        fontFamily: 'Roboto, sans-serif'
                      }}>State *</Label>
                      <Input
                        id="state"
                        placeholder="Enter your state"
                        {...register("state")}
                        style={{
                          height: '48px',
                          fontSize: '1rem',
                          border: '2px solid #E5E7EB',
                          borderRadius: '12px',
                          backgroundColor: 'rgba(255, 255, 255, 0.8)',
                          backdropFilter: 'blur(10px)',
                          color: '#1F2937',
                          padding: '0 16px',
                          width: '100%',
                          fontFamily: 'Roboto, sans-serif',
                          transition: 'all 0.3s ease'
                        }}
                      />
                      {errors.state && (
                        <p style={{
                          marginTop: '4px',
                          fontSize: '0.875rem',
                          color: '#EF4444',
                          fontFamily: 'Roboto, sans-serif'
                        }}>
                          {errors.state.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="zipCode" style={{
                        color: '#1F2937',
                        fontWeight: '600',
                        fontSize: '1rem',
                        display: 'block',
                        marginBottom: '8px',
                        fontFamily: 'Roboto, sans-serif'
                      }}>Zip Code *</Label>
                      <Input
                        id="zipCode"
                        placeholder="Enter your zip code"
                        {...register("zipCode")}
                        style={{
                          height: '48px',
                          fontSize: '1rem',
                          border: '2px solid #E5E7EB',
                          borderRadius: '12px',
                          backgroundColor: 'rgba(255, 255, 255, 0.8)',
                          backdropFilter: 'blur(10px)',
                          color: '#1F2937',
                          padding: '0 16px',
                          width: '100%',
                          fontFamily: 'Roboto, sans-serif',
                          transition: 'all 0.3s ease'
                        }}
                      />
                      {errors.zipCode && (
                        <p style={{
                          marginTop: '4px',
                          fontSize: '0.875rem',
                          color: '#EF4444',
                          fontFamily: 'Roboto, sans-serif'
                        }}>
                          {errors.zipCode.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="country" style={{
                      color: '#1F2937',
                      fontWeight: '600',
                      fontSize: '1rem',
                      display: 'block',
                      marginBottom: '8px',
                      fontFamily: 'Roboto, sans-serif'
                    }}>Country *</Label>
                    <Input
                      id="country"
                      placeholder="Enter your country"
                      {...register("country")}
                      style={{
                        height: '48px',
                        fontSize: '1rem',
                        border: '2px solid #E5E7EB',
                        borderRadius: '12px',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(10px)',
                        color: '#1F2937',
                        padding: '0 16px',
                        width: '100%',
                        fontFamily: 'Roboto, sans-serif',
                        transition: 'all 0.3s ease'
                      }}
                    />
                    {errors.country && (
                      <p style={{
                        marginTop: '4px',
                        fontSize: '0.875rem',
                        color: '#EF4444',
                        fontFamily: 'Roboto, sans-serif'
                      }}>
                        {errors.country.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="amount" style={{
                      color: '#1F2937',
                      fontWeight: '600',
                      fontSize: '1rem',
                      display: 'block',
                      marginBottom: '8px',
                      fontFamily: 'Roboto, sans-serif'
                    }}>Amount (INR) *</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Enter donation amount"
                      {...register("amount", { valueAsNumber: true })}
                      style={{
                        height: '48px',
                        fontSize: '1rem',
                        border: '2px solid #E5E7EB',
                        borderRadius: '12px',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(10px)',
                        color: '#1F2937',
                        padding: '0 16px',
                        width: '100%',
                        fontFamily: 'Roboto, sans-serif',
                        transition: 'all 0.3s ease'
                      }}
                    />
                    {errors.amount && (
                      <p style={{
                        marginTop: '4px',
                        fontSize: '0.875rem',
                        color: '#EF4444',
                        fontFamily: 'Roboto, sans-serif'
                      }}>
                        {errors.amount.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="panCard" style={{
                      color: '#1F2937',
                      fontWeight: '600',
                      fontSize: '1rem',
                      display: 'block',
                      marginBottom: '8px',
                      fontFamily: 'Roboto, sans-serif'
                    }}>PAN Card</Label>
                    <Input
                      id="panCard"
                      placeholder="Enter your PAN card number"
                      {...register("panCard")}
                      style={{
                        height: '48px',
                        fontSize: '1rem',
                        border: '2px solid #E5E7EB',
                        borderRadius: '12px',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(10px)',
                        color: '#1F2937',
                        padding: '0 16px',
                        width: '100%',
                        fontFamily: 'Roboto, sans-serif',
                        transition: 'all 0.3s ease'
                      }}
                    />
                    {errors.panCard && (
                      <p style={{
                        marginTop: '4px',
                        fontSize: '0.875rem',
                        color: '#EF4444',
                        fontFamily: 'Roboto, sans-serif'
                      }}>
                        {errors.panCard.message}
                      </p>
                    )}
                  </div>
                  <div style={{
                    padding: '16px',
                    backgroundColor: 'rgba(251, 191, 36, 0.1)',
                    borderRadius: '12px',
                    border: '1px solid rgba(251, 191, 36, 0.3)'
                  }}>
                    <p style={{
                      fontWeight: '600',
                      fontSize: '0.875rem',
                      color: '#D97706',
                      fontFamily: 'Roboto, sans-serif',
                      margin: 0
                    }}>
                    Please note: For donations exceeding ₹2,000, if PAN card details are not provided, NEIEA will receive only 70% of the donated amount due to applicable regulations.
                  </p>
                  </div>
                  <input type="hidden" {...register("donorType")} />
                  <input type="hidden" {...register("frequency")} />
                  <Button
                    type="submit"
                    style={{
                      width: '100%',
                      background: 'linear-gradient(135deg, #06038F 0%, #3B82F6 100%)',
                      color: 'white',
                      fontWeight: 'bold',
                      padding: '20px',
                      fontSize: '1.125rem',
                      borderRadius: '12px',
                      border: 'none',
                      cursor: (isSubmitting || paymentLoading) ? 'not-allowed' : 'pointer',
                      opacity: (isSubmitting || paymentLoading) ? 0.7 : 1,
                      transition: 'all 0.3s ease',
                      fontFamily: 'Roboto, sans-serif',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxShadow: '0 8px 25px rgba(6, 3, 143, 0.3)'
                    }}
                    disabled={isSubmitting || paymentLoading}
                  >
                    {isSubmitting || paymentLoading ? (
                      <>
                        <Loader2 size={20} />
                        {paymentLoading ? "Redirecting to Payment..." : "Processing..."}
                      </>
                    ) : (
                      "Proceed to Payment"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <Dialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
        <DialogContent style={{
          maxWidth: '500px',
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '32px',
          boxShadow: '0 20px 60px -10px rgba(0, 0, 0, 0.15), 0 8px 12px -4px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{
            margin: '0 auto',
            display: 'flex',
            height: '64px',
            width: '64px',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #06038F 0%, #3B82F6 100%)',
            marginBottom: '24px'
          }}>
            <CheckCircle2 size={32} color="white" />
          </div>
          <DialogHeader style={{ textAlign: 'center' }}>
            <DialogTitle style={{
              fontSize: '1.75rem',
              fontWeight: 'bold',
              color: '#1F2937',
              marginBottom: '16px',
              fontFamily: 'Roboto, sans-serif'
            }}>
              Thank You for Your Donation!
            </DialogTitle>
            <DialogDescription style={{
              color: '#6B7280',
              fontSize: '1rem',
              lineHeight: '1.6',
              fontFamily: 'Roboto, sans-serif',
              marginBottom: '16px'
            }}>
              Your donation has been successfully processed. A confirmation email has been sent to your email address.
            </DialogDescription>
            {donationData?.donorType && (
              <DialogDescription style={{
                color: '#6B7280',
                fontSize: '1rem',
                lineHeight: '1.6',
                fontFamily: 'Roboto, sans-serif',
                marginTop: '8px'
              }}>
                As a {donationData.donorType}, you'll receive exclusive benefits. Check your email for login details.
              </DialogDescription>
            )}
          </DialogHeader>
          <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center' }}>
            <Button
              onClick={() => {
                setIsSuccessDialogOpen(false);
                if (donationData?.donorType) {
                  // Redirect to donor dashboard if applicable
                }
              }}
              style={{
                background: 'linear-gradient(135deg, #06038F 0%, #3B82F6 100%)',
                color: 'white',
                fontWeight: '600',
                padding: '12px 32px',
                fontSize: '1rem',
                borderRadius: '12px',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'Roboto, sans-serif',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(6, 3, 143, 0.3)'
              }}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default DonationForm;
