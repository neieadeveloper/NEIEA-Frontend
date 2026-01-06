import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "@/lib/axiosInstance";
import Layout from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { statesAndCities } from "@/lib/statesAndCities";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CheckCircle2, Loader2 } from "lucide-react";
import { DialogDescription } from "@radix-ui/react-dialog";
import './ApplyCourse.css';


// Country code mapping
const countryCodes = {
  "India": "+91",
  "USA": "+1",
  "UK": "+44",
  "Canada": "+1",
  "Australia": "+61",
  "UAE": "+971",
  "Other": "+"
};

// Updated form schema with proper validation
const formSchema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  email: z.string().email("Invalid email address"),
  country: z.string().min(1, "Country is required"),
  phone: z.string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\d{10,15}$/, "Invalid phone number format"),
  motherTongue: z.string().min(1, "Mother Tongue is required"),
  age: z.string().min(1, "Age is required"),
  gender: z.string().min(1, "Gender is required"),
  isStudent: z.string().min(1, "This field is required"),
  classStudying: z.string().optional().or(z.literal("")),
  state: z.string().optional().or(z.literal("")),
  city: z.string().optional().or(z.literal("")),
  address: z.string().optional().or(z.literal("")),
  whatsappNumber: z.string()
    .min(10, "WhatsApp number must be at least 10 digits")
    .regex(/^\d{10,15}$/, "Invalid WhatsApp number format"),
  referredBy: z.string().min(1, "Referred By is required"),
  convenientTimeSlot: z.string().min(1, "Convenient Time Slot is required"),
  message: z.string().optional().or(z.literal("")),
}).superRefine((data, ctx) => {
  // If country is India, state and city are required
  if (data.country === "India") {
    if (!data.state) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "State is required for India",
        path: ["state"],
      });
    }
    if (!data.city) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "City is required for India",
        path: ["city"],
      });
    }
  } else {
    // For non-India countries, address is required
    if (!data.address) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Address is required for international applicants",
        path: ["address"],
      });
    }
  }

  // If isStudent is "Yes", classStudying is required
  if (data.isStudent === "Yes" && !data.classStudying) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Class studying is required when you're a student",
      path: ["classStudying"],
    });
  }
});

type FormData = z.infer<typeof formSchema>;

const ApplyCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [cities, setCities] = useState<string[]>([]);
  const [referredByOptions, setReferredByOptions] = useState([{ _id: "", name: "Choose" }]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [phonePrefix, setPhonePrefix] = useState("+91");
  const [whatsappPrefix, setWhatsappPrefix] = useState("+91");

  const { register, handleSubmit, setValue, reset, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: "India",
      gender: "",
      isStudent: "",
      referredBy: "",
      state: "",
      city: "",
      classStudying: "",
      convenientTimeSlot: course?.timeSlots?.[0] || "",
    }
  });

  const country = watch("country");
  const isStudent = watch("isStudent");

  const goHome = () => {
    navigate("/");
    window.location.reload(); // force refresh
  };

  const fetchCourse = async () => {
    try {
      const response = await axiosInstance.get(`/course/getOneCourse/${id}`);
      setCourse(response.data);
      // Set default time slot if available
      if (response.data.timeSlots?.length > 0) {
        setValue("convenientTimeSlot", response.data.timeSlots[0]);
      }
    } catch (error) {
      toast.error("Failed to load course");
    }
  };

  const fetchReferredByList = async () => {
    try {
      const response = await axiosInstance.get("/course/referred-by-list");
      if (response.data.success) {
        setReferredByOptions([{ _id: "", name: "Choose" }, ...response.data.data]);
      }
    } catch (error) {
      toast.error("Failed to load referred by list");
    }
  };

  useEffect(() => {
    fetchCourse();
    fetchReferredByList();
  }, [id]);

  // Update country code prefixes when country changes
  useEffect(() => {
    const code = countryCodes[country] || "+";
    setPhonePrefix(code);
    setWhatsappPrefix(code);
  }, [country]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue(name, value);

    if (name === "country") {
      const code = countryCodes[value] || "+";
      setPhonePrefix(code);
      setWhatsappPrefix(code);
    }

    if (name === "state" && country === "India") {
      const selectedState = statesAndCities.find((s) => s.state === value);
      setCities(selectedState ? selectedState.cities : []);
      setValue("city", ""); // Reset city when state changes
    }
  };

  const formatPhoneNumber = (phone: string, country: string) => {
    // For India, return just the 10 digits
    if (country === "India") {
      return phone;
    }
    // For other countries, prepend the country code
    const code = countryCodes[country] || "+";
    return `${code}${phone}`;
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const initiateRazorpayPayment = async (orderData: any) => {
    try {
      setPaymentLoading(true);
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) throw new Error('Razorpay SDK failed to load');

      const options = {
        // key: 'rzp_test_HcrOflmaNTnjgB',
        key: 'rzp_live_R7W4B9PPioBX2X', // Replace with your test key
        amount: orderData.amount * 100,
        currency: 'INR',
        name: 'NEIEA Course Buying',
        description: `Course application for ${course.title || 'General'}`,
        order_id: orderData.razorpayOrderId,
        handler: async (response: any) => {
          try {
            const verificationResponse = await axiosInstance.post('/course/verify-payment', {
              razorpayOrderId: orderData.razorpayOrderId,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              courseData: orderData
            });

            if (verificationResponse.data.success) {
              setIsSuccessDialogOpen(true);
              reset();
              toast.success("Payment successful! Thank you for your application.");
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
          name: orderData.fullName,
          email: orderData.email,
          contact: orderData.country === "India" ? orderData.phone : `+${orderData.phone}`
        },
        theme: {
          color: '#4f46e5'
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

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Format phone numbers based on country
      const formattedPhone = formatPhoneNumber(data.phone, data.country);
      const formattedWhatsapp = formatPhoneNumber(data.whatsappNumber, data.country);

      // Prepare payload with only relevant fields
      const payload: any = {
        fullName: data.fullName,
        email: data.email,
        country: data.country,
        phone: formattedPhone,
        motherTongue: data.motherTongue,
        age: data.age,
        gender: data.gender,
        isStudent: data.isStudent,
        whatsappNumber: formattedWhatsapp,
        referredBy: data.referredBy,
        convenientTimeSlot: data.convenientTimeSlot,
        message: data.message || "",
        course: course?._id,
      };

      // Add conditional fields only if they have values
      if (data.country === "India") {
        payload.state = data.state;
        payload.city = data.city;
      } else {
        payload.address = data.address;
      }

      if (data.isStudent === "Yes") {
        payload.classStudying = data.classStudying;
      }

      if (course.fees > 0) {
        const resp = await axiosInstance.post(`/course/verify-apply-course/${id}`, payload);
        if (resp.data.success) {
          const orderResponse = await axiosInstance.post('/course/create-order', {
            amount: course.fees,
            currency: 'INR',
            receipt: `course_${Date.now()}`,
          });

          if (orderResponse.data.success) {
            await initiateRazorpayPayment({ ...payload, razorpayOrderId: orderResponse.data.orderId });
          } else {
            toast.error("Failed to create payment order. Please try again.");
          }
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      } else {
        await axiosInstance.post(`/course/apply/${id}`, payload);
        setShowDialog(true);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Application submission failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!course) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
    </div>
  );

  return (
    <Layout>
      <div className="apply-course-page">
        <div className="apply-course-main-content">
          <div className="application-card">
            {/* Header Section */}
            <div className="application-header">
              <h1 className="application-title">Apply for {course.title}</h1>
              <p className="application-subtitle">{course.description}</p>
            </div>

            {/* Course Details Section */}
            <div className="course-details-section">
              <h2 className="course-details-title">Course Details</h2>
              <div className="course-details-grid">
                <div className="course-detail-card">
                  <p className="course-detail-item">
                    <span className="course-detail-label">Duration:</span> {course.duration}
                  </p>
                  <p className="course-detail-item">
                    <span className="course-detail-label">Fees:</span> {course.fees === 0 ? "Free" : `₹${course.fees}`}
                  </p>
                </div>
                <div className="course-detail-card">
                  <p className="course-detail-item">
                    <span className="course-detail-label">Level:</span> {course.level}
                  </p>
                  <p className="course-detail-item">
                    <span className="course-detail-label">Target Audience:</span> {course.targetAudience.join(', ')}
                  </p>
                </div>
              </div>
              <div className="course-requirements-card">
                <p className="requirement-item">
                  <span className="requirement-label">Requirements:</span> Students are expected to commit themselves for serious learning during the whole course by attending every day (Mandatory attendance is 90%), being punctual, and completing the homework on time.
                </p>
                <p className="requirement-item">
                  <span className="requirement-label">Infrastructure Requirements:</span> Schools/Institutions are requested to allocate 1 hour time every day for the students and provide a classroom with LED Screen and high-speed internet. Individual students should have a Smartphone/Laptop/Desktop and high-speed internet.
                </p>
                <p className="requirement-item">
                  <span className="requirement-label">Certification:</span> Certification is issued for students who complete the above course requirements.
                </p>
              </div>
            </div>

            {/* Form Section */}
            <div className="form-section">
              <h2 className="form-title">Application Form</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-grid">
                  {/* Hidden inputs for default values */}
                  <input type="hidden" {...register("referredBy")} value="" />
                  <input type="hidden" {...register("convenientTimeSlot")} value={course.timeSlots?.[0] || ""} />

                  <div className="form-group">
                    <label htmlFor="fullName" className="form-label">Full Name *</label>
                    <Input id="fullName" {...register("fullName")} placeholder="Your Full Name" className="form-input" />
                    {errors.fullName && <p className="form-error">{errors.fullName.message}</p>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email *</label>
                    <Input id="email" {...register("email")} type="email" placeholder="Your Email" className="form-input" />
                    {errors.email && <p className="form-error">{errors.email.message}</p>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="country" className="form-label">Country *</label>
                    <select
                      id="country"
                      {...register("country")}
                      className="form-select"
                      onChange={handleChange}
                    >
                      <option value="India">India</option>
                      <option value="USA">USA</option>
                      <option value="UK">UK</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                      <option value="UAE">UAE</option>
                      <option value="Other">Other Country</option>
                    </select>
                    {errors.country && <p className="form-error">{errors.country.message}</p>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">Phone Number *</label>
                    <div className="phone-input-container">
                      <span className="country-code">{phonePrefix}</span>
                      <Input
                        id="phone"
                        {...register("phone")}
                        placeholder={country === "India" ? "10 digit number" : "Local number"}
                        className="form-input phone-input"
                      />
                    </div>
                    {errors.phone && <p className="form-error">{errors.phone.message}</p>}
                    <p className="form-hint">
                      {country === "India"
                        ? "Enter 10 digit mobile number"
                        : `Enter local number (country code ${phonePrefix} will be added automatically)`}
                    </p>
                  </div>

                  {country === "India" && (
                    <>
                      <div className="form-group">
                        <label htmlFor="state" className="form-label">State *</label>
                        <select
                          id="state"
                          {...register("state")}
                          onChange={handleChange}
                          className="form-select"
                        >
                          <option value="">Select State</option>
                          {statesAndCities.map((stateData) => (
                            <option key={stateData.state} value={stateData.state}>
                              {stateData.state}
                            </option>
                          ))}
                        </select>
                        {errors.state && <p className="form-error">{errors.state.message}</p>}
                      </div>

                      <div className="form-group">
                        <label htmlFor="city" className="form-label">City *</label>
                        <select
                          id="city"
                          {...register("city")}
                          className="form-select"
                          disabled={!watch("state")}
                        >
                          <option value="">Select City</option>
                          {cities.map((city) => (
                            <option key={city} value={city}>{city}</option>
                          ))}
                        </select>
                        {errors.city && <p className="form-error">{errors.city.message}</p>}
                      </div>
                    </>
                  )}

                  {country !== "India" && (
                    <div className="form-group">
                      <label htmlFor="address" className="form-label">Address *</label>
                      <Textarea
                        id="address"
                        {...register("address")}
                        placeholder="Full address including city, state, and postal code"
                        className="form-textarea"
                      />
                      {errors.address && <p className="form-error">{errors.address.message}</p>}
                    </div>
                  )}

                  <div className="form-group">
                    <label htmlFor="motherTongue" className="form-label">Mother Tongue *</label>
                    <Input id="motherTongue" {...register("motherTongue")} placeholder="Mother Tongue" className="form-input" />
                    {errors.motherTongue && <p className="form-error">{errors.motherTongue.message}</p>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="age" className="form-label">Age *</label>
                    <Input id="age" {...register("age")} placeholder="Age" className="form-input" type="number" />
                    {errors.age && <p className="form-error">{errors.age.message}</p>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Gender *</label>
                    <div className="radio-group">
                      {["Male", "Female", "Other"].map((gender) => (
                        <div key={gender} className="radio-item">
                          <input
                            type="radio"
                            id={`gender-${gender}`}
                            {...register("gender")}
                            value={gender}
                            checked={watch("gender") === gender}
                            onChange={() => setValue("gender", gender)}
                            className="radio-input"
                          />
                          <label htmlFor={`gender-${gender}`} className="radio-label">{gender}</label>
                        </div>
                      ))}
                    </div>
                    {errors.gender && <p className="form-error">{errors.gender.message}</p>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Are you a student? *</label>
                    <div className="radio-group">
                      {["Yes", "No"].map((option) => (
                        <div key={option} className="radio-item">
                          <input
                            type="radio"
                            id={`student-${option}`}
                            {...register("isStudent")}
                            value={option}
                            checked={watch("isStudent") === option}
                            onChange={() => setValue("isStudent", option)}
                            className="radio-input"
                          />
                          <label htmlFor={`student-${option}`} className="radio-label">{option}</label>
                        </div>
                      ))}
                    </div>
                    {errors.isStudent && <p className="form-error">{errors.isStudent.message}</p>}
                  </div>

                  {isStudent === "Yes" && (
                    <div className="form-group">
                      <label htmlFor="classStudying" className="form-label">Which class are you studying in? *</label>
                      <Input
                        id="classStudying"
                        {...register("classStudying")}
                        placeholder="Which class are you studying in?"
                        className="form-input"
                      />
                      {errors.classStudying && <p className="form-error">{errors.classStudying.message}</p>}
                    </div>
                  )}

                  <div className="form-group">
                    <label htmlFor="whatsappNumber" className="form-label">WhatsApp Contact Number *</label>
                    <div className="phone-input-container">
                      <span className="country-code">{whatsappPrefix}</span>
                      <Input
                        id="whatsappNumber"
                        {...register("whatsappNumber")}
                        placeholder={country === "India" ? "10 digit number" : "Local number"}
                        className="form-input phone-input"
                      />
                    </div>
                    {errors.whatsappNumber && <p className="form-error">{errors.whatsappNumber.message}</p>}
                    <p className="form-hint">
                      {country === "India"
                        ? "Enter 10 digit mobile number"
                        : `Enter local number (country code ${whatsappPrefix} will be added automatically)`}
                    </p>
                  </div>

                  <div className="form-group">
                    <label htmlFor="referredBy" className="form-label">Referred By *</label>
                    <select id="referredBy" {...register("referredBy")} className="form-select">
                      {referredByOptions.map((option) => (
                        <option key={option._id} value={option.name}>{option.name}</option>
                      ))}
                    </select>
                    {errors.referredBy && <p className="form-error">{errors.referredBy.message}</p>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Convenient Time Slot *</label>
                    {course.timeSlots && course.timeSlots.length > 0 ? (
                      <div className="time-slots-container">
                        <div className="time-slots-grid">
                          {course.timeSlots.map((slot) => (
                            <div key={slot} className="time-slot-item">
                              <input
                                type="radio"
                                id={`slot-${slot}`}
                                {...register("convenientTimeSlot")}
                                value={slot}
                                checked={watch("convenientTimeSlot") === slot}
                                onChange={() => setValue("convenientTimeSlot", slot)}
                                className="time-slot-input"
                              />
                              <label htmlFor={`slot-${slot}`} className="time-slot-label">{slot}</label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <>
                        <input type="hidden" {...register("convenientTimeSlot")} value="Not specified" />
                        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <p className="text-yellow-800 text-sm">
                            <strong>Note:</strong> Convenient time slots have not been added for this course yet. Please contact the administrator for scheduling information.
                          </p>
                        </div>
                      </>
                    )}
                    {errors.convenientTimeSlot && <p className="form-error">{errors.convenientTimeSlot.message}</p>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="message" className="form-label">Why are you applying for this course? (Optional)</label>
                    <Textarea
                      id="message"
                      {...register("message")}
                      placeholder="Why are you applying for this course?"
                      className="form-textarea"
                    />
                  </div>

                  <div className="form-group">
                    {course.fees == 0 ? (
                      <button type="submit" className="submit-button" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          "Submit Application"
                        )}
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className={`payment-button ${isSubmitting || paymentLoading ? 'loading' : ''}`}
                        disabled={isSubmitting || paymentLoading}
                      >
                        {isSubmitting || paymentLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {paymentLoading ? "Redirecting to Payment..." : "Processing..."}
                          </>
                        ) : (
                          "Proceed to Payment"
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Success Dialogs */}
          <Dialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
            <DialogContent className="success-dialog">
              <div className="success-icon">
                <CheckCircle2 className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <DialogHeader className="text-center">
                <DialogTitle className="success-title">
                  Thank You for Your Application!
                </DialogTitle>
                <DialogDescription className="success-message">
                  Your application has been successfully processed. A confirmation email has been sent to your email address.
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4 flex justify-center">
                <button
                  onClick={() => {
                    setIsSuccessDialogOpen(false);
                    setShowDialog(true);
                  }}
                  className="success-button"
                >
                  Close
                </button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogContent className="application-success-dialog">
              <DialogHeader>
                <DialogTitle className="application-success-title">Application Submitted!</DialogTitle>
              </DialogHeader>
              <p className="application-success-message">
                We've received your application for <strong>{course.title}</strong>. You will hear from us soon!
              </p>
              <p className="application-success-message">
                You have successfully registered for the NEIEA Foundational English Course. We will inform you about the start of the class in the WhatsApp group.
              </p>
              {course.whatsappLink && (
                <p className="application-success-message">
                  <a href={course.whatsappLink} target="_blank" rel="noopener noreferrer" className="whatsapp-link">
                    Join our WhatsApp group for updates
                  </a>
                </p>
              )}
              <p className="application-success-contact">
                Best regards from Team NEIEA
              </p>
              <p className="application-success-contact">
                For more details, please contact:
                <br />
                Ms. Taskeen - +917090770784
                <br />
                Ms. Saara - +919019431646
              </p>
              <button
                className="back-button"
                onClick={() => {
                  setShowDialog(false);
                  goHome();
                }}
              >
                Go Back to Courses
              </button>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </Layout>
  );
};

export default ApplyCourse;
