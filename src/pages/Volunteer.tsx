import Layout from "@/components/Layout";
// @ts-ignore
import PageTemplate from "../components/PageTemplate.jsx";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type LanguageProficiency = {
  speaking: boolean;
  writing: boolean;
  reading: boolean;
  none: boolean;
};

type Address = {
  city: string;
  state: string;
  country: string;
};

type SocialMedia = {
  facebook: string;
  linkedIn: string;
  instagram: string;
  twitter: string;
  youTube: string;
};

type ContentCreation = {
  hasExperience: boolean;
  createdBefore: string[];
  toolsUsed: string[];
};

type Outreach = {
  hasOutreachExperience: boolean;
  outreachActivities: string[];
};

type Fundraising = {
  hasFundraisingExperience: boolean;
  fundraisingTypes: string[];
};

type FormData = {
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  phone: string;
  emergencyPhone: string;
  email: string;
  address: Address;
  languageProficiency: {
    english: LanguageProficiency;
    hindi: LanguageProficiency;
    urdu: LanguageProficiency;
    bengali: LanguageProficiency;
    telugu: LanguageProficiency;
    kannada: LanguageProficiency;
    marathi: LanguageProficiency;
    otherLanguage: string;
  };
  dailyCommitment: string;
  availability: string[];
  volunteerField: string;
  socialMedia?: SocialMedia;
  contentCreation?: ContentCreation;
  outreach?: Outreach;
  fundraising?: Fundraising;
  teachingExperience?: string;
  onlineTeachingYears?: string;
  ageGroups?: string[];
  confidentSubjects?: string[];
  relevantExperience: string;
  motivation: string;
  commitmentDuration: string;
  dateOfJoining: string;
};

type Errors = {
  [key: string]: string;
};

const VolunteerForm = () => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    phone: "",
    emergencyPhone: "",
    email: "",
    address: {
      city: "",
      state: "",
      country: "",
    },
    languageProficiency: {
      english: { speaking: false, writing: false, reading: false, none: false },
      hindi: { speaking: false, writing: false, reading: false, none: false },
      urdu: { speaking: false, writing: false, reading: false, none: false },
      bengali: { speaking: false, writing: false, reading: false, none: false },
      telugu: { speaking: false, writing: false, reading: false, none: false },
      kannada: { speaking: false, writing: false, reading: false, none: false },
      marathi: { speaking: false, writing: false, reading: false, none: false },
      otherLanguage: "",
    },
    dailyCommitment: "",
    availability: [],
    volunteerField: "",
    socialMedia: {
      facebook: "",
      linkedIn: "",
      instagram: "",
      twitter: "",
      youTube: "",
    },
    contentCreation: {
      hasExperience: false,
      createdBefore: [],
      toolsUsed: [],
    },
    outreach: {
      hasOutreachExperience: false,
      outreachActivities: [],
    },
    fundraising: {
      hasFundraisingExperience: false,
      fundraisingTypes: [],
    },
    teachingExperience: "",
    onlineTeachingYears: "",
    ageGroups: [],
    confidentSubjects: [],
    relevantExperience: "",
    motivation: "",
    commitmentDuration: "",
    dateOfJoining: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();

  const validateStep1 = (): boolean => {
    const newErrors: Errors = {};
    
    // Basic required field validation
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.dob) newErrors.dob = "Date of birth is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.address.city.trim()) newErrors.city = "City is required";
    if (!formData.address.state.trim()) newErrors.state = "State is required";
    if (!formData.address.country.trim()) newErrors.country = "Country is required";
    
    // Name validation (letters, spaces, hyphens, apostrophes only)
    const nameRegex = /^[a-zA-Z\s\-']+$/;
    if (formData.firstName.trim()) {
      if (!nameRegex.test(formData.firstName.trim())) {
        newErrors.firstName = "First name can only contain letters, spaces, hyphens, and apostrophes";
      } else if (formData.firstName.trim().length < 2) {
        newErrors.firstName = "First name must be at least 2 characters long";
      } else if (formData.firstName.trim().length > 50) {
        newErrors.firstName = "First name must be less than 50 characters";
      }
    }
    
    if (formData.lastName.trim()) {
      if (!nameRegex.test(formData.lastName.trim())) {
        newErrors.lastName = "Last name can only contain letters, spaces, hyphens, and apostrophes";
      } else if (formData.lastName.trim().length < 2) {
        newErrors.lastName = "Last name must be at least 2 characters long";
      } else if (formData.lastName.trim().length > 50) {
        newErrors.lastName = "Last name must be less than 50 characters";
      }
    }
    
    // Address validation (letters, spaces, hyphens, apostrophes, periods, commas only)
    const addressRegex = /^[a-zA-Z\s\-'.,]+$/;
    
    if (formData.address.city.trim()) {
      if (!addressRegex.test(formData.address.city.trim())) {
        newErrors.city = "City name can only contain letters, spaces, hyphens, apostrophes, periods, and commas";
      } else if (formData.address.city.trim().length < 2) {
        newErrors.city = "City name must be at least 2 characters long";
      } else if (formData.address.city.trim().length > 100) {
        newErrors.city = "City name must be less than 100 characters";
      }
    }
    
    if (formData.address.state.trim()) {
      if (!addressRegex.test(formData.address.state.trim())) {
        newErrors.state = "State name can only contain letters, spaces, hyphens, apostrophes, periods, and commas";
      } else if (formData.address.state.trim().length < 2) {
        newErrors.state = "State name must be at least 2 characters long";
      } else if (formData.address.state.trim().length > 100) {
        newErrors.state = "State name must be less than 100 characters";
      }
    }
    
    if (formData.address.country.trim()) {
      if (!addressRegex.test(formData.address.country.trim())) {
        newErrors.country = "Country name can only contain letters, spaces, hyphens, apostrophes, periods, and commas";
      } else if (formData.address.country.trim().length < 2) {
        newErrors.country = "Country name must be at least 2 characters long";
      } else if (formData.address.country.trim().length > 100) {
        newErrors.country = "Country name must be less than 100 characters";
      }
    }
    if (!formData.dailyCommitment) newErrors.dailyCommitment = "Daily commitment is required";
    if (formData.availability.length === 0) newErrors.availability = "Availability is required";
    if (!formData.volunteerField) newErrors.volunteerField = "Volunteer field is required";
    
    // Language Proficiency validation - at least one language must have some proficiency
    const languages = ['english', 'hindi', 'urdu', 'bengali', 'telugu', 'kannada', 'marathi'] as const;
    let hasLanguageProficiency = false;
    
    languages.forEach(lang => {
      const langData = formData.languageProficiency[lang];
      if (langData && (langData.speaking || langData.writing || langData.reading)) {
        hasLanguageProficiency = true;
      }
    });
    
    // Check if other language is provided
    if (formData.languageProficiency.otherLanguage.trim()) {
      hasLanguageProficiency = true;
      // Validate other language format
      const otherLangRegex = /^[a-zA-Z\s\-']+$/;
      if (!otherLangRegex.test(formData.languageProficiency.otherLanguage.trim())) {
        newErrors.otherLanguage = "Other language can only contain letters, spaces, hyphens, and apostrophes";
      } else if (formData.languageProficiency.otherLanguage.trim().length < 2) {
        newErrors.otherLanguage = "Other language must be at least 2 characters long";
      } else if (formData.languageProficiency.otherLanguage.trim().length > 50) {
        newErrors.otherLanguage = "Other language must be less than 50 characters";
      }
    }
    
    if (!hasLanguageProficiency) {
      newErrors.languageProficiency = "Please select at least one language proficiency";
    }
    
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email.trim() && !emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }
    
    // Phone number validation (basic)
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (formData.phone.trim() && !phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = "Please enter a valid phone number";
    }
    
    // Emergency Contact Number validation (10 digits only, optional field)
    if (formData.emergencyPhone.trim()) {
      const emergencyPhoneRegex = /^\d{10}$/;
      if (!emergencyPhoneRegex.test(formData.emergencyPhone.replace(/\s/g, ''))) {
        newErrors.emergencyPhone = "Emergency contact number must be exactly 10 digits";
      }
    }
    
    // Date of birth validation (must be in the past)
    if (formData.dob) {
      const birthDate = new Date(formData.dob);
      const today = new Date();
      const minAge = new Date();
      const maxAge = new Date();
      
      // Set minimum age to 16 years and maximum age to 100 years
      minAge.setFullYear(today.getFullYear() - 16);
      maxAge.setFullYear(today.getFullYear() - 100);
      
      // Set time to start of day for accurate comparison
      birthDate.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);
      minAge.setHours(0, 0, 0, 0);
      maxAge.setHours(0, 0, 0, 0);
      
      if (birthDate >= today) {
        newErrors.dob = "Date of birth must be in the past";
      } else if (birthDate > minAge) {
        newErrors.dob = "You must be at least 16 years old to volunteer";
      } else if (birthDate < maxAge) {
        newErrors.dob = "Please enter a valid date of birth";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: Errors = {};
    if (formData.volunteerField === "Teaching") {
      if (!formData.teachingExperience) newErrors.teachingExperience = "Teaching experience is required";
      if (!formData.onlineTeachingYears) newErrors.onlineTeachingYears = "Online teaching years is required";
      if (!formData.ageGroups || formData.ageGroups.length === 0) newErrors.ageGroups = "Age groups are required";
      if (!formData.confidentSubjects || formData.confidentSubjects.length === 0) newErrors.confidentSubjects = "Subjects are required";
    }
    if (formData.volunteerField === "Social Media Management") {
      if (!formData.socialMedia) newErrors.socialMedia = "Social media details are required";
      else {
        if (!formData.socialMedia.facebook) newErrors.facebook = "Facebook experience is required";
        if (!formData.socialMedia.linkedIn) newErrors.linkedIn = "LinkedIn experience is required";
        if (!formData.socialMedia.instagram) newErrors.instagram = "Instagram experience is required";
        if (!formData.socialMedia.twitter) newErrors.twitter = "Twitter experience is required";
        if (!formData.socialMedia.youTube) newErrors.youTube = "YouTube experience is required";
      }
    }
    else if (formData.volunteerField === "Content Creation") {
      if (!formData.contentCreation) newErrors.contentCreation = "Content creation details are required";
      else {
        if (formData.contentCreation.hasExperience === undefined) newErrors.hasExperience = "Experience status is required";
        if (!formData.contentCreation.createdBefore || formData.contentCreation.createdBefore.length === 0)
          newErrors.createdBefore = "Created before details are required";
        if (!formData.contentCreation.toolsUsed || formData.contentCreation.toolsUsed.length === 0)
          newErrors.toolsUsed = "Tools used details are required";
      }
    }
    else if (formData.volunteerField === "Outreach") {
      if (!formData.outreach) newErrors.outreach = "Outreach details are required";
      else {
        if (formData.outreach.hasOutreachExperience === undefined) newErrors.hasOutreachExperience = "Outreach experience status is required";
        if (!formData.outreach.outreachActivities || formData.outreach.outreachActivities.length === 0)
          newErrors.outreachActivities = "Outreach activities are required";
      }
    }
    else if (formData.volunteerField === "Fundraising") {
      if (!formData.fundraising) newErrors.fundraising = "Fundraising details are required";
      else {
        if (formData.fundraising.hasFundraisingExperience === undefined) newErrors.hasFundraisingExperience = "Fundraising experience status is required";
        if (!formData.fundraising.fundraisingTypes || formData.fundraising.fundraisingTypes.length === 0)
          newErrors.fundraisingTypes = "Fundraising types are required";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = (): boolean => {
    const newErrors: Errors = {};
    
    // Basic required field validation
    if (!formData.relevantExperience.trim()) newErrors.relevantExperience = "Relevant experience is required";
    if (!formData.motivation.trim()) newErrors.motivation = "Motivation is required";
    if (!formData.commitmentDuration) newErrors.commitmentDuration = "Commitment duration is required";
    if (!formData.dateOfJoining) newErrors.dateOfJoining = "Date of joining is required";
    
    // Minimum length validation for text fields
    if (formData.relevantExperience.trim() && formData.relevantExperience.trim().length < 10) {
      newErrors.relevantExperience = "Please provide more details about your relevant experience (at least 10 characters)";
    }
    
    if (formData.motivation.trim() && formData.motivation.trim().length < 10) {
      newErrors.motivation = "Please provide more details about your motivation (at least 10 characters)";
    }
    
    // Date validation (joining date should be within reasonable range)
    if (formData.dateOfJoining) {
      const joiningDate = new Date(formData.dateOfJoining);
      const today = new Date();
      const sixMonthsAgo = new Date();
      const twoYearsFromNow = new Date();
      
      // Set reasonable date range: 6 months ago to 2 years from now
      sixMonthsAgo.setMonth(today.getMonth() - 6);
      twoYearsFromNow.setFullYear(today.getFullYear() + 2);
      
      // Set time to start of day for accurate comparison
      joiningDate.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);
      sixMonthsAgo.setHours(0, 0, 0, 0);
      twoYearsFromNow.setHours(0, 0, 0, 0);
      
      if (joiningDate < sixMonthsAgo) {
        newErrors.dateOfJoining = "Date of joining cannot be more than 6 months in the past";
      } else if (joiningDate > twoYearsFromNow) {
        newErrors.dateOfJoining = "Date of joining cannot be more than 2 years in the future";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1) {
      if (validateStep1()) {
        if (formData.volunteerField === "Other") {
          setStep(3);
        } else {
          setStep(2);
        }
      } else {
        // Validation failed, show error message
        toast.error("Please fill in all required fields before proceeding to the next step.");
      }
    }
    else if (step === 2) {
      if (validateStep2()) {
        setStep(3);
      } else {
        // Validation failed, show error message
        toast.error("Please fill in all required fields before proceeding to the next step.");
      }
    }
  };

  const handleBack = () => setStep(step - 1);

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      dob: "",
      gender: "",
      phone: "",
      emergencyPhone: "",
      email: "",
      address: {
        city: "",
        state: "",
        country: "",
      },
      languageProficiency: {
        english: { speaking: false, writing: false, reading: false, none: false },
        hindi: { speaking: false, writing: false, reading: false, none: false },
        urdu: { speaking: false, writing: false, reading: false, none: false },
        bengali: { speaking: false, writing: false, reading: false, none: false },
        telugu: { speaking: false, writing: false, reading: false, none: false },
        kannada: { speaking: false, writing: false, reading: false, none: false },
        marathi: { speaking: false, writing: false, reading: false, none: false },
        otherLanguage: "",
      },
      dailyCommitment: "",
      availability: [],
      volunteerField: "",
      socialMedia: {
        facebook: "",
        linkedIn: "",
        instagram: "",
        twitter: "",
        youTube: "",
      },
      contentCreation: {
        hasExperience: false,
        createdBefore: [],
        toolsUsed: [],
      },
      outreach: {
        hasOutreachExperience: false,
        outreachActivities: [],
      },
      fundraising: {
        hasFundraisingExperience: false,
        fundraisingTypes: [],
      },
      teachingExperience: "",
      onlineTeachingYears: "",
      ageGroups: [],
      confidentSubjects: [],
      relevantExperience: "",
      motivation: "",
      commitmentDuration: "",
      dateOfJoining: "",
    });
    setErrors({});
    setStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep3()) {
      setIsSubmitting(true);
      try {
        const payload = { ...formData };
        if (payload.volunteerField !== "Social Media Management") {
          delete payload.socialMedia; // Remove socialMedia if not needed
        }
        const response = await axiosInstance.post("/volunteer", payload);
        console.log("Form submitted:", response.data);
        toast.success("Thanks for contacting us! We will get in touch with you shortly.")
        resetForm();
        navigate('/donation/volunteer');
      } catch (error) {
        console.error("Error submitting form:", error);
        const errorMessage = error instanceof Error && 'response' in error 
          ? (error as any).response?.data?.errors || (error as any).response?.data?.message || 'Unknown error'
          : 'Unknown error';
        toast.error(`${errorMessage}`);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Validation failed, show error message
      toast.error("Please fill in all required fields before submitting the form.");
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = (field: keyof Address, value: string) => {
    setFormData((prev) => ({
      ...prev,
      address: { ...prev.address, [field]: value },
    }));
  };

  const handleArrayChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => {
      const currentArray = prev[field] as string[];
      return {
        ...prev,
        [field]: currentArray.includes(value)
          ? currentArray.filter((item) => item !== value)
          : [...currentArray, value],
      };
    });
  };

  const handleLanguageChange = (
    lang: keyof FormData["languageProficiency"],
    skill: keyof LanguageProficiency,
    checked: boolean
  ) => {
    // Skip if it's "otherLanguage", since that's a string, not an object
    if (lang === "otherLanguage") {
      return; // or handle it separately if needed
    }

    setFormData((prev) => ({
      ...prev,
      languageProficiency: {
        ...prev.languageProficiency,
        [lang]: {
          ...prev.languageProficiency[lang],
          [skill]: checked,
        },
      },
    }));
  };

  const handleSocialMediaChange = (platform: keyof SocialMedia, value: string) => {
    setFormData((prev) => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [platform]: value,
      } as SocialMedia,
    }));
  };

  const handleContentCreationChange = (field: keyof ContentCreation, value: boolean | string[]) => {
    setFormData((prev) => ({
      ...prev,
      contentCreation: {
        ...prev.contentCreation,
        [field]: value,
      } as ContentCreation,
    }));
  };

  const handleOutreachChange = (field: keyof Outreach, value: boolean | string[]) => {
    setFormData((prev) => ({
      ...prev,
      outreach: {
        ...prev.outreach,
        [field]: value,
      } as Outreach,
    }));
  };

  const handleFundraisingChange = (field: keyof Fundraising, value: boolean | string[]) => {
    setFormData((prev) => ({
      ...prev,
      fundraising: {
        ...prev.fundraising,
        [field]: value,
      } as Fundraising,
    }));
  };


  return (
    <Layout>
      <PageTemplate
        breadcrumbPath={[{ name: "Volunteer", link: null }]}
        title="Volunteer for Educational Change"
        subtitle="Join NEIEA as a Volunteer and Make a Difference!"
        description="Join our mission to make quality education accessible to all. Your skills, passion, and time can transform lives and communities."
      >
      {/* Volunteer Content Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Main Title */}
            <div className="text-center mb-12">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Volunteer with NEIEA – Empower and build a better society
              </h1>
              <p className="text-xl text-gray-700 leading-relaxed">
                Join The New Equitable and Innovative Educational Association (NEIEA) and make a real difference in the lives of children from slums, marginalized communities, and madrasas. By volunteering, you contribute to the upliftment of underserved communities across India and elsewhere, through online education.
              </p>
            </div>

            {/* Why Volunteer Section */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Volunteer?</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-2xl text-gray-700 mr-3">●</span>
                  <p className="text-lg text-gray-700">Impact lives by supporting low cost and free education.</p>
                </div>
                <div className="flex items-start">
                  <span className="text-2xl text-gray-700 mr-3">●</span>
                  <p className="text-lg text-gray-700">Develop skills in teaching, leadership, and communication.</p>
                </div>
                <div className="flex items-start">
                  <span className="text-2xl text-gray-700 mr-3">●</span>
                  <p className="text-lg text-gray-700">Flexible roles – teach, mentor, fundraise, create content, or support events.</p>
                </div>
              </div>
            </div>

            {/* Who Can Join Section */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Who Can Join?</h2>
              <p className="text-xl text-gray-700">
                Students, professionals, homemakers, or retirees – anyone passionate about education is welcome.
              </p>
            </div>

            {/* Get Started Section */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Get Started</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <span className="bg-gray-900 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold mr-4 mt-1">1</span>
                  <p className="text-lg text-gray-700">Fill out the volunteer form.</p>
                </div>
                <div className="flex items-start">
                  <span className="bg-gray-900 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold mr-4 mt-1">2</span>
                  <p className="text-lg text-gray-700">Get connected with our team.</p>
                </div>
                <div className="flex items-start">
                  <span className="bg-gray-900 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold mr-4 mt-1">3</span>
                  <p className="text-lg text-gray-700">Begin your journey of change.</p>
                </div>
              </div>
            </div>

            {/* Volunteer Image */}
            <div className="text-center">
              <img 
                src="/assets/images/volunteerImage.jpg" 
                alt="Volunteer with NEIEA" 
                className="max-w-full h-auto mx-auto rounded-lg shadow-lg"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-ngo-color6 mb-4">Volunteer Registration</h2>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
                <div
                  className="bg-ngo-color4 h-2.5 rounded-full"
                  style={{ width: `${(step - 1) * 33.33}%` }}
                ></div>
              </div>
              <p className="text-lg text-gray-600">
                Step {step} of 3 ({Math.round(((step - 1) / 3) * 100)}% complete)
              </p>
            </div>

            <Card className="border-0 shadow-2xl">
              <CardContent className="p-8">
                <form id="volunteer-form" onSubmit={handleSubmit}>
                  {/* Step 1: Personal Information */}
                  {step === 1 && (
                    <>
                      <h3 className="text-2xl font-bold text-ngo-color6 mb-6">Personal Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <Label>First Name *</Label>
                          <Input
                            value={formData.firstName}
                            onChange={(e) => {
                              // Only allow letters, spaces, hyphens, and apostrophes
                              const value = e.target.value.replace(/[^a-zA-Z\s\-']/g, '');
                              handleChange("firstName", value);
                            }}
                            className={errors.firstName ? "border-red-500" : ""}
                            placeholder="Enter your first name"
                            maxLength={50}
                          />
                          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                        </div>
                        <div>
                          <Label>Last Name *</Label>
                          <Input
                            value={formData.lastName}
                            onChange={(e) => {
                              // Only allow letters, spaces, hyphens, and apostrophes
                              const value = e.target.value.replace(/[^a-zA-Z\s\-']/g, '');
                              handleChange("lastName", value);
                            }}
                            className={errors.lastName ? "border-red-500" : ""}
                            placeholder="Enter your last name"
                            maxLength={50}
                          />
                          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                        </div>
                        <div>
                          <Label>Date of Birth *</Label>
                          <Input
                            type="date"
                            value={formData.dob}
                            onChange={(e) => handleChange("dob", e.target.value)}
                            className={errors.dob ? "border-red-500" : ""}
                            max={(() => {
                              const sixteenYearsAgo = new Date();
                              sixteenYearsAgo.setFullYear(sixteenYearsAgo.getFullYear() - 16);
                              return sixteenYearsAgo.toISOString().split('T')[0];
                            })()}
                            min={(() => {
                              const hundredYearsAgo = new Date();
                              hundredYearsAgo.setFullYear(hundredYearsAgo.getFullYear() - 100);
                              return hundredYearsAgo.toISOString().split('T')[0];
                            })()}
                          />
                          {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
                          <p className="text-gray-500 text-xs mt-1">Must be at least 16 years old to volunteer</p>
                        </div>
                        <div>
                          <Label>Gender *</Label>
                          <RadioGroup
                            value={formData.gender}
                            onValueChange={(value) => handleChange("gender", value)}
                            className={errors.gender ? "border-red-500" : ""}
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem className="custom-radio" value="Male" id="male" />
                              <Label htmlFor="male">Male</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem className="custom-radio" value="Female" id="female" />
                              <Label htmlFor="female">Female</Label>
                            </div>
                          </RadioGroup>
                          {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
                        </div>
                        <div>
                          <Label>Phone *</Label>
                          <Input
                            value={formData.phone}
                            maxLength={15}
                            onChange={(e) => {
                              // Allow numeric input with optional + at the beginning
                              const value = e.target.value.replace(/[^\d+]/g, '').replace(/(\+).*?(?=\+)/g, '$1');
                              handleChange("phone", value);
                            }}
                            className={errors.phone ? "border-red-500" : ""}
                            placeholder="Enter phone number with country code"
                            type="tel"
                          />
                          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                        </div>
                        <div>
                          <Label>Emergency Contact Number</Label>
                          <Input
                            value={formData.emergencyPhone}
                            onChange={(e) => {
                              // Only allow numeric input
                              const value = e.target.value.replace(/\D/g, '');
                              handleChange("emergencyPhone", value);
                            }}
                            className={errors.emergencyPhone ? "border-red-500" : ""}
                            placeholder="Enter 10 digit number (optional)"
                            maxLength={10}
                            type="tel"
                          />
                          {errors.emergencyPhone && <p className="text-red-500 text-sm">{errors.emergencyPhone}</p>}
                        </div>
                        <div>
                          <Label>Email *</Label>
                          <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            className={errors.email ? "border-red-500" : ""}
                          />
                          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>
                      </div>

                      <h4 className="text-lg font-semibold mb-4">Address *</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div>
                          <Label>City *</Label>
                          <Input
                            value={formData.address.city}
                            onChange={(e) => {
                              // Only allow letters, spaces, hyphens, apostrophes, periods, and commas
                              const value = e.target.value.replace(/[^a-zA-Z\s\-'.,]/g, '');
                              handleNestedChange("city", value);
                            }}
                            className={errors.city ? "border-red-500" : ""}
                            placeholder="Enter city name"
                            maxLength={100}
                          />
                          {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
                        </div>
                        <div>
                          <Label>State *</Label>
                          <Input
                            value={formData.address.state}
                            onChange={(e) => {
                              // Only allow letters, spaces, hyphens, apostrophes, periods, and commas
                              const value = e.target.value.replace(/[^a-zA-Z\s\-'.,]/g, '');
                              handleNestedChange("state", value);
                            }}
                            className={errors.state ? "border-red-500" : ""}
                            placeholder="Enter state name"
                            maxLength={100}
                          />
                          {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
                        </div>
                        <div>
                          <Label>Country *</Label>
                          <Input
                            value={formData.address.country}
                            onChange={(e) => {
                              // Only allow letters, spaces, hyphens, apostrophes, periods, and commas
                              const value = e.target.value.replace(/[^a-zA-Z\s\-'.,]/g, '');
                              handleNestedChange("country", value);
                            }}
                            className={errors.country ? "border-red-500" : ""}
                            placeholder="Enter country name"
                            maxLength={100}
                          />
                          {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
                        </div>
                      </div>

                      <h4 className="text-lg font-semibold mb-4">Language Proficiency *</h4>
                      {errors.languageProficiency && <p className="text-red-500 text-sm mb-4">{errors.languageProficiency}</p>}
                      {(Object.keys(formData.languageProficiency) as Array<keyof FormData["languageProficiency"]>)
                        .filter((lang) => lang !== "otherLanguage")
                        .map((lang) => (
                          <div key={lang} className="mb-6">
                            <Label className="capitalize text-base font-medium mb-3 block">{lang}</Label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                              {(Object.keys(formData.languageProficiency[lang]) as Array<keyof LanguageProficiency>).map((skill) => (
                                <div key={skill} className="flex items-center space-x-2">
                                  <Checkbox
                                    checked={formData.languageProficiency[lang][skill]}
                                    onCheckedChange={(checked) => handleLanguageChange(lang, skill, !!checked)}
                                    className="custom-checkbox"
                                  />
                                  <Label className="capitalize text-sm">{skill}</Label>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}

                      <div className="mb-6">
                        <Label>Other Language</Label>
                        <Input
                          value={formData.languageProficiency.otherLanguage}
                          onChange={(e) => {
                            // Only allow letters, spaces, hyphens, and apostrophes
                            const value = e.target.value.replace(/[^a-zA-Z\s\-']/g, '');
                            setFormData((prev) => ({
                              ...prev,
                              languageProficiency: {
                                ...prev.languageProficiency,
                                otherLanguage: value,
                              },
                            }));
                          }}
                          className={errors.otherLanguage ? "border-red-500" : ""}
                          placeholder="Enter other language (optional)"
                          maxLength={50}
                        />
                        {errors.otherLanguage && <p className="text-red-500 text-sm">{errors.otherLanguage}</p>}
                      </div>

                      <div className="mb-6">
                        <Label>Daily Commitment *</Label>
                        <Select
                          value={formData.dailyCommitment}
                          onValueChange={(value) => handleChange("dailyCommitment", value)}
                        >
                          <SelectTrigger className={`w-full ${errors.dailyCommitment ? "border-red-500" : ""}`}>
                            <SelectValue placeholder="Select hours" />
                          </SelectTrigger>
                          <SelectContent 
                            className="z-[100] max-h-[200px] overflow-y-auto"
                            position="popper"
                            sideOffset={4}
                          >
                            <SelectItem value="1-2 hours">1-2 hours</SelectItem>
                            <SelectItem value="2-3 hours">2-3 hours</SelectItem>
                            <SelectItem value="3-4 hours">3-4 hours</SelectItem>
                            <SelectItem value="4-5 hours">4-5 hours</SelectItem>
                            <SelectItem value="More than 5 hours">More than 5 hours</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.dailyCommitment && <p className="text-red-500 text-sm">{errors.dailyCommitment}</p>}
                      </div>

                      <div className="mb-6">
                        <Label>Availability *</Label>
                        <div className="space-y-3">
                          {["Early Morning (6:00 AM - 9:00 AM)", "Late Morning (9:00 AM - 12:00 PM)", "Afternoon (12:00 PM - 4:00 PM)", "Evening (4:00 PM - 8:00 PM)", "Late Evening (8:00 PM - 11:00 PM)"].map((time) => (
                            <div key={time} className="flex items-center space-x-2">
                              <Checkbox
                                checked={formData.availability.includes(time)}
                                onCheckedChange={() => handleArrayChange("availability", time)}
                                className="custom-checkbox"
                              />
                              <Label className="text-sm sm:text-base">{time}</Label>
                            </div>
                          ))}
                        </div>
                        {errors.availability && <p className="text-red-500 text-sm">{errors.availability}</p>}
                      </div>

                      <div className="mb-6">
                        <Label>Volunteer Field *</Label>
                        <Select
                          value={formData.volunteerField}
                          onValueChange={(value) => handleChange("volunteerField", value)}
                        >
                          <SelectTrigger className={`w-full ${errors.volunteerField ? "border-red-500" : ""}`}>
                            <SelectValue placeholder="Select field" />
                          </SelectTrigger>
                          <SelectContent 
                            className="z-[100] max-h-[200px] overflow-y-auto"
                            position="popper"
                            sideOffset={4}
                          >
                            <SelectItem value="Teaching">Teaching</SelectItem>
                            <SelectItem value="Social Media Management">Social Media Management</SelectItem>
                            <SelectItem value="Content Creation">Content Creation</SelectItem>
                            <SelectItem value="Outreach">Outreach</SelectItem>
                            <SelectItem value="Fundraising">Fundraising</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.volunteerField && <p className="text-red-500 text-sm">{errors.volunteerField}</p>}
                      </div>
                    </>
                  )}

                  {/* Step 2: Dynamic Fields Based on Volunteer Role */}
                  {step === 2 && (
                    <>
                      <h3 className="text-2xl font-bold text-ngo-color6 mb-6">
                        {formData.volunteerField === "Social Media Management" ? "Social Media Experience" :
                          formData.volunteerField === "Content Creation" ? "Content Creation Experience" :
                            formData.volunteerField === "Outreach" ? "Outreach Experience" :
                              formData.volunteerField === "Fundraising" ? "Fundraising Experience" :
                                formData.volunteerField === "Teaching" ? "Teaching Experience" :
                                  "Additional Information"}
                      </h3>

                      {/* Teaching */}
                      {formData.volunteerField === "Teaching" && (
                        <>
                          <div className="mb-6">
                            <Label>Do you have formal teaching experience? *</Label>
                            <RadioGroup
                              value={formData.teachingExperience || ""}
                              onValueChange={(value) => handleChange("teachingExperience", value)}
                              className={errors.teachingExperience ? "border-red-500" : ""}
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem className="custom-radio" value="Yes" id="teaching-yes" />
                                <Label htmlFor="teaching-yes">Yes</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem className="custom-radio" value="No" id="teaching-no" />
                                <Label htmlFor="teaching-no">No</Label>
                              </div>
                            </RadioGroup>
                            {errors.teachingExperience && <p className="text-red-500 text-sm">{errors.teachingExperience}</p>}
                          </div>

                          <div className="mb-6">
                            <Label>How many years of online teaching experience do you have? *</Label>
                            <Select
                              value={formData.onlineTeachingYears || ""}
                              onValueChange={(value) => handleChange("onlineTeachingYears", value)}
                            >
                              <SelectTrigger className={errors.onlineTeachingYears ? "border-red-500" : ""}>
                                <SelectValue placeholder="Select years" />
                              </SelectTrigger>
                              <SelectContent 
                                className="z-[100] max-h-[200px] overflow-y-auto"
                                position="popper"
                                sideOffset={4}
                              >
                                <SelectItem value="No Experience">No Experience</SelectItem>
                                <SelectItem value="Less than 1 year">Less than 1 year</SelectItem>
                                <SelectItem value="1-3 years">1-3 years</SelectItem>
                                <SelectItem value="4-6 years">4-6 years</SelectItem>
                                <SelectItem value="More than 6 years">More than 6 years</SelectItem>
                              </SelectContent>
                            </Select>
                            {errors.onlineTeachingYears && <p className="text-red-500 text-sm">{errors.onlineTeachingYears}</p>}
                          </div>

                          <div className="mb-6">
                            <Label>What age groups have you taught? *</Label>
                            {[
                              "Early Childhood (Preschool to Kindergarten)",
                              "Primary School (Grades 1-5)",
                              "Middle School (Grades 6-8)",
                              "High School (Grades 9-12)",
                              "College/University",
                              "Adult Learners",
                              "Fresher"
                            ].map((group) => (
                              <div key={group} className="flex items-center space-x-2">
                                <Checkbox
                                  checked={formData.ageGroups?.includes(group)}
                                  onCheckedChange={(checked) => {
                                    handleArrayChange(
                                      "ageGroups",
                                      checked ? group : ""
                                    );
                                  }}
                                  className="custom-checkbox"
                                />
                                <Label>{group}</Label>
                              </div>
                            ))}
                            {errors.ageGroups && <p className="text-red-500 text-sm">{errors.ageGroups}</p>}
                          </div>

                          <div className="mb-6">
                            <Label>What subjects are you most confident teaching? *</Label>
                            {["Mathematics", "Science", "English", "Computers", "Other"].map((subject) => (
                              <div key={subject} className="flex items-center space-x-2">
                                <Checkbox
                                  checked={formData.confidentSubjects?.includes(subject)}
                                  onCheckedChange={(checked) => {
                                    handleArrayChange(
                                      "confidentSubjects",
                                      checked ? subject : ""
                                    );
                                  }}
                                  className="custom-checkbox"
                                />
                                <Label>{subject}</Label>
                              </div>
                            ))}
                            {errors.confidentSubjects && <p className="text-red-500 text-sm">{errors.confidentSubjects}</p>}
                          </div>
                        </>
                      )}

                      {/* Social Media Management */}
                      {formData.volunteerField === "Social Media Management" && (
                        <>
                          {(["facebook", "linkedIn", "instagram", "twitter", "youTube"] as const).map((platform) => (
                            <div key={platform} className="mb-6">
                              <Label className="capitalize">{platform}</Label>
                              <Select
                                value={formData.socialMedia?.[platform] || ""}
                                onValueChange={(value) => handleSocialMediaChange(platform, value)}
                              >
                                <SelectTrigger className={errors[platform] ? "border-red-500" : ""}>
                                  <SelectValue placeholder="Select experience" />
                                </SelectTrigger>
                                <SelectContent 
                                  className="z-[100] max-h-[200px] overflow-y-auto"
                                  position="popper"
                                  sideOffset={4}
                                >
                                  <SelectItem value="Expert">Expert</SelectItem>
                                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                                  <SelectItem value="Beginner">Beginner</SelectItem>
                                  <SelectItem value="No Experience">No Experience</SelectItem>
                                </SelectContent>
                              </Select>
                              {errors[platform] && <p className="text-red-500 text-sm">{errors[platform]}</p>}
                            </div>
                          ))}
                        </>
                      )}

                      {/* Content Creation */}
                      {formData.volunteerField === "Content Creation" && (
                        <>
                          <div className="mb-6">
                            <Label>Do you have experience creating PowerPoint presentations, flyers, or social media posts?</Label>
                            <RadioGroup
                              value={formData.contentCreation?.hasExperience ? "Yes" : "No"}
                              onValueChange={(value) => handleContentCreationChange("hasExperience", value === "Yes")}
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem className="custom-radio" value="Yes" id="content-creation-yes" />
                                <Label htmlFor="content-creation-yes">Yes</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem className="custom-radio" value="No" id="content-creation-no" />
                                <Label htmlFor="content-creation-no">No</Label>
                              </div>
                            </RadioGroup>
                          </div>

                          <div className="mb-6">
                            <Label>Which of the following have you created before?</Label>
                            {["PowerPoint Presentations (PPT)", "Flyers (Printed or Digital)", "Social Media Posts (Instagram, Facebook, Twitter, etc.)", "Posters", "Brochures"].map((item) => (
                              <div key={item} className="flex items-center space-x-2">
                                <Checkbox
                                  checked={formData.contentCreation?.createdBefore?.includes(item)}
                                  onCheckedChange={(checked) => {
                                    const updated = formData.contentCreation?.createdBefore || [];
                                    handleContentCreationChange(
                                      "createdBefore",
                                      checked ? [...updated, item] : updated.filter((i) => i !== item)
                                    );
                                  }}
                                  className="custom-checkbox"
                                />
                                <Label>{item}</Label>
                              </div>
                            ))}
                          </div>

                          <div className="mb-6">
                            <Label>Which tools or software do you use for designing?</Label>
                            {["Microsoft PowerPoint", "Canva", "Adobe Photoshop", "Adobe Illustrator", "Google Slides", "Other"].map((tool) => (
                              <div key={tool} className="flex items-center space-x-2">
                                <Checkbox
                                  checked={formData.contentCreation?.toolsUsed?.includes(tool)}
                                  onCheckedChange={(checked) => {
                                    const updated = formData.contentCreation?.toolsUsed || [];
                                    handleContentCreationChange(
                                      "toolsUsed",
                                      checked ? [...updated, tool] : updated.filter((i) => i !== tool)
                                    );
                                  }}
                                  className="custom-checkbox"
                                />
                                <Label>{tool}</Label>
                              </div>
                            ))}
                          </div>
                        </>
                      )}

                      {/* Outreach */}
                      {formData.volunteerField === "Outreach" && (
                        <>
                          <div className="mb-6">
                            <Label>Have you been involved in any outreach activities before?</Label>
                            <RadioGroup
                              value={formData.outreach?.hasOutreachExperience ? "Yes" : "No"}
                              onValueChange={(value) => handleOutreachChange("hasOutreachExperience", value === "Yes")}
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem className="custom-radio" value="Yes" id="outreach-yes" />
                                <Label htmlFor="outreach-yes">Yes</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem className="custom-radio" value="No" id="outreach-no" />
                                <Label htmlFor="outreach-no">No</Label>
                              </div>
                            </RadioGroup>
                          </div>

                          <div className="mb-6">
                            <Label>What type of outreach activities would you like to help with?</Label>
                            {[
                              "Community Outreach", "Educational Outreach", "Social Media Outreach",
                              "Fundraising Campaigns", "Corporate Partnerships", "Volunteer Recruitment",
                              "Event Promotion", "Advocacy Campaigns", "Other"
                            ].map((activity) => (
                              <div key={activity} className="flex items-center space-x-2">
                                <Checkbox
                                  checked={formData.outreach?.outreachActivities?.includes(activity)}
                                  onCheckedChange={(checked) => {
                                    const updated = formData.outreach?.outreachActivities || [];
                                    handleOutreachChange(
                                      "outreachActivities",
                                      checked ? [...updated, activity] : updated.filter((i) => i !== activity)
                                    );
                                  }}
                                  className="custom-checkbox"
                                />
                                <Label>{activity}</Label>
                              </div>
                            ))}
                          </div>
                        </>
                      )}

                      {/* Fundraising */}
                      {formData.volunteerField === "Fundraising" && (
                        <>
                          <div className="mb-6">
                            <Label>Have you been involved in fundraising before?</Label>
                            <RadioGroup
                              value={formData.fundraising?.hasFundraisingExperience ? "Yes" : "No"}
                              onValueChange={(value) => handleFundraisingChange("hasFundraisingExperience", value === "Yes")}
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem className="custom-radio" value="Yes" id="fundraising-yes" />
                                <Label htmlFor="fundraising-yes">Yes</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem className="custom-radio" value="No" id="fundraising-no" />
                                <Label htmlFor="fundraising-no">No</Label>
                              </div>
                            </RadioGroup>
                          </div>

                          <div className="mb-6">
                            <Label>Which types of fundraising have you done?</Label>
                            {[
                              "Event organization", "Corporate sponsorship", "Individual donor outreach",
                              "Crowdfunding", "Grant writing", "Online fundraising", "Charity auctions", "None"
                            ].map((type) => (
                              <div key={type} className="flex items-center space-x-2">
                                <Checkbox
                                  checked={formData.fundraising?.fundraisingTypes?.includes(type)}
                                  onCheckedChange={(checked) => {
                                    const updated = formData.fundraising?.fundraisingTypes || [];
                                    handleFundraisingChange(
                                      "fundraisingTypes",
                                      checked ? [...updated, type] : updated.filter((i) => i !== type)
                                    );
                                  }}
                                  className="custom-checkbox"
                                />
                                <Label>{type}</Label>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </>
                  )}


                  {/* Step 3: Experience & Motivation */}
                  {step === 3 && (
                    <>
                      <h3 className="text-2xl font-bold text-ngo-color6 mb-6">Experience & Motivation</h3>
                      <div className="mb-6">
                        <Label>Relevant Experience *</Label>
                        <Textarea
                          value={formData.relevantExperience}
                          onChange={(e) => handleChange("relevantExperience", e.target.value)}
                          className={errors.relevantExperience ? "border-red-500" : ""}
                        />
                        {errors.relevantExperience && <p className="text-red-500 text-sm">{errors.relevantExperience}</p>}
                      </div>

                      <div className="mb-6">
                        <Label>Why do you want to volunteer with NEIEA? *</Label>
                        <Textarea
                          value={formData.motivation}
                          onChange={(e) => handleChange("motivation", e.target.value)}
                          className={errors.motivation ? "border-red-500" : ""}
                        />
                        {errors.motivation && <p className="text-red-500 text-sm">{errors.motivation}</p>}
                      </div>

                      <div className="mb-6">
                        <Label>Commitment Duration *</Label>
                        <RadioGroup
                          value={formData.commitmentDuration}
                          onValueChange={(value) => handleChange("commitmentDuration", value)}
                          className={errors.commitmentDuration ? "border-red-500" : ""}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem className="custom-radio" value="3 months" id="3-months" />
                            <Label htmlFor="3-months">At least 3 months</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem className="custom-radio" value="6 months" id="6-months" />
                            <Label htmlFor="6-months">At least 6 months</Label>
                          </div>
                        </RadioGroup>
                        {errors.commitmentDuration && <p className="text-red-500 text-sm">{errors.commitmentDuration}</p>}
                      </div>

                      <div className="mb-6">
                        <Label>Date of Joining *</Label>
                        <Input
                          type="date"
                          value={formData.dateOfJoining}
                          onChange={(e) => handleChange("dateOfJoining", e.target.value)}
                          className={errors.dateOfJoining ? "border-red-500" : ""}
                          min={(() => {
                            const sixMonthsAgo = new Date();
                            sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
                            return sixMonthsAgo.toISOString().split('T')[0];
                          })()}
                          max={(() => {
                            const twoYearsFromNow = new Date();
                            twoYearsFromNow.setFullYear(twoYearsFromNow.getFullYear() + 2);
                            return twoYearsFromNow.toISOString().split('T')[0];
                          })()}
                        />
                        {errors.dateOfJoining && <p className="text-red-500 text-sm">{errors.dateOfJoining}</p>}
                        {/* <p className="text-gray-500 text-xs mt-1">Select a date within 6 months ago to 2 years from now</p> */}
                      </div>
                    </>
                  )}

                  <div className="flex justify-between mt-8">
                    {step > 1 && (
                      <Button type="button" onClick={handleBack} variant="outline">
                        Back
                      </Button>
                    )}
                    {step < 3 ? (
                      <Button type="button" onClick={handleNext}>
                        Next
                      </Button>
                    ) : (
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit"}
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      </PageTemplate>
    </Layout>
  );
};

export default VolunteerForm;