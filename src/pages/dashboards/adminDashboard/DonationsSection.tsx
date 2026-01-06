import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { LoadingSpinner, SectionLoader } from "@/components/LoadingSpinner";

// Define the schema for student assignment
const studentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z.number().min(1, "Age is required"),
  class: z.string().min(1, "Class is required"),
});

const progressSchema = z.object({
  progressDetails: z.string().min(1, "Progress details are required"),
});

const DonationsSection = () => {
  const [donors, setDonors] = useState([]);
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedDonorDetails, setSelectedDonorDetails] = useState(null);
  const [loading, setLoading] = useState({
    donors: false,
    assignStudent: false,
    updateProgress: false,
  });

  const {
    register: registerStudent,
    handleSubmit: handleSubmitStudent,
    reset: resetStudent,
  } = useForm({
    resolver: zodResolver(studentSchema),
  });

  const {
    register: registerProgress,
    handleSubmit: handleSubmitProgress,
    reset: resetProgress,
  } = useForm({
    resolver: zodResolver(progressSchema),
  });

  const fetchDonors = async () => {
    try {
      setLoading((prev) => ({ ...prev, donors: true }));
      const response = await axiosInstance.get("/admin/donors");
      setDonors(response.data.data || response.data);
    } catch (error) {
      console.error("Error fetching donors:", error);
      toast.error("Failed to fetch donors");
    } finally {
      setLoading((prev) => ({ ...prev, donors: false }));
    }
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  const onSubmitStudent = async (data) => {
    try {
      setLoading((prev) => ({ ...prev, assignStudent: true }));
      await axiosInstance.post(`/admin/assign-student`, {
        donorId: selectedDonor._id,
        studentData: data,
      });
      toast.success("Student assigned successfully");
      resetStudent();
      setSelectedDonor(null);
      fetchDonors();
    } catch (error) {
      toast.error("Failed to assign student");
      console.error("Error assigning student:", error);
    } finally {
      setLoading((prev) => ({ ...prev, assignStudent: false }));
    }
  };

  const onSubmitProgress = async (data) => {
    try {
      setLoading((prev) => ({ ...prev, updateProgress: true }));
      await axiosInstance.put(`/admin/update-student-progress`, {
        studentId: selectedStudent._id,
        progressData: {
          details: data.progressDetails,
        },
      });
      toast.success("Progress updated successfully");
      resetProgress();
      setSelectedStudent(null);
      fetchDonors();
    } catch (error) {
      toast.error("Failed to update progress");
      console.error("Error updating progress:", error);
    } finally {
      setLoading((prev) => ({ ...prev, updateProgress: false }));
    }
  };

  if (loading.donors && donors.length === 0) {
    return <SectionLoader />;
  }

  return (
    <Card className="border-0 shadow-lg rounded-none ">
      <CardHeader className="border-b border-ngo-color6 pb-4">
        <CardTitle className="text-2xl font-heading text-ngo-rakau">
          Donors
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="overflow-x-auto">
          <Table className="min-w-full divide-y divide-ngo-color6">
            <TableHeader>
              <TableRow className="">
                <TableHead className="px-4 py-2 text-left text-ngo-rakau">
                  Name
                </TableHead>
                <TableHead className="px-4 py-2 text-left text-ngo-rakau">
                  Email
                </TableHead>
                <TableHead className="px-4 py-2 text-left text-ngo-rakau">
                  Phone
                </TableHead>
                <TableHead className="px-4 py-2 text-left text-ngo-rakau">
                  Donor Type
                </TableHead>
                <TableHead className="px-4 py-2 text-left text-ngo-rakau">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-ngo-color6">
              {donors.map((donor) => (
                <TableRow key={donor._id} className="">
                  <TableCell className="px-4 py-2 text-ngo-rakau">
                    {donor.firstName} {donor.lastName}
                  </TableCell>
                  <TableCell className="px-4 py-2 text-ngo-rakau">
                    {donor.email}
                  </TableCell>
                  <TableCell className="px-4 py-2 text-ngo-rakau">
                    {donor.phone}
                  </TableCell>
                  <TableCell className="px-4 py-2 text-ngo-rakau">
                    {donor.donorType}
                  </TableCell>
                  <TableCell className="px-4 py-2">
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedDonorDetails(donor)}
                          >
                            View Details
                          </Button>
                        </DialogTrigger>
                        {selectedDonorDetails?._id === donor._id && (
                          <DialogContent className="max-w-3xl text-ngo-rakau">
                            <DialogHeader>
                              <DialogTitle className="text-2xl font-heading text-ngo-rakau">
                                Details for {selectedDonorDetails.firstName}{" "}
                                {selectedDonorDetails.lastName}
                              </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-6">
                              <div className="space-y-4">
                                <h4 className="text-lg font-medium text-ngo-rakau border-b border-ngo-rakau pb-2">
                                  Personal Information
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm text-ngo-rakau">
                                      <strong>Email:</strong>{" "}
                                      {selectedDonorDetails.email}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-ngo-rakau">
                                      <strong>Phone:</strong>{" "}
                                      {selectedDonorDetails.phone}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-ngo-rakau">
                                      <strong>Donor Type:</strong>{" "}
                                      {selectedDonorDetails.donorType}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-4">
                                <h4 className="text-lg font-medium text-ngo-rakau border-b border-ngo-rakau pb-2">
                                  Donation Information
                                </h4>
                                <p className="text-sm text-ngo-rakau">
                                  <strong>Total Donation Amount:</strong>{" "}
                                  {selectedDonorDetails.totalDonationAmount}
                                </p>
                                <div className="space-y-4">
                                  {selectedDonorDetails.donations.map(
                                    (donation, index) => (
                                      <div
                                        key={index}
                                        className="p-4 border border-ngo-rakau rounded-lg"
                                      >
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                          <div>
                                            <p className="text-sm">
                                              <strong>Amount:</strong>{" "}
                                              {donation.amount}
                                            </p>
                                          </div>
                                          <div>
                                            <p className="text-sm">
                                              <strong>Frequency:</strong>{" "}
                                              {donation.frequency}
                                            </p>
                                          </div>
                                          <div>
                                            <p className="text-sm">
                                              <strong>Date:</strong>{" "}
                                              {new Date(
                                                donation.createdAt
                                              ).toLocaleDateString()}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        )}
                      </Dialog>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedDonor(donor)}
                          >
                            Assign Student
                          </Button>
                        </DialogTrigger>
                        {selectedDonor?._id === donor._id && (
                          <DialogContent className="text-ngo-rakau">
                            <DialogHeader>
                              <DialogTitle className="text-2xl font-heading text-ngo-rakau">
                                Assign Student to {donor.firstName}
                              </DialogTitle>
                            </DialogHeader>
                            <form
                              onSubmit={handleSubmitStudent(onSubmitStudent)}
                              className="space-y-4"
                            >
                              <div>
                                <Label
                                  htmlFor="name"
                                  className="text-ngo-rakau"
                                >
                                  Name
                                </Label>
                                <Input
                                  id="name"
                                  {...registerStudent("name")}
                                  className="border-ngo-rakau text-ngo-rakau"
                                />
                              </div>
                              <div>
                                <Label htmlFor="age" className="text-ngo-rakau">
                                  Age
                                </Label>
                                <Input
                                  id="age"
                                  type="number"
                                  {...registerStudent("age", {
                                    valueAsNumber: true,
                                  })}
                                  className="border-ngo-rakau text-ngo-rakau"
                                />
                              </div>
                              <div>
                                <Label
                                  htmlFor="class"
                                  className="text-ngo-rakau"
                                >
                                  Class
                                </Label>
                                <Input
                                  id="class"
                                  {...registerStudent("class")}
                                  className="border-ngo-rakau text-ngo-rakau"
                                />
                              </div>
                              <Button
                                type="submit"
                                disabled={loading.assignStudent}
                              >
                                {loading.assignStudent ? (
                                  <>
                                    <LoadingSpinner
                                      size="sm"
                                      className="mr-2"
                                    />
                                    Assigning...
                                  </>
                                ) : (
                                  "Assign"
                                )}
                              </Button>
                            </form>
                          </DialogContent>
                        )}
                      </Dialog>
                      {donor.students && donor.students.length > 0 && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedDonor(donor)}
                            >
                              View Students
                            </Button>
                          </DialogTrigger>
                          {selectedDonor?._id === donor._id && (
                            <DialogContent className="max-w-3xl  text-ngo-rakau">
                              <DialogHeader>
                                <DialogTitle className="text-2xl font-heading text-ngo-rakau">
                                  Students of {donor.firstName}
                                </DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                {selectedDonor.students.map((student) => (
                                  <div
                                    key={student._id}
                                    className="p-4 border border-ngo-rakau rounded-lg cursor-pointer flex justify-between "
                                    onClick={() => setSelectedStudent(student)}
                                  >
                                    <h4 className="font-medium text-ngo-rakau">
                                      {student.name}
                                    </h4>
                                    <Dialog>
                                      <DialogTrigger asChild>
                                        <Button
                                          variant="link"
                                          size="sm"
                                          className="text-ngo-color4 hover:text-ngo-color4/80"
                                        >
                                          View Details
                                        </Button>
                                      </DialogTrigger>
                                      {selectedStudent?._id === student._id && (
                                        <DialogContent className=" text-ngo-rakau">
                                          <DialogHeader>
                                            <DialogTitle className="text-2xl font-heading text-ngo-rakau">
                                              Progress for {student.name}
                                            </DialogTitle>
                                          </DialogHeader>
                                          <form
                                            onSubmit={handleSubmitProgress(
                                              onSubmitProgress
                                            )}
                                            className="space-y-4"
                                          >
                                            <div>
                                              <Label
                                                htmlFor="progressDetails"
                                                className="text-ngo-rakau"
                                              >
                                                Progress Details
                                              </Label>
                                              <Textarea
                                                id="progressDetails"
                                                {...registerProgress(
                                                  "progressDetails"
                                                )}
                                                className="border-ngo-rakau text-ngo-rakau"
                                              />
                                            </div>
                                            <Button
                                              type="submit"
                                              className="bg-ngo-color4 text-ngo-rakau hover:bg-ngo-color4/90"
                                              disabled={loading.updateProgress}
                                            >
                                              {loading.updateProgress ? (
                                                <>
                                                  <LoadingSpinner
                                                    size="sm"
                                                    className="mr-2"
                                                  />
                                                  Updating...
                                                </>
                                              ) : (
                                                "Update Progress"
                                              )}
                                            </Button>
                                          </form>
                                          <div>
                                            <h5 className="font-medium mt-4 text-ngo-rakau">
                                              Progress History:
                                            </h5>
                                            {student.progress &&
                                              student.progress.map(
                                                (progress, index) => (
                                                  <div
                                                    key={index}
                                                    className="mt-2 p-2 border border-ngo-rakau rounded-lg"
                                                  >
                                                    <p className="text-ngo-rakau">
                                                      <strong>Date:</strong>{" "}
                                                      {new Date(
                                                        progress.date
                                                      ).toLocaleDateString()}
                                                    </p>
                                                    <p className="text-ngo-rakau">
                                                      <strong>Details:</strong>{" "}
                                                      {progress.details}
                                                    </p>
                                                  </div>
                                                )
                                              )}
                                          </div>
                                        </DialogContent>
                                      )}
                                    </Dialog>
                                  </div>
                                ))}
                              </div>
                            </DialogContent>
                          )}
                        </Dialog>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default DonationsSection;
