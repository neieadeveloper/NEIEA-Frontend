import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosInstance";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Shield, Key, Lock } from "lucide-react";
import DatabaseBackup from "./DatabaseBackup";

const passwordSchema = z.object({
  currentPassword: z.string().min(8, "Password must be at least 8 characters"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const SecuritySection = () => {
  const form = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await axiosInstance.put("/admin/security/change-password", {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      toast.success("Password changed successfully");
      form.reset();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to change password");
      console.error("Change password error:", error);
    }
  };

  return (
    <div className="space-y-1">
      <Card className="border-0 rounded-none shadow-none">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Account Security
          </CardTitle>
          <CardDescription>
            Manage your account security settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <FormControl>
                      <Input
                        id="currentPassword"
                        type="password"
                        placeholder="Enter current password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="newPassword">New Password</Label>
                    <FormControl>
                      <Input
                        id="newPassword"
                        type="password"
                        placeholder="Enter new password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <FormControl>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm new password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end pt-4">
                <Button type="submit" className="w-full md:w-auto">
                  <Key className="w-4 h-4 mr-2" />
                  Change Password
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      {/* <Card className="border-0 rounded-none shadow-none">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Two-Factor Authentication
          </CardTitle>
          <CardDescription>
            Add an extra layer of security to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h4 className="font-medium">Status: Not enabled</h4>
              <p className="text-sm text-muted-foreground">
                Two-factor authentication adds an additional layer of security to your account.
              </p>
            </div>
            <Button variant="outline">
              Enable 2FA
            </Button>
          </div>
        </CardContent>
      </Card> */}

      <DatabaseBackup/>
    </div>
  );
};

export default SecuritySection;