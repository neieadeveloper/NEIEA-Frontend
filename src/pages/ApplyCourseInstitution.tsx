import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import './ApplyCourseInstitution.css';

const formSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  institutionName: z.string().min(1, "Institution Name is required"),
  howDidYouFindUs: z.string().optional().refine(
    (val) => !val || val.length > 0,
    { message: "This field is required" }
  ),
  referredBy: z.string().optional().refine(
    (val) => !val || val.length > 0,
    { message: "Referred By is required" }
  ),
  coordinatorName: z.string().min(1, "Coordinator Name is required"),
  coordinatorContactNumber1: z.string().min(10, "Contact number must be at least 10 digits").max(10, "Contact number must be at most 10 digits").regex(/^\d+$/, "Contact number must contain only numbers"),
  coordinatorEmail: z.string().min(1, "Coordinator Email is required").email("Invalid email address"),
  coordinatorContactNumber2: z
    .string()
    .optional()
    .refine(
      (val) => !val || (val.length === 10 && /^\d+$/.test(val)),
      "Contact number must be 10 digits and contain only numbers"
    ),
  coordinatorEmail2: z.string().email("Invalid email address").or(z.literal("")),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  address: z.string().min(1, "Address is required"),
  numberOfStudents: z.string().min(1, "Number of Students is required"),
  startMonth: z.string().min(1, "Start Month is required"),
  studentList: z.instanceof(FileList).refine((files) => {
    if (files.length === 0) return true;
    const file = files[0];
    const validTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel', 'image/jpeg', 'image/png'];
    return validTypes.includes(file.type) && file.size <= 10 * 1024 * 1024;
  }, "File must be an Excel or image file and less than 10 MB"),
  institutionLogo: z.instanceof(FileList).refine((files) => {
    if (files.length === 0) return true;
    const file = files[0];
    return file.type.startsWith('image/') && file.size <= 100 * 1024 * 1024;
  }, "File must be an image and less than 100 MB"),
  suitableTime: z.string().min(1, "Suitable Time is required"),
});

type FormData = z.infer<typeof formSchema>;

const ApplyCourseInstitution = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cities, setCities] = useState<string[]>([]);
  const [referredByOptions, setReferredByOptions] = useState([{ _id: "", name: "Select Option" }]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [category, setCategory] = useState("");

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  // Get course data from location state (passed from Courses page)
  const courseData = location.state;
  const courseIds = courseData?.selectedCourses || [];
  const categoryName = courseData?.category || "";

  const fetchReferredByList = async () => {
    try {
      const response = await axiosInstance.get("/course/referred-by-list");
      if (response.data.success) {
        setReferredByOptions([{ _id: "", name: "Select Option" }, ...response.data.data]);
      }
    } catch (error) {
      toast.error("Failed to load referred by list");
    }
  };

  useEffect(() => {
    fetchReferredByList();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue(name, value);
    if (name === "state") {
      const selectedState = statesAndCities.find((s) => s.state === value);
      setCities(selectedState ? selectedState.cities : []);
    }
  };

  const timeSlots = Array.from({ length: 15 }, (_, i) => {
    const startHour = 8 + i;
    const endHour = 9 + i;
    const startAmPm = startHour >= 12 ? 'PM' : 'AM';
    const endAmPm = endHour >= 12 ? 'PM' : 'AM';
    const displayStartHour = startHour > 12 ? startHour - 12 : startHour;
    const displayEndHour = endHour > 12 ? endHour - 12 : endHour;
    return `${displayStartHour} ${startAmPm} to ${displayEndHour} ${endAmPm}`;
  });

  const onSubmit = async (data: FormData) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key !== "studentList" && key !== "institutionLogo") {
          if (typeof value === 'string') {
            formData.append(key, value);
          }
        }
      });
      courseIds.forEach((id) => {
        formData.append("courseIds", id);
      });
      if (data.studentList && data.studentList.length > 0) {
        formData.append("studentList", data.studentList[0]);
      }
      if (data.institutionLogo && data.institutionLogo.length > 0) {
        formData.append("institutionLogo", data.institutionLogo[0]);
      }
      await axiosInstance.post(`/course/apply-institution`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Application submitted successfully!");
      goHome();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Application submission failed");
    }
  };

  const goHome = () => {
    navigate("/");
    window.location.reload(); // force refresh
  };

  return (
    <Layout>
      <div className="apply-institution-page">
        <div className="apply-institution-main-content">
          <div className="institution-application-card">
            {/* Header Section */}
            <div className="institution-header">
              <h1 className="institution-title">Institution Course Application</h1>
              <p className="institution-subtitle">
                Applying for {courseIds.length} course{courseIds.length !== 1 ? 's' : ''} from {categoryName} category
              </p>
            </div>
            
            {/* Selected Courses Section */}
            {courseIds.length > 0 && (
              <div className="selected-courses-section">
                <h2 className="selected-courses-title">Selected Courses</h2>
                <div className="selected-courses-card">
                  <p className="selected-courses-info">
                    <span className="selected-courses-label">Number of Courses:</span> {courseIds.length} course{courseIds.length !== 1 ? 's' : ''}
                  </p>
                  <p className="selected-courses-info">
                    <span className="selected-courses-label">Category:</span> {categoryName}
                  </p>
                </div>
              </div>
            )}
            
            {/* Form Section */}
            <div className="institution-form-section">
              <h2 className="institution-form-title">Institution Details</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="institution-form-grid">
                  <div className="institution-form-group">
                    <label htmlFor="email" className="institution-form-label">Email *</label>
                    <Input id="email" {...register("email")} type="email" placeholder="Your Email" className="institution-form-input" />
                    {errors.email && <p className="institution-form-error">{errors.email.message}</p>}
                  </div>
                  <div className="institution-form-group">
                    <label htmlFor="institutionName" className="institution-form-label">Name of Institution/Madarsa/Organization/Other *</label>
                    <Input id="institutionName" {...register("institutionName")} placeholder="Institution Name" className="institution-form-input" />
                    {errors.institutionName && <p className="institution-form-error">{errors.institutionName.message}</p>}
                  </div>
                  <div className="institution-form-group">
                    <label htmlFor="howDidYouFindUs" className="institution-form-label">How did you find us?</label>
                    <select id="howDidYouFindUs" {...register("howDidYouFindUs")} className="institution-form-select">
                      <option value="">Select Option</option>
                      <option value="Facebook">Facebook</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="Instagram">Instagram</option>
                      <option value="Website">Website</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.howDidYouFindUs && <p className="institution-form-error">{errors.howDidYouFindUs.message}</p>}
                  </div>
                  <div className="institution-form-group">
                    <label htmlFor="referredBy" className="institution-form-label">Referred By</label>
                    <select id="referredBy" {...register("referredBy")} className="institution-form-select">
                      {referredByOptions.map((option) => (
                        <option key={option._id} value={option.name}>{option.name}</option>
                      ))}
                    </select>
                    {errors.referredBy && <p className="institution-form-error">{errors.referredBy.message}</p>}
                  </div>
                  <div className="institution-form-group">
                    <label htmlFor="coordinatorName" className="institution-form-label">Institution coordinator's name *</label>
                    <Input id="coordinatorName" {...register("coordinatorName")} placeholder="Coordinator Name" className="institution-form-input" />
                    {errors.coordinatorName && <p className="institution-form-error">{errors.coordinatorName.message}</p>}
                  </div>
                  <div className="institution-form-group">
                    <label htmlFor="coordinatorContactNumber1" className="institution-form-label">Institution coordinator's Contact Number-1 *</label>
                    <Input id="coordinatorContactNumber1" {...register("coordinatorContactNumber1")} placeholder="Contact Number" className="institution-form-input" />
                    {errors.coordinatorContactNumber1 && <p className="institution-form-error">{errors.coordinatorContactNumber1.message}</p>}
                  </div>
                  <div className="institution-form-group">
                    <label htmlFor="coordinatorEmail" className="institution-form-label">Institution coordinator's Email *</label>
                    <Input id="coordinatorEmail" {...register("coordinatorEmail")} type="email" placeholder="Coordinator Email" className="institution-form-input" />
                    {errors.coordinatorEmail && <p className="institution-form-error">{errors.coordinatorEmail.message}</p>}
                  </div>
                  <div className="institution-form-group">
                    <label htmlFor="coordinatorContactNumber2" className="institution-form-label">Institution coordinator's Contact Number-2</label>
                    <Input id="coordinatorContactNumber2" {...register("coordinatorContactNumber2")} placeholder="Contact Number" className="institution-form-input" />
                    {errors.coordinatorContactNumber2 && <p className="institution-form-error">{errors.coordinatorContactNumber2.message}</p>}
                  </div>
                  <div className="institution-form-group">
                    <label htmlFor="coordinatorEmail2" className="institution-form-label">Institution coordinator's Email-2</label>
                    <Input id="coordinatorEmail2" {...register("coordinatorEmail2")} type="email" placeholder="Coordinator Email" className="institution-form-input" />
                    {errors.coordinatorEmail2 && <p className="institution-form-error">{errors.coordinatorEmail2.message}</p>}
                  </div>
                  <div className="institution-form-group">
                    <label htmlFor="state" className="institution-form-label">State *</label>
                    <select id="state" {...register("state")} onChange={handleChange} className="institution-form-select">
                      <option value="">Select State</option>
                      {statesAndCities.map((stateData) => (
                        <option key={stateData.state} value={stateData.state}>{stateData.state}</option>
                      ))}
                    </select>
                    {errors.state && <p className="institution-form-error">{errors.state.message}</p>}
                  </div>
                  <div className="institution-form-group">
                    <label htmlFor="city" className="institution-form-label">City *</label>
                    <select id="city" {...register("city")} className="institution-form-select">
                      <option value="">Select City</option>
                      {cities.map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                    {errors.city && <p className="institution-form-error">{errors.city.message}</p>}
                  </div>
                  <div className="institution-form-group">
                    <label htmlFor="address" className="institution-form-label">Institution/School's Address *</label>
                    <Textarea id="address" {...register("address")} placeholder="Address" className="institution-form-textarea" />
                    {errors.address && <p className="institution-form-error">{errors.address.message}</p>}
                  </div>
                  <div className="institution-form-group">
                    <label htmlFor="numberOfStudents" className="institution-form-label">Number of students who will be attending the class *</label>
                    <Input id="numberOfStudents" {...register("numberOfStudents")} placeholder="Number of Students" className="institution-form-input" />
                    {errors.numberOfStudents && <p className="institution-form-error">{errors.numberOfStudents.message}</p>}
                  </div>
                  <div className="institution-form-group">
                    <label htmlFor="startMonth" className="institution-form-label">When is the earliest you can start *</label>
                    <select id="startMonth" {...register("startMonth")} className="institution-form-select">
                      <option value="">Select Month</option>
                      <option value="January">January</option>
                      <option value="February">February</option>
                      <option value="March">March</option>
                      <option value="April">April</option>
                      <option value="May">May</option>
                      <option value="June">June</option>
                      <option value="July">July</option>
                      <option value="August">August</option>
                      <option value="September">September</option>
                      <option value="October">October</option>
                      <option value="November">November</option>
                      <option value="December">December</option>
                    </select>
                    {errors.startMonth && <p className="institution-form-error">{errors.startMonth.message}</p>}
                  </div>
                  <div className="institution-form-group">
                    <label htmlFor="studentList" className="institution-form-label">Upload Student List</label>
                    <Input id="studentList" type="file" {...register("studentList")} accept=".xlsx, .xls, image/jpeg, image/png" className="institution-form-file" />
                    {errors.studentList && <p className="institution-form-error">{errors.studentList.message}</p>}
                  </div>
                  <div className="institution-form-group">
                    <label htmlFor="institutionLogo" className="institution-form-label">Upload Institution Logo</label>
                    <Input id="institutionLogo" type="file" {...register("institutionLogo")} accept="image/jpeg, image/png" className="institution-form-file" />
                    {errors.institutionLogo && <p className="institution-form-error">{errors.institutionLogo.message}</p>}
                  </div>
                  <div className="institution-form-group time-slots-section">
                    <label className="time-slots-title">Suitable Time for Class *</label>
                    <div className="time-slots-grid">
                      {timeSlots.map((time) => (
                        <div key={time} className="time-slot-item">
                          <Input
                            type="radio"
                            id={`time-${time}`}
                            {...register("suitableTime")}
                            value={time}
                            className="time-slot-input"
                          />
                          <label htmlFor={`time-${time}`} className="time-slot-label">
                            {time}
                          </label>
                        </div>
                      ))}
                    </div>
                    {errors.suitableTime && <p className="institution-form-error">{errors.suitableTime.message}</p>}
                  </div>
                </div>
                <div className="institution-form-group">
                  <button type="submit" className="institution-submit-button">
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ApplyCourseInstitution;
