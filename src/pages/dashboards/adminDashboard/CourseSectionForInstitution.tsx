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
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle,
  Clock,
  Users,
  DollarSign,
  Target,
  GraduationCap,
  ExternalLink,
  Sparkles,
  Building,
  Mail,
  MapPin,
  Phone,
  Calendar,
  BookOpen,
  Download,
  Eye
} from "lucide-react";
import { SectionLoader } from "@/components/LoadingSpinner";
import * as XLSX from "xlsx";
import { FaRupeeSign as FaRupeeSignIcon } from "react-icons/fa";

const CourseSectionForInstitution = ({ searchQuery = "" }) => {
  const [institutions, setInstitutions] = useState([]);
  const [filteredInstitutions, setFilteredInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInstitution, setSelectedInstitution] = useState(null);
  const [viewCourses, setViewCourses] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [popupUrl, setPopupUrl] = useState(null);
  const [popupType, setPopupType] = useState(null); // 'image' or 'excel'

  const fetchInstitutions = async () => {
    try {
      const response = await axiosInstance.get("/admin/institutions");
      setInstitutions(response.data);
      setFilteredInstitutions(response.data);
    } catch (error) {
      console.error("Failed to load institutions", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstitutions();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = institutions.filter(
        (inst) =>
          inst.institutionName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          inst.coordinatorName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          inst.email?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredInstitutions(filtered);
    } else {
      setFilteredInstitutions(institutions);
    }
  }, [searchQuery, institutions]);

  const paginatedInstitutions = filteredInstitutions.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const totalPages = Math.ceil(filteredInstitutions.length / pageSize);

  const handleDownloadExcel = () => {
    const data = filteredInstitutions.map((inst) => ({
      "Institution Name": inst.institutionName || "",
      "Coordinator Name": inst.coordinatorName || "",
      "Coordinator Email": inst.coordinatorEmail || "",
      "Coordinator Contact": inst.coordinatorContactNumber1 || "",
      "Number Of Students": inst.numberOfStudents || 0,
      "Start Month": inst.startMonth || "",
      "Suitable Time Slot": inst.suitableTimeSlot || "",
      "How Find Us": inst.howDidYouFindUs || "",
      "Referred By": inst.referredBy || "",
      "Applied Courses": inst.appliedCourses?.length || 0,
      "State": inst.state || "",
      "City": inst.state || "",
      "Address": inst.state || "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);

    const calculateColumnWidths = (data) => {
      const widths = [];
      const headers = Object.keys(data[0]);
      headers.forEach((header, index) => {
        widths[index] = { wch: header.length };
      });

      data.forEach((row) => {
        headers.forEach((header, index) => {
          const cellValue = row[header].toString();
          if (cellValue.length > widths[index].wch) {
            widths[index].wch = cellValue.length;
          }
        });
      });

      widths.forEach((width) => {
        width.wch += 2;
      });

      return widths;
    };

    const columnWidths = calculateColumnWidths(data);
    worksheet["!cols"] = columnWidths;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Institutions Report");
    XLSX.writeFile(workbook, "institutions_report.xlsx");
  };

  const handleDownloadStudentList = (studentListUrl, institutionName) => {
    if (!studentListUrl) return;
    const link = document.createElement('a');
    link.href = studentListUrl;
    link.target = "_blank";
    link.download = `${institutionName || 'institution'}_student_list.${studentListUrl.split('.').pop()}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadCoursesExcel = () => {
    if (!selectedInstitution || !selectedInstitution.appliedCourses) return;
    const data = selectedInstitution.appliedCourses.map((course) => ({
      Title: course.title || "",
      Description: course.description || "",
      Duration: course.duration || "",
      Instructor: course.instructor || "",
      Level: course.level || "",
      Fees: course.fees || 0,
      TargetAudience: Array.isArray(course.targetAudience) ? course.targetAudience.join(", ") : course.targetAudience || "",
      WhatsAppLink: course.whatsappLink || "",
      IsNew: course.isNew ? "Yes" : "No",
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Applied Courses");
    const institutionName = (selectedInstitution.institutionName || "institution").replace(/\s+/g, "_");
    XLSX.writeFile(workbook, `${institutionName}_courses.xlsx`);
  };

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

  const handleViewStudentList = (studentListUrl) => {
    if (!studentListUrl) return;

    if (studentListUrl.endsWith('.xlsx') || studentListUrl.endsWith('.xls')) {
      setPopupType('excel');
    } else {
      setPopupType('image');
    }

    setPopupUrl(studentListUrl);
  };

  return (
    <Card className="border-0 shadow-none rounded-none">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl">Institutions Management</CardTitle>
            <CardDescription>
              View all institutions and their applied courses
            </CardDescription>
          </div>
          <Button onClick={handleDownloadExcel} className="bg-ngo-color6 text-white font-bold">
            Download
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <SectionLoader />
        ) : filteredInstitutions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No institutions found</p>
          </div>
        ) : (
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">Logo</TableHead>
                  <TableHead>Institution Details</TableHead>
                  <TableHead className="hidden lg:table-cell">Contact Info</TableHead>
                  <TableHead className="hidden md:table-cell">Address</TableHead>
                  <TableHead className="hidden xl:table-cell">Program Details</TableHead>
                  <TableHead>Applied Courses</TableHead>
                  <TableHead className="hidden lg:table-cell">Student List</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedInstitutions.map((inst) => (
                  <TableRow key={inst._id} className="hover:bg-gray-50">
                    <TableCell className="w-16">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                        {inst.institutionLogo ? (
                          <img
                            src={inst.institutionLogo}
                            alt={inst.institutionName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Building className="w-6 h-6 text-gray-400" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <h3 className="font-semibold text-sm text-gray-900 line-clamp-1">
                            {inst.institutionName}
                          </h3>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            <span>Coordinator: {inst.coordinatorName}</span>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center gap-1">
                          <Mail className="w-3 h-3 text-gray-400" />
                          <span className="text-gray-600">{inst.email || "N/A"}</span>
                        </div>
                        {inst.phone && (
                          <div className="flex items-center gap-1">
                            <Phone className="w-3 h-3 text-gray-400" />
                            <span className="text-gray-600">{inst.phone}</span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <MapPin className="w-3 h-3" />
                        <span className="line-clamp-2 max-w-48">
                          {inst.address || "Not specified"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden xl:table-cell">
                      <div className="space-y-2">
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <Users className="w-3 h-3" />
                          <span>{inst.numberOfStudents || 0} students</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <Calendar className="w-3 h-3" />
                          <span>Start: {inst.startMonth || "N/A"}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <Clock className="w-3 h-3" />
                          <span>{inst.suitableTimeSlot || "N/A"}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                          {inst.appliedCourses?.length || 0}
                        </span>
                        {inst.appliedCourses?.length > 0 && (
                          <Button
                            variant="link"
                            className="text-xs text-blue-600 p-0 h-auto"
                            onClick={() => {
                              setSelectedInstitution(inst);
                              setViewCourses(true);
                            }}
                          >
                            View
                          </Button>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {inst.studentList ? (
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => handleViewStudentList(inst.studentList)}
                            title="View Student List"
                          >
                            <Eye className="w-4 h-4 text-blue-600" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => handleDownloadStudentList(inst.studentList, inst.institutionName)}
                            title="Download Student List"
                          >
                            <Download className="w-4 h-4 text-green-600" />
                          </Button>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">Not available</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {/* Pagination Controls */}
            <div className="flex justify-end items-center mt-4 gap-2">
              <Button
                variant="outline"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              >
                Previous
              </Button>
              <span>
                Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
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
      </CardContent>
      <CardFooter className="flex justify-between text-sm text-muted-foreground">
        Showing <strong>{paginatedInstitutions.length}</strong> of {" "}
        <strong>{filteredInstitutions.length}</strong> institutions
      </CardFooter>

      {/* Popup Dialog for Image or Excel */}
      <Dialog open={!!popupUrl} onOpenChange={() => setPopupUrl(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Student List</DialogTitle>
          </DialogHeader>
          {popupUrl && (
            <div className="flex justify-center">
              {popupType === 'image' ? (
                <img src={popupUrl} alt="Student List" className="max-w-full max-h-[70vh]" />
              ) : (
                <iframe
                  src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(popupUrl)}`}
                  width="100%"
                  height="500px"
                  frameBorder="0"
                ></iframe>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* View Applied Courses Dialog */}
      <Dialog open={viewCourses} onOpenChange={setViewCourses}>
        <DialogContent className="max-w-7xl max-h-[85vh] overflow-hidden">
          <DialogHeader>
            <div className="flex justify-between items-center gap-4 pr-12 md:pr-16">
              <DialogTitle className="text-xl">
                Applied Courses for: {selectedInstitution?.institutionName}
              </DialogTitle>
              {selectedInstitution?.appliedCourses?.length > 0 && (
                <Button onClick={handleDownloadCoursesExcel} className="bg-ngo-color6 text-white font-bold">
                  Download Excel
                </Button>
              )}
            </div>
          </DialogHeader>
          {selectedInstitution?.appliedCourses?.length > 0 ? (
            <div className="overflow-auto max-h-[70vh]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Image</TableHead>
                    <TableHead>Course Details</TableHead>
                    <TableHead className="hidden lg:table-cell">Level & Fees</TableHead>
                    <TableHead className="hidden md:table-cell">Target Audience</TableHead>
                    <TableHead className="hidden xl:table-cell">WhatsApp Group Link</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedInstitution.appliedCourses.map((course) => (
                    <TableRow key={course._id} className="hover:bg-gray-50">
                      <TableCell className="w-16">
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
                              <Badge className="bg-green-100 text-green-800 border-green-200 text-xs px-1.5 py-0.5 flex items-center gap-1">
                                <Sparkles className="w-3 h-3" />
                                New
                              </Badge>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <h3 className="font-semibold text-sm text-gray-900 line-clamp-1">
                              {course.title}
                            </h3>
                          </div>
                          <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                            {course.description}
                          </p>
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
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="space-y-2">
                          <Badge className={getLevelColor(course.level)}>
                            {course.level?.charAt(0).toUpperCase() + course.level?.slice(1)}
                          </Badge>
                          <div className="flex items-center gap-1 text-sm text-gray-700">
                            <FaRupeeSignIcon className="w-4 h-4" />
                            <span className="font-medium">{course.fees || 0}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <Target className="w-3 h-3" />
                          <span className="line-clamp-2">
                            {Array.isArray(course.targetAudience)
                              ? course.targetAudience.join(", ")
                              : course.targetAudience || "Not specified"
                            }
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden xl:table-cell">
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
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12">
              <GraduationCap className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-muted-foreground">No applied courses found for this institution.</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default CourseSectionForInstitution;
