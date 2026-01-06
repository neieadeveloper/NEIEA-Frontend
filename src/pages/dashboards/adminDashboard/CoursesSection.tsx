import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableHead,
  TableHeader,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  MoreHorizontal,
  MessageCircle,
  Clock,
  Users,
  DollarSign,
  Target,
  GraduationCap,
  ExternalLink,
  Sparkles,
  User,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Clock as ClockIcon,
  BookOpen,
  Languages,
  GraduationCap as StudentIcon
} from "lucide-react";
import { toast } from "sonner";
import { SectionLoader } from "@/components/LoadingSpinner";
// import CourseCard from "@/components/CourseCard";
import CourseCardNew from "@/components/CourseCardNew";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { FaRupeeSign } from "react-icons/fa";

const CoursesSection = ({ searchQuery = "" }) => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [viewStudents, setViewStudents] = useState(false);
  const [viewCourseCard, setViewCourseCard] = useState(false);
  const initialFormData = {
    title: "",
    description: "",
    duration: "",
    level: "beginner",
    fees: 0,
    targetAudience: "",
    whatsappLink: "",
    image: null,
  };
  const [formData, setFormData] = useState(initialFormData);
  const [previewImage, setPreviewImage] = useState("");
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); // Number of items per page
  const navigate = useNavigate();

  const fetchCourses = async () => {
    try {
      const response = await axiosInstance.get("/admin/courses");
      setCourses(response.data);
      setFilteredCourses(response.data);
    } catch (error) {
      toast.error("Failed to load courses");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = courses.filter(
        (course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCourses(filtered);
    } else {
      setFilteredCourses(courses);
    }
    setCurrentPage(1); // Reset to the first page whenever the search query changes
  }, [searchQuery, courses]);

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(
        `/admin/courses/delete/${selectedCourse._id}`
      );
      const updated = courses.filter((c) => c._id !== selectedCourse._id);
      setCourses(updated);
      setFilteredCourses(updated);
      toast.success("Course deleted successfully");
    } catch (error) {
      toast.error("Failed to delete course");
      console.error("Delete error:", error);
    } finally {
      setSelectedCourse(null);
      setIsDeleting(false);
    }
  };

  const openEdit = (course) => {
    setSelectedCourse(course);
    setIsEditing(true);
    setFormData({
      title: course.title || "",
      description: course.description || "",
      duration: course.duration || "",
      level: course.level || "beginner",
      fees: Number(course.fees) || 0,
      targetAudience: (course.targetAudience || []).join(", "),
      whatsappLink: course.whatsappLink || "",
      image: null,
    });
    setPreviewImage(course.imageUrl || "");
    setEditError("");
  };

  const handleEdit = async () => {
    setEditLoading(true);
    setEditError("");
    try {
      let response;
      if (formData.image) {
        // If a new image is uploaded, use multipart/form-data
        const data = new FormData();
        data.append("title", formData.title);
        data.append("description", formData.description);
        data.append("duration", formData.duration);
        data.append("level", formData.level);
        data.append("fees", String(formData.fees));
        data.append("targetAudience", formData.targetAudience);
        data.append("whatsappLink", formData.whatsappLink);
        data.append("image", formData.image);
        response = await axiosInstance.put(
          `/admin/courses/edit/${selectedCourse._id}`,
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        // No new image, send as JSON
        response = await axiosInstance.put(
          `/admin/courses/edit/${selectedCourse._id}`,
          {
            title: formData.title,
            description: formData.description,
            duration: formData.duration,
            level: formData.level,
            fees: formData.fees,
            targetAudience: formData.targetAudience,
            whatsappLink: formData.whatsappLink,
          }
        );
      }
      const updated = courses.map((course) =>
        course._id === selectedCourse._id ? response.data.data : course
      );
      setCourses(updated);
      setFilteredCourses(updated);
      toast.success("Course updated successfully");
      setIsEditing(false);
      setSelectedCourse(null);
    } catch (error) {
      setEditError(
        error?.response?.data?.message || "Failed to update course. Please check all fields."
      );
    } finally {
      setEditLoading(false);
    }
  };

  const handleDownloadExcel = () => {
    const data = filteredCourses.map((course) => ({
      Title: course.title,
      Description: course.description,
      Duration: course.duration,
      Instructor: course.instructor || "",
      Level: course.level,
      Fees: course.fees,
      TargetAudience: Array.isArray(course.targetAudience) ? course.targetAudience.join(", ") : course.targetAudience,
      WhatsAppLink: course.whatsappLink,
      IsNew: course.isNew ? "Yes" : "No",
      Students: course.applicants?.length || 0,
    }));
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Courses Report");
    XLSX.writeFile(workbook, "courses_report.xlsx");
  };

  const handleDownloadStudentsExcel = () => {
    if (!selectedCourse || !selectedCourse.applicants) return;
    const data = selectedCourse.applicants.map((applicant) => ({
      "Full Name": applicant.fullName || "",
      Email: applicant.email || "",
      Phone: applicant.phone || "",
      Age: applicant.age || "",
      Gender: applicant.gender || "",
      "Is Student": applicant.isStudent ? "Yes" : "No",
      "Class Studying": applicant.isStudent ? (applicant.classStudying || "") : "",
      "Mother Tongue": applicant.motherTongue || "",
      State: applicant.state || "",
      City: applicant.city || "",
      "WhatsApp Number": applicant.whatsappNumber || "",
      "Referred By": applicant.referredBy || "",
      "Convenient Time Slot": applicant.convenientTimeSlot || "",
      Message: applicant.message || "",
      "Applied On": applicant.appliedAt ? new Date(applicant.appliedAt).toLocaleDateString() : "",
    }));
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
    const courseName = (selectedCourse.title || "course").replace(/\s+/g, "_");
    XLSX.writeFile(workbook, `${courseName}_students.xlsx`);
  };

  // Pagination logic
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const totalPages = Math.ceil(filteredCourses.length / pageSize);

  const getLevelColor = (level) => {
    switch (level?.toLowerCase()) {
      case "beginner":
        return "bg-green-100 text-green-800 border-green-200";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "advanced":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="p-8 bg-white min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-3xl font-bold text-ngo-color1">Courses Management</h3>
          {
            filteredCourses.length !== 0 && (

              <Button
                onClick={handleDownloadExcel}
                className="bg-ngo-color2 hover:bg-ngo-color6 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              >
                Download
              </Button>
            )
          }
        </div>
        <p className="text-gray-600 text-lg">
          Manage all available courses in the system
        </p>
      </div>

      {/* Content Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {loading ? (
          <div className="p-8">
            <SectionLoader />
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No courses found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 w-20">Image</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Course Details</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 hidden lg:table-cell">Level & Fees</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 hidden md:table-cell">Target Audience</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 hidden xl:table-cell">WhatsApp Group Link</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Students</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedCourses.map((course) => (
                  <tr key={course._id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-8">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                          {course.imageUrl ? (
                            <img
                              src={course.imageUrl}
                              alt={course.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <GraduationCap className="w-6 h-6 text-gray-400" />
                          )}
                        </div>
                        {course.isNew && (
                          <div className="absolute -top-1 -right-1">
                            <span className="bg-green-100 text-green-800 border border-green-200 text-xs px-1.5 py-0.5 rounded-full flex items-center gap-1">
                              <Sparkles className="w-3 h-3" />
                              New
                            </span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <span className="font-semibold text-sm text-gray-900 line-clamp-1">
                            {course.title}
                          </span>
                        </div>
                        <span className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                          {course.description}
                        </span>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{course.duration}</span>
                          </div>
                          {course.instructor && (
                            <div className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              <span>{course.instructor}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="hidden lg:table-cell">
                      <div className="space-y-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}>
                          {course.level?.charAt(0).toUpperCase() + course.level?.slice(1)}
                        </span>
                        <div className="flex items-center gap-1 text-sm text-gray-700">
                          <FaRupeeSign className="w-4 h-4" />
                          <span className="font-medium">{course.fees || 0}</span>
                        </div>
                      </div>
                    </td>
                    <td className="hidden md:table-cell">
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <Target className="w-3 h-3" />
                        <span className="line-clamp-2">
                          {Array.isArray(course.targetAudience)
                            ? course.targetAudience.join(", ")
                            : course.targetAudience || "Not specified"
                          }
                        </span>
                      </div>
                    </td>
                    <td className="hidden xl:table-cell">
                      {course.whatsappLink && (
                        <a
                          href={course.whatsappLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs text-green-600 hover:text-green-700 transition-colors"
                        >
                          <MessageCircle className="w-3 h-3" />
                          <span>WhatsApp</span>
                          <ExternalLink className="w-2 h-2" />
                        </a>
                      )}
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                          {course.applicants?.length || 0}
                        </span>
                        {course.applicants?.length > 0 && (
                          <button
                            className="text-xs text-blue-600 hover:text-blue-700 hover:underline"
                            onClick={() => {
                              setSelectedCourse(course);
                              setViewStudents(true);
                            }}
                          >
                            View
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 hover:bg-gray-100 rounded-full flex items-center justify-center border border-gray-200"
                            >
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4 text-gray-600" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48 bg-white shadow-lg border border-gray-200 rounded-md">
                            <DropdownMenuItem
                              onClick={() => navigate(`/admin/dashboard/course/edit/${course._id}`)}
                              className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-100 text-black"
                            >
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedCourse(course);
                                setIsDeleting(true);
                              }}
                              className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-100 text-red-600 focus:text-red-600"
                            >
                              Delete
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedCourse(course);
                                setViewCourseCard(true);
                              }}
                              className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-100 text-black"
                            >
                              View Details
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination Controls */}
            <div className="flex text-black justify-end items-center mt-4 gap-2">
              <Button
                variant="outline"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              >
                Previous
              </Button>
              <span>
                Page <strong>{currentPage}</strong> of{" "}
                <strong>{totalPages}</strong>
              </span>
              <Button
                variant="outline"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {/* Pagination Info */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between text-sm text-gray-600">
            <span>
              Showing <strong>{paginatedCourses.length}</strong> of{" "}
              <strong>{filteredCourses.length}</strong> courses
            </span>
          </div>
        </div>
      </div>
      {/* View Students Dialog */}
      <Dialog open={viewStudents} onOpenChange={setViewStudents}>
        <DialogContent className="bg-white text-black max-w-7xl max-h-[85vh] overflow-hidden">
          <DialogHeader>
            <div className="flex justify-between items-center gap-4 pr-12 md:pr-16">
              <DialogTitle className="text-xl">
                Applicants for: {selectedCourse?.title}
              </DialogTitle>
              {selectedCourse?.applicants?.length > 0 && (
                <Button onClick={handleDownloadStudentsExcel} className="bg-ngo-color6 text-white font-bold">
                  Download Excel
                </Button>
              )}
            </div>
          </DialogHeader>
          {selectedCourse?.applicants?.length > 0 ? (
            <div className="overflow-auto max-h-[70vh]">
              <Table>
                <TableHeader>
                  <tr>
                    <TableHead className="w-12">Avatar</TableHead>
                    <TableHead>Full Name</TableHead>
                    <TableHead>Contact Info</TableHead>
                    <TableHead className="hidden lg:table-cell">Personal Details</TableHead>
                    <TableHead className="hidden xl:table-cell">Location</TableHead>
                    <TableHead className="hidden 2xl:table-cell">Time Slot</TableHead>
                    <TableHead className="hidden 2xl:table-cell">Referral</TableHead>
                    <TableHead>Applied On</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead className="w-32">Message</TableHead>
                  </tr>
                </TableHeader>
                <tbody>
                  {selectedCourse.applicants.map((applicant) => (
                    <tr key={applicant._id} className="hover:bg-gray-50">
                      <td className="w-12">
                        <div className="flex items-center justify-center">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                            <StudentIcon className="w-4 h-4 text-blue-600" />
                          </div>
                          {applicant.isStudent === "Yes" && (
                            <Badge className="ml-1 bg-green-100 text-green-800 border-green-200 text-xs px-1 py-0">
                              S
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="space-y-1">
                          <div className="font-medium text-sm">{applicant.fullName || "N/A"}</div>
                          {applicant.isStudent === "Yes" && applicant.classStudying && (
                            <div className="text-xs text-gray-500 flex items-center gap-1">
                              <BookOpen className="w-3 h-3" />
                              Class {applicant.classStudying}
                            </div>
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="space-y-1 text-xs">
                          <div className="flex items-center gap-1">
                            <Mail className="w-3 h-3 text-gray-400" />
                            <span className="text-gray-600">{applicant.email || "N/A"}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="w-3 h-3 text-gray-400" />
                            <span className="text-gray-600">{applicant.phone || "N/A"}</span>
                          </div>
                          {applicant.whatsappNumber && (
                            <div className="flex items-center gap-1">
                              <MessageCircle className="w-3 h-3 text-gray-400" />
                              <span className="text-gray-600">{applicant.whatsappNumber}</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="hidden lg:table-cell">
                        <div className="space-y-1 text-xs">
                          {applicant.age && (
                            <div className="flex items-center gap-1">
                              <User className="w-3 h-3 text-gray-400" />
                              <span className="text-gray-600">{applicant.age} years</span>
                            </div>
                          )}
                          {applicant.gender && (
                            <div className="flex items-center gap-1">
                              <User className="w-3 h-3 text-gray-400" />
                              <span className="text-gray-600">{applicant.gender}</span>
                            </div>
                          )}
                          {applicant.motherTongue && (
                            <div className="flex items-center gap-1">
                              <Languages className="w-3 h-3 text-gray-400" />
                              <span className="text-gray-600">{applicant.motherTongue}</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="hidden xl:table-cell">
                        {(applicant.state || applicant.city) ? (
                          <div className="flex items-center gap-1 text-xs">
                            <MapPin className="w-3 h-3 text-gray-400" />
                            <span className="text-gray-600">
                              {[applicant.city, applicant.state].filter(Boolean).join(", ")}
                            </span>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400">N/A</span>
                        )}
                      </td>
                      <td className="hidden 2xl:table-cell">
                        {applicant.convenientTimeSlot ? (
                          <div className="flex items-center gap-1 text-xs">
                            <ClockIcon className="w-3 h-3 text-gray-400" />
                            <span className="text-gray-600">{applicant.convenientTimeSlot}</span>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400">N/A</span>
                        )}
                      </td>
                      <td className="hidden 2xl:table-cell">
                        {applicant.referredBy ? (
                          <div className="flex items-center gap-1 text-xs">
                            <Users className="w-3 h-3 text-gray-400" />
                            <span className="text-gray-600">{applicant.referredBy}</span>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400">N/A</span>
                        )}
                      </td>

                      <td>
                        <div className="flex items-center gap-1 text-xs">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          <span className="text-gray-600">
                            {applicant.appliedAt ? new Date(applicant.appliedAt).toLocaleDateString() : "N/A"}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-1 text-xs">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          <span className="text-gray-600">
                            {applicant.isVerified ? (
                              <Badge className="ml-1 bg-green-100 text-green-800 border-green-200 text-xs px-1 py-0">
                                Success
                              </Badge>
                            ) : "N/A"}
                          </span>
                        </div>
                      </td>
                      <td className="w-32">
                        {applicant.message ? (
                          <div className="text-xs">
                            <div className="flex items-start gap-1">
                              <MessageCircle className="w-3 h-3 text-gray-400 mt-0.5 flex-shrink-0" />
                              <p className="text-gray-600 line-clamp-2 leading-relaxed">
                                {applicant.message}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400">No message</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12">
              <StudentIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-muted-foreground">No applicants found for this course.</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
      {/* View Course Modal */}
      <Dialog open={viewCourseCard} onOpenChange={setViewCourseCard}>
        <DialogContent className="max-w-sm w-full bg-white text-black">
          <DialogHeader>
            <DialogTitle>Course Details</DialogTitle>
          </DialogHeader>
          {selectedCourse && (
            <CourseCardNew
              title={selectedCourse.title}
              description={selectedCourse.description}
              duration={selectedCourse.duration}
              imageUrl={selectedCourse.imageUrl}
              level={selectedCourse.level}
              targetAudience={selectedCourse.targetAudience}
              fees={selectedCourse.fees}
              isNew={selectedCourse.isNew}
            />
          )}
          <div className="flex justify-end mt-4">
            <Button variant="outline" onClick={() => setViewCourseCard(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      {/* Edit Course Dialog */}
      <Dialog
        open={isEditing}
        onOpenChange={() => {
          setIsEditing(false);
          setSelectedCourse(null);
        }}
      >
        <DialogContent className="max-w-lg w-full">
          <DialogHeader>
            <DialogTitle>Edit Course</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {editError && <div className="text-red-500 text-sm">{editError}</div>}
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Course Title"
              required
            />
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Course Description"
              required
            />
            <Input
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              placeholder="Duration (e.g., 8 weeks)"
              required
            />
            <div className="flex gap-2">
              <select
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                className="flex-1 border rounded px-2 py-2 text-sm"
                required
              >
                <option value="">Select Level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
              <Input
                type="number"
                value={formData.fees}
                onChange={(e) => setFormData({ ...formData, fees: Number(e.target.value) })}
                placeholder="Fees"
                min={0}
                className="flex-1"
                required
              />
            </div>
            <Input
              value={formData.targetAudience}
              onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
              placeholder="Target Audience (comma separated)"
              required
            />
            <Input
              value={formData.whatsappLink}
              onChange={(e) => setFormData({ ...formData, whatsappLink: e.target.value })}
              placeholder="WhatsApp Link"
              required
            />
            <div>
              <label className="block text-xs text-gray-500 mb-1">Course Image</label>
              {previewImage && (
                <img src={previewImage} alt="Current" className="h-24 rounded mb-2" />
              )}
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setFormData({ ...formData, image: file });
                    setPreviewImage(URL.createObjectURL(file));
                  }
                }}
              />
              <div className="text-xs text-gray-400 mt-1">Leave blank to keep current image.</div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => { setIsEditing(false); setSelectedCourse(null); }}>
                Cancel
              </Button>
              <Button onClick={handleEdit} disabled={editLoading} className="bg-ngo-color6 text-white font-bold">
                {editLoading ? "Updating..." : "Update"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={isDeleting}
        onOpenChange={() => {
          setIsDeleting(false);
          setSelectedCourse(null);
        }}
      >
        <DialogContent className="max-w-sm text-center">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this course?</p>
          <div className="flex justify-center gap-4 mt-4">
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setIsDeleting(false);
                setSelectedCourse(null);
              }}
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CoursesSection;
