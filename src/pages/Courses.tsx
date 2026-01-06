import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BookOpen, Clock, Users, ArrowRight, GraduationCap, IndianRupee, Check } from 'lucide-react';
import Layout from '../components/Layout';
import axiosInstance from "@/lib/axiosInstance";
import './Courses.css';

interface Course {
    _id: string;
    id: number;
    title: string;
    duration: string;
    level: string;
    description: string;
    targetAudience: string[];
    imageUrl: string;
    fees: number;
    whatsappLink: string;
    timeSlots: string[];
    isNew?: boolean;
    category: string;
}

interface ApplicationFormData {
    applicantType: 'individual' | 'institution';
    fullName?: string;
    email?: string;
    phone?: string;
    age?: number;
    education?: string;
    organizationName?: string;
    contactPerson?: string;
    organizationEmail?: string;
    organizationPhone?: string;
    organizationType?: string;
    numberOfStudents?: number;
    selectedCourses: string[];
    additionalInfo?: string;
}

const Courses: React.FC = () => {
    const { category: urlCategory } = useParams<{ category?: string }>();
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [userType, setUserType] = useState<'individual' | 'institution'>('individual');
    const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
    const [showApplicationModal, setShowApplicationModal] = useState(false);
    const [showApplyNowModal, setShowApplyNowModal] = useState(false);
    const [applicationForm, setApplicationForm] = useState<ApplicationFormData>({
        applicantType: 'individual',
        selectedCourses: [],
        additionalInfo: ''
    });
    const [courses, setCourses] = useState<Course[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch courses from API
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setIsLoading(true);
                const response = await axiosInstance.get("/course/getAllCourses");
                const coursesWithDummyImages = response.data.map((course: Course) => ({
                    ...course,
                    imageUrl: course.imageUrl || "https://img.freepik.com/free-photo/learning-education-ideas-insight-intelligence-study-concept_53876-120116.jpg?semt=ais_hybrid&w=740",
                    level: course.level || "Beginner",
                    targetAudience: course.targetAudience || ["General"],
                    fees: course.fees || 0,
                    category: course.category || "general",
                }));
                setCourses(coursesWithDummyImages);
            } catch (error) {
                console.error("Failed to fetch courses", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCourses();
    }, []);

    // Set active category based on URL parameter
    useEffect(() => {
        if (urlCategory) {
            setActiveCategory(urlCategory);
        } else {
            setActiveCategory('all');
        }
    }, [urlCategory]);

    // Filter courses based on active category and search query
    const filteredCourses = useMemo(() => {
        let filtered = courses.filter(course => course.title && course.title.trim() !== '');
        
        // First filter by category
        if (activeCategory !== 'all') {
            filtered = filtered.filter(course => course.category === activeCategory);
        }
        
        // Then filter by search query within the current category
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase().trim();
            filtered = filtered.filter(course => 
                course.title.toLowerCase().includes(query) ||
                course.description.toLowerCase().includes(query) ||
                course.level.toLowerCase().includes(query) ||
                course.targetAudience.some(audience => 
                    audience.toLowerCase().includes(query)
                )
            );
        }
        
        return filtered;
    }, [activeCategory, courses, searchQuery]);


    const clearSearch = () => {
        setSearchQuery('');
    };

    const handleUserTypeChange = (type: 'individual' | 'institution') => {
        setUserType(type);
        // Clear selected courses when switching user type
        setSelectedCourses([]);
    };

    const handleCourseSelection = (courseId: string) => {
        if (userType === 'individual') {
            // For individual, redirect directly to apply page
            navigate(`/apply-course/${courseId}`);
        } else {
            // For institution, toggle course selection
            setSelectedCourses(prev => {
                if (prev.includes(courseId)) {
                    return prev.filter(id => id !== courseId);
                } else {
                    return [...prev, courseId];
                }
            });
        }
    };

    const handleApplyNow = () => {
        if (selectedCourses.length === 0) {
            alert('Please select at least one course');
            return;
        }
        setShowApplyNowModal(true);
    };

    const handleProceedToApplication = () => {
        setShowApplyNowModal(false);
        // Navigate to institution application page with selected courses
        navigate('/apply-course-institution', { 
            state: { 
                selectedCourses: selectedCourses,
                category: activeCategory 
            } 
        });
    };

    const handleClearAllCourses = () => {
        if (confirm(`Are you sure you want to clear all ${selectedCourses.length} selected courses?`)) {
            setSelectedCourses([]);
        }
    };


    const handleFormChange = (field: keyof ApplicationFormData, value: any) => {
        setApplicationForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmitApplication = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Application submitted:', applicationForm);
        setShowApplicationModal(false);
        setApplicationForm({
            applicantType: 'individual',
            selectedCourses: [],
            additionalInfo: ''
        });
    };

    const getCategoryName = (slug: string) => {
        // Replace with your actual category mapping logic
        const categoryMap: Record<string, string> = {
            "general": "General",
            "technical": "Technical",
            "vocational": "Vocational",
            // Add more categories as needed
        };
        return categoryMap[slug] || slug;
    };

    return (
        <Layout>
            <div className="courses-page">
                {/* Hero Section */}
                <div className="courses-hero">
                    <div className="courses-hero-content">
                        <h1>Available Courses for Enrollments</h1>
                        <p>
                            Explore all educational courses as well as skill-based, vocational, and technical courses currently open for enrollment.
                        </p>
                    </div>
                </div>

                {/* Main Content */}
                <div className="courses-main-content">
                    {/* User Type Selection */}
                    <div className="user-type-selector">
                        <div className="user-type-container">
                            <button
                                onClick={() => handleUserTypeChange('individual')}
                                className={`user-type-button ${userType === 'individual' ? 'active' : ''}`}
                            >
                                Individual Learner
                            </button>
                            <button
                                onClick={() => handleUserTypeChange('institution')}
                                className={`user-type-button ${userType === 'institution' ? 'active' : ''}`}
                            >
                                Institution
                            </button>
                        </div>
                    </div>

                    {/* Search Bar */}
                    {/* <div className="search-container">
                        <div className="search-wrapper">
                            <input
                                type="text"
                                placeholder="Search courses..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="search-input"
                            />
                            {searchQuery ? (
                                <button
                                    onClick={clearSearch}
                                    className="clear-search"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            ) : (
                                <Search className="search-icon" />
                            )}
                        </div>
                        {searchQuery && (
                            <div className="mt-2 text-sm text-gray-600 text-center">
                                Searching for "{searchQuery}" in {activeCategory === 'all' ? 'all courses' : getCategoryName(activeCategory)}
                            </div>
                        )}
                    </div> */}

                    {/* Category Tabs */}
                    {/* <div className="category-tabs">
                        <button
                            onClick={() => handleCategoryChange('all')}
                            className={`category-tab ${activeCategory === 'all' ? 'active' : ''}`}
                        >
                            All Courses
                        </button>
                        <button
                            onClick={() => handleCategoryChange('general')}
                            className={`category-tab ${activeCategory === 'general' ? 'active' : ''}`}
                        >
                            General
                        </button>
                        <button
                            onClick={() => handleCategoryChange('technical')}
                            className={`category-tab ${activeCategory === 'technical' ? 'active' : ''}`}
                        >
                            Technical
                        </button>
                        <button
                            onClick={() => handleCategoryChange('vocational')}
                            className={`category-tab ${activeCategory === 'vocational' ? 'active' : ''}`}
                        >
                            Vocational
                        </button>
                    </div> */}

                    {/* Institution Instructions */}
                    {userType === 'institution' && (
                        <div className="institution-instructions">
                            <p>
                                Click on any course card to select multiple courses from the {activeCategory === 'all' ? 'available' : getCategoryName(activeCategory)} category below
                            </p>
                        </div>
                    )}

                    {/* Selected Courses Summary */}
                    {userType === 'institution' && selectedCourses.length > 0 && (
                        <div className="selected-courses-summary">
                            <div className="summary-header">
                                <span className="summary-title">
                                    {selectedCourses.length} course{selectedCourses.length !== 1 ? 's' : ''} selected
                                </span>
                                <button
                                    onClick={handleClearAllCourses}
                                    className="clear-all-button"
                                >
                                    Clear All
                                </button>
                            </div>
                            <div className="selected-courses-list">
                                {selectedCourses.map(courseId => {
                                    const course = courses.find(c => c._id === courseId);
                                    return course ? (
                                        <span key={courseId} className="selected-course-tag">
                                            {course.title}
                                        </span>
                                    ) : null;
                                })}
                            </div>
                            <button
                                onClick={handleApplyNow}
                                className="proceed-button"
                            >
                                Proceed to Application
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    )}
            </div>

                    {/* Courses Grid */}
                    {isLoading ? (
                        <div className="loading-container">
                            <div className="loading-spinner"></div>
                        </div>
                    ) : filteredCourses.length === 0 ? (
                        <div className="empty-state">
                            <BookOpen className="empty-state-icon" />
                            <h3>
                                {searchQuery ? 'No courses found' : 'No courses available'}
                            </h3>
                            <p>
                                {searchQuery 
                                    ? `No courses match "${searchQuery}" in ${activeCategory === 'all' ? 'all courses' : getCategoryName(activeCategory)}.`
                                    : 'Courses for this category are coming soon.'
                                }
                            </p>
                            {searchQuery && (
                                <button
                                    onClick={clearSearch}
                                    className="apply-button"
                                >
                                    Clear Search
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="courses-grid">
                            {filteredCourses.map((course) => (
                                <div 
                                    key={course._id} 
                                    className={`course-card ${userType === 'institution' && selectedCourses.includes(course._id) ? 'selected' : ''}`}
                                    onClick={() => userType === 'institution' && handleCourseSelection(course._id)}
                                >
                                    {/* Course Image */}
                                    <div className="relative">
                                        {course.imageUrl ? (
                                            <img
                                                src={course.imageUrl}
                                                alt={course.title}
                                                className="course-image"
                                            />
                                        ) : (
                                            <div className="course-image bg-gradient-to-br from-[#06038F] to-[#3B82F6] flex items-center justify-center">
                                                <BookOpen className="h-16 w-16 text-white opacity-80" />
                                            </div>
                                        )}
                                        {course.fees === 0 && (
                                            <div className="absolute top-4 right-4">
                                                <span className="free-badge">
                                                    Free
                                                </span>
                                            </div>
                                        )}
                                        {userType === 'institution' && selectedCourses.includes(course._id) && (
                                            <div className="selection-indicator">
                                                <Check className="w-4 h-4" />
                                            </div>
                                        )}
                                    </div>
                                    
                                    {/* NEW COURSE Badge - positioned relative to entire card */}
                                    {course.isNew && (
                                        <span className="new-course-badge">
                                            • NEW COURSE
                                        </span>
                                    )}
                                    
                                    {/* Course Content */}
                                    <div className="course-content">
                                        {/* Course Title */}
                                        <p className="course-title">
                                            {course.title}
                                        </p>
                                        
                                        {/* Course Description */}
                                        <p className="course-description">
                                            {course.description}
                                        </p>
                                        
                                        {/* Course Details Section */}
                                        <div className="course-details-section-courses">
                                            <div className="course-detail-item">
                                                <Clock className="course-detail-icon" />
                                                <span className="course-detail-label">Duration:</span>
                                                <span className="course-detail-value">{course.duration}</span>
                                            </div>
                                            <div className="course-detail-item">
                                                <GraduationCap className="course-detail-icon" />
                                                <span className="course-detail-label">Level:</span>
                                                <span className="course-detail-value">{course.level}</span>
                                            </div>
                                            <div className="course-detail-item">
                                                <Users className="course-detail-icon" />
                                                <span className="course-detail-label">Target:</span>
                                                <span className="course-detail-value">
                                                    {course.targetAudience[0] ? 
                                                        course.targetAudience[0].length > 50 ? 
                                                            course.targetAudience[0].substring(0, 50) + '...' : 
                                                            course.targetAudience[0]
                                                        : 'All learners'
                                                    }
                                                </span>
                                            </div>
                                            <div className="course-detail-item">
                                                <IndianRupee className="course-detail-icon" />
                                                <span className="course-detail-label">Fees:</span>
                                                <span className="course-detail-value">₹{course.fees}</span>
                                            </div>
                                        </div>
                                        
                                        {/* Apply Button */}
                                        <div className="course-apply-section">
                                            {userType === 'individual' ? (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleCourseSelection(course._id);
                                                    }}
                                                    className="apply-now-button"
                                                >
                                                    Apply Now
                                                    <ArrowRight className="w-4 h-4" />
                                                </button>
                                            ) : (
                                                <div className={`apply-now-button ${selectedCourses.includes(course._id) ? 'selected' : 'unselected'}`}>
                                                    {selectedCourses.includes(course._id) ? (
                                                        <>
                                                            <Check className="w-4 h-4" />
                                                            Selected
                                                        </>
                                                    ) : (
                                                        'Click to Select'
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    
                    {/* Selected Courses Summary Bar */}
                    {userType === 'institution' && selectedCourses.length > 0 && (
                        <div className="selected-courses-summary-bar">
                            <div className="summary-content">
                                <div className="summary-left">
                                    <span className="summary-count">
                                        {selectedCourses.length} course{selectedCourses.length !== 1 ? 's' : ''} selected
                                    </span>
                                    <button
                                        onClick={handleClearAllCourses}
                                        className="clear-all-link"
                                    >
                                        Clear All
                                    </button>
                                </div>
                                <button
                                    onClick={handleApplyNow}
                                    className="summary-apply-button"
                                >
                                    Apply Now
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>

            {/* Apply Now Modal for Institution */}
            {showApplyNowModal && (
                <div 
                    className="modal-overlay"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            setShowApplyNowModal(false);
                        }
                    }}
                >
                    <div className="modal-container">
                        <div className="modal-header">
                            <h2 className="modal-title">Selected Courses ({selectedCourses.length})</h2>
                            <div className="modal-header-actions">
                                <button
                                    onClick={handleClearAllCourses}
                                    className="clear-all-button"
                                >
                                    Clear All
                                </button>
                                <button
                                    onClick={() => setShowApplyNowModal(false)}
                                    className="close-button"
                                >
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        
                        <div className="modal-content">
                            <div className="selected-courses-list">
                                {selectedCourses.map(courseId => {
                                    const course = courses.find(c => c._id === courseId);
                                    return course ? (
                                        <div key={courseId} className="course-item">
                                            <div className="course-item-content">
                                                <h4 className="course-item-title">{course.title}</h4>
                                                <div className="course-item-details">
                                                    <span className="course-detail">
                                                        <Clock className="h-4 w-4" />
                                                        {course.duration}
                                                    </span>
                                                    <span className="course-detail">
                                                        <IndianRupee className="h-4 w-4" />
                                                        ₹{course.fees}
                                                    </span>
                                                    <span className="course-detail">
                                                        <GraduationCap className="h-4 w-4" />
                                                        {course.level}
                                                    </span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => setSelectedCourses(prev => prev.filter(id => id !== courseId))}
                                                className="remove-button"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ) : null;
                                })}
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button
                                type="button"
                                onClick={() => setShowApplyNowModal(false)}
                                className="cancel-button"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleProceedToApplication}
                                className="proceed-button"
                            >
                                Proceed to Application
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Application Modal (unchanged) */}
            {showApplicationModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">Apply for Course</h2>
                                <button
                                    onClick={() => setShowApplicationModal(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <form onSubmit={handleSubmitApplication} className="space-y-6">
                                {/* Applicant Type Selection */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                        I am applying as:
                                    </label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            type="button"
                                            onClick={() => handleFormChange('applicantType', 'individual')}
                                            className={`p-4 rounded-lg border-2 transition-all ${applicationForm.applicantType === 'individual'
                                                ? 'border-[#994263] bg-[#994263] bg-opacity-10'
                                                : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                        >
                                            <Users className="h-8 w-8 mx-auto mb-2 text-[#994263]" />
                                            <div className="font-medium">Individual</div>
                                            <div className="text-sm text-gray-600">Student, learner, or individual</div>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleFormChange('applicantType', 'institution')}
                                            className={`p-4 rounded-lg border-2 transition-all ${applicationForm.applicantType === 'institution'
                                                ? 'border-[#994263] bg-[#994263] bg-opacity-10'
                                                : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                        >
                                            <GraduationCap className="h-8 w-8 mx-auto mb-2 text-[#994263]" />
                                            <div className="font-medium">Institution</div>
                                            <div className="text-sm text-gray-600">School, NGO, or organization</div>
                                        </button>
                                    </div>
                                </div>
                                {/* Individual Form Fields */}
                                {applicationForm.applicantType === 'individual' && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={applicationForm.fullName || ''}
                                                onChange={(e) => handleFormChange('fullName', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#994263] focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Email *
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                value={applicationForm.email || ''}
                                                onChange={(e) => handleFormChange('email', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#994263] focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Phone Number *
                                            </label>
                                            <input
                                                type="tel"
                                                required
                                                value={applicationForm.phone || ''}
                                                onChange={(e) => handleFormChange('phone', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#994263] focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Age
                                            </label>
                                            <input
                                                type="number"
                                                value={applicationForm.age || ''}
                                                onChange={(e) => handleFormChange('age', parseInt(e.target.value))}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#994263] focus:border-transparent"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Education Level
                                            </label>
                                            <select
                                                value={applicationForm.education || ''}
                                                onChange={(e) => handleFormChange('education', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#994263] focus:border-transparent"
                                            >
                                                <option value="">Select education level</option>
                                                <option value="primary">Primary (1-5)</option>
                                                <option value="middle">Middle (6-8)</option>
                                                <option value="secondary">Secondary (9-10)</option>
                                                <option value="higher-secondary">Higher Secondary (11-12)</option>
                                                <option value="graduate">Graduate</option>
                                                <option value="post-graduate">Post Graduate</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                    </div>
                                )}
                                {/* Institution Form Fields */}
                                {applicationForm.applicantType === 'institution' && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Organization Name *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={applicationForm.organizationName || ''}
                                                onChange={(e) => handleFormChange('organizationName', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#994263] focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Contact Person *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={applicationForm.contactPerson || ''}
                                                onChange={(e) => handleFormChange('contactPerson', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#994263] focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Organization Email *
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                value={applicationForm.organizationEmail || ''}
                                                onChange={(e) => handleFormChange('organizationEmail', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#994263] focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Organization Phone *
                                            </label>
                                            <input
                                                type="tel"
                                                required
                                                value={applicationForm.organizationPhone || ''}
                                                onChange={(e) => handleFormChange('organizationPhone', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#994263] focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Organization Type *
                                            </label>
                                            <select
                                                required
                                                value={applicationForm.organizationType || ''}
                                                onChange={(e) => handleFormChange('organizationType', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#994263] focus:border-transparent"
                                            >
                                                <option value="">Select organization type</option>
                                                <option value="school">School</option>
                                                <option value="ngo">NGO</option>
                                                <option value="madrasa">Madrasa</option>
                                                <option value="community-center">Community Learning Center</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Number of Students
                                            </label>
                                            <input
                                                type="number"
                                                value={applicationForm.numberOfStudents || ''}
                                                onChange={(e) => handleFormChange('numberOfStudents', parseInt(e.target.value))}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#994263] focus:border-transparent"
                                            />
                                        </div>
                                    </div>
                                )}
                                {/* Additional Information */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Additional Information
                                    </label>
                                    <textarea
                                        rows={4}
                                        value={applicationForm.additionalInfo || ''}
                                        onChange={(e) => handleFormChange('additionalInfo', e.target.value)}
                                        placeholder="Any additional information you'd like to share..."
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#994263] focus:border-transparent"
                                    />
                                </div>
                                {/* Submit Button */}
                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowApplicationModal(false)}
                                        className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-6 py-3 bg-[#994263] text-white rounded-lg hover:bg-[#7a3450] transition-colors"
                                    >
                                        Submit Application
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default Courses;
