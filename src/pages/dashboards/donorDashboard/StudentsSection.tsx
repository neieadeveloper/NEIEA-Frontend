import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const StudentsSection = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axiosInstance.get("/donor/students");
        setStudents(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching students:", error);
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return (
    <Card className="shadow-md border-0">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-primary">
          Assigned Students
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student._id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.age}</TableCell>
                  <TableCell>{student.class}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {student.progress.length > 0 ? "Progress Added" : "No Progress"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => setSelectedStudent(student)}
                        >
                          View Progress
                        </Button>
                      </DialogTrigger>
                      {selectedStudent?._id === student._id && (
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Progress for {student.name}</DialogTitle>
                          </DialogHeader>
                          {student.progress && student.progress.length > 0 ? (
                            <div className="space-y-4 max-h-[300px] overflow-y-auto">
                              {student.progress.map((p, index) => (
                                <div
                                  key={p._id || index}
                                  className="border border-border rounded-md p-3"
                                >
                                  <p>
                                    <strong>Date:</strong>{" "}
                                    {new Date(p.date).toLocaleDateString()}
                                  </p>
                                  <p>
                                    <strong>Details:</strong>{" "}
                                    {p.details || <em>No details</em>}
                                  </p>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-muted-foreground text-sm">No progress updates available.</p>
                          )}
                        </DialogContent>
                      )}
                    </Dialog>
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

export default StudentsSection;