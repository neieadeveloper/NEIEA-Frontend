import React, { useState, useEffect } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { useAuth } from "@/hooks/useAuth";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
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
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, UserPlus, Edit, Trash2, Shield } from "lucide-react";

const adminSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.union([
    z.string().min(8, "Password must be at least 8 characters"),
    z.literal("")
  ]),
  role: z.enum(["admin", "superadmin"]),
});

const ManageAdmins = () => {
  const { user } = useAuth();
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(adminSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "admin",
    },
  });

  // Check if current user is admin or superadmin
  const isAdmin = user?.role === 'admin';
  const isSuperAdmin = user?.role === 'superadmin';

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/admin/getAll-admin");
      setAdmins(response.data.data || []); 
      setLoading(false);
    } catch (error) {
      console.error("Error fetching admins:", error);
      toast.error("Failed to load admins");
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      if (!selectedAdmin && !data.password) {
        toast.error("Password is required to create a new admin");
        return;
      }

      const payload = { ...data };

      if (selectedAdmin && !payload.password) {
        delete payload.password;
      }

      if (selectedAdmin) {
        // Update existing admin
        await axiosInstance.put(`/admin/edit/${selectedAdmin._id}`, payload);
        toast.success("Admin updated successfully");
      } else {
        // Create new admin
        await axiosInstance.post("/admin/create-admin", payload);
        toast.success("Admin created successfully");
      }
      reset();
      setSelectedAdmin(null);
      setIsDialogOpen(false);
      fetchAdmins();
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed");
      console.error("Error saving admin:", error);
    }
  };

  const handleDelete = async (adminId) => {
    // Find the admin to check their role
    const adminToDelete = admins.find(admin => admin._id === adminId);
    
    // Prevent admin users from deleting superadmin accounts
    if (isAdmin && adminToDelete?.role === 'superadmin') {
      toast.error("You don't have permission to delete superadmin accounts");
      return;
    }

    // Prevent self-deletion
    if (adminId === user?._id) {
      toast.error("You cannot delete your own account");
      return;
    }

    try {
      await axiosInstance.delete(`/admin/delete/${adminId}`);
      toast.success("Admin deleted successfully");
      fetchAdmins();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete admin");
      console.error("Error deleting admin:", error);
    }
  };

  const handleEdit = (admin) => {
    // Prevent admin users from editing superadmin accounts
    if (isAdmin && admin.role === 'superadmin') {
      toast.error("You don't have permission to edit superadmin accounts");
      return;
    }

    setSelectedAdmin(admin);
    reset({
      firstName: admin.firstName,
      lastName: admin.lastName,
      email: admin.email,
      role: admin.role,
      password: "", // Don't pre-fill password for security
    });
    setIsDialogOpen(true);
  };

  return (
    <Card className="border-0 shadow-none rounded-none">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl">Admin Management</CardTitle>
            <CardDescription>
              Manage system administrators and their permissions
            </CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setSelectedAdmin(null);
                  reset();
                }}
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Add Admin
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>
                  {selectedAdmin ? "Edit Admin" : "Create New Admin"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      {...register("firstName")}
                      className={errors.firstName ? "border-red-500" : ""}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      {...register("lastName")}
                      className={errors.lastName ? "border-red-500" : ""}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="password">
                    {selectedAdmin
                      ? "New Password (leave blank to keep current)"
                      : "Password"}
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    {...register("password")}
                    className={errors.password ? "border-red-500" : ""}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="role">Role</Label>
                  <select
                    id="role"
                    {...register("role")}
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="admin">Admin</option>
                    {isSuperAdmin && <option value="superadmin">Super Admin</option>}
                  </select>
                </div>

                <DialogFooter>
                  <Button type="submit">
                    {selectedAdmin ? "Update Admin" : "Create Admin"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : admins.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No admins found</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {admins.map((admin) => (
                <TableRow key={admin._id}>
                  <TableCell className="font-medium">
                    {admin.firstName} {admin.lastName}
                  </TableCell>
                  <TableCell>{admin.email}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        admin.role === "superadmin" ? "default" : "secondary"
                      }
                    >
                      {admin.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={admin.isActive ? "default" : "outline"}>
                      {admin.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {/* Hide actions for superadmin accounts if current user is admin */}
                    {!(isAdmin && admin.role === 'superadmin') && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(admin)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600 focus:text-red-600"
                            onClick={() => handleDelete(admin._id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                    {/* Show message for restricted access */}
                    {isAdmin && admin.role === 'superadmin' && (
                      <span className="text-muted-foreground text-sm">Restricted</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          Showing <strong>{admins.length}</strong> admins
        </div>
      </CardFooter>
    </Card>
  );
};

export default ManageAdmins;
