import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import axiosInstance from "@/lib/axiosInstance";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define validation schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

type UserType = "admin" | "donor";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState<UserType>("donor");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      let response;
      let dashboardRoute = "/dashboard";

      if (userType === "admin") {
        response = await axiosInstance.post("/admin/auth/login", data);
        dashboardRoute = "/admin/dashboard";
      } else {
        response = await axiosInstance.post("/donor/auth/login", data);
        dashboardRoute = "/donor/dashboard";
      }

      // Store token and user data
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userType", userType);
      if (userType == "admin") {
        localStorage.setItem("user", JSON.stringify(response.data.admin));
      } else {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      toast.success("Login successful!");
      navigate(dashboardRoute);
    } catch (error: any) {
      console.error("Login error:", error);
      const errorMessage =
        error.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <section 
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #F3F4F6 0%, #ffffff 50%, #F3F4F6 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Background decorative elements */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          <div style={{
            position: 'absolute',
            top: '-160px',
            right: '-160px',
            width: '320px',
            height: '320px',
            background: 'rgba(6, 3, 143, 0.05)',
            borderRadius: '50%',
            filter: 'blur(60px)'
          }}></div>
          <div style={{
            position: 'absolute',
            bottom: '-160px',
            left: '-160px',
            width: '320px',
            height: '320px',
            background: 'rgba(255, 103, 31, 0.05)',
            borderRadius: '50%',
            filter: 'blur(60px)'
          }}></div>
        </div>

        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '80px 16px', 
          position: 'relative', 
          zIndex: 10 
        }}>
          <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            {/* Welcome section */}
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h1 style={{
                fontSize: '3rem',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #06038F 0%, #3B82F6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '16px',
                marginTop:'36px',
                fontFamily: 'Roboto, sans-serif'
              }}>
                Welcome Back
              </h1>
              <p style={{
                fontSize: '1.25rem',
                color: '#1F2937',
                fontFamily: 'Roboto, sans-serif'
              }}>
                Sign in to continue your journey with NEIEA
              </p>
            </div>

            <Card style={{
              border: 'none',
              boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              borderRadius: '16px',
              overflow: 'hidden'
            }}>
              <CardHeader style={{ textAlign: 'center', padding: '32px 32px 24px 32px' }}>
                <Tabs
                  defaultValue="donor"
                  className="w-full"
                  onValueChange={(value) => setUserType(value as UserType)}
                >
                  <TabsList style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    backgroundColor: '#F3F4F6',
                    borderRadius: '12px',
                    padding: '4px'
                  }}>
                    <TabsTrigger 
                      value="donor" 
                      style={{
                        backgroundColor: userType === 'donor' ? '#06038F' : 'transparent',
                        color: userType === 'donor' ? 'white' : '#1F2937',
                        fontWeight: '600',
                        borderRadius: '8px',
                        transition: 'all 0.3s ease',
                        padding: '8px 16px'
                      }}
                    >
                      Donor
                    </TabsTrigger>
                    <TabsTrigger 
                      value="admin"
                      style={{
                        backgroundColor: userType === 'admin' ? '#06038F' : 'transparent',
                        color: userType === 'admin' ? 'white' : '#1F2937',
                        fontWeight: '600',
                        borderRadius: '8px',
                        transition: 'all 0.3s ease',
                        padding: '8px 16px'
                      }}
                    >
                      Admin
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                <p style={{
                  color: '#6B7280',
                  fontSize: '1.125rem',
                  marginTop: '24px',
                  fontFamily: 'Roboto, sans-serif'
                }}>
                  Sign in to your {userType} account
                </p>
              </CardHeader>

              <CardContent style={{ padding: '0 32px 32px 32px' }}>
                <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div>
                    <Label htmlFor="email" style={{
                      color: '#1F2937',
                      fontWeight: '600',
                      fontSize: '1rem',
                      display: 'block',
                      marginBottom: '8px',
                      fontFamily: 'Roboto, sans-serif'
                    }}>
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      {...register("email")}
                      style={{
                        height: '56px',
                        fontSize: '1rem',
                        border: `2px solid ${errors.email ? '#EF4444' : '#E5E7EB'}`,
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
                        color: '#EF4444',
                        fontSize: '0.875rem',
                        marginTop: '4px',
                        fontFamily: 'Roboto, sans-serif'
                      }}>
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <Label htmlFor="password" style={{
                        color: '#1F2937',
                        fontWeight: '600',
                        fontSize: '1rem',
                        fontFamily: 'Roboto, sans-serif'
                      }}>
                        Password
                      </Label>
                    </div>
                    <div style={{ position: 'relative' }}>
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        {...register("password")}
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.8)',
                          backdropFilter: 'blur(10px)',
                          color: '#1F2937',
                          height: '56px',
                          fontSize: '1rem',
                          border: `2px solid ${errors.password ? '#EF4444' : '#E5E7EB'}`,
                          paddingRight: '56px',
                          borderRadius: '12px',
                          padding: '0 56px 0 16px',
                          width: '100%',
                          fontFamily: 'Roboto, sans-serif',
                          transition: 'all 0.3s ease'
                        }}
                      />
                      <button
                        type="button"
                        style={{
                          position: 'absolute',
                          right: '16px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          color: '#6B7280',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'color 0.3s ease'
                        }}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p style={{
                        color: '#EF4444',
                        fontSize: '0.875rem',
                        marginTop: '4px',
                        fontFamily: 'Roboto, sans-serif'
                      }}>
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    style={{
                      width: '100%',
                      background: 'linear-gradient(135deg, #06038F 0%, #1E40AF 100%)',
                      color: 'white',
                      padding: '24px',
                      fontSize: '1.125rem',
                      fontWeight: '600',
                      borderRadius: '12px',
                      border: 'none',
                      cursor: isLoading ? 'not-allowed' : 'pointer',
                      opacity: isLoading ? 0.5 : 1,
                      transition: 'all 0.3s ease',
                      fontFamily: 'Roboto, sans-serif',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div style={{
                          width: '20px',
                          height: '20px',
                          border: '2px solid rgba(255, 255, 255, 0.3)',
                          borderTop: '2px solid white',
                          borderRadius: '50%',
                          animation: 'spin 1s linear infinite'
                        }}></div>
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign In
                        <ArrowRight size={20} />
                      </>
                    )}
                  </Button>
                </form>

                {/* Additional info */}
                <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #E5E7EB' }}>
                  <p style={{
                    textAlign: 'center',
                    color: '#6B7280',
                    fontSize: '0.875rem',
                    fontFamily: 'Roboto, sans-serif'
                  }}>
                    Note: For any issues, please contact the NEIEA Team.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Trust indicators */}
            <div style={{ marginTop: '32px', textAlign: 'center' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '24px',
                color: '#6B7280',
                fontSize: '0.875rem',
                fontFamily: 'Roboto, sans-serif'
              }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    backgroundColor: '#10B981',
                    borderRadius: '50%',
                    marginRight: '8px'
                  }}></div>
                  Secure Login
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    backgroundColor: '#3B82F6',
                    borderRadius: '50%',
                    marginRight: '8px'
                  }}></div>
                  SSL Encrypted
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    backgroundColor: '#8B5CF6',
                    borderRadius: '50%',
                    marginRight: '8px'
                  }}></div>
                  Privacy Protected
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </section>
    </Layout>
  );
};

export default Login;
