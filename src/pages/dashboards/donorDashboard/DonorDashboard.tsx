import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { HeartPulse, User, Shield, LogOut, Home, PlusCircle, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ProfileSection from "./ProfileSection";
import DonationHistory from "./DonationHistory";
import SecuritySection from "./SecuritySection";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { Toaster } from "sonner";
import NewDonation from "./NewDonation";
import StudentsSection from "./StudentsSection";

const DonorDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Toaster richColors position="top-right" />

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Donor Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user.firstName}!
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="destructive"
              size="sm"
              onClick={logout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* User Profile Card */}
        <Card className="mb-6 shadow-sm">
          <CardContent className="p-6 flex flex-col sm:flex-row items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-8 h-8 text-primary" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-lg font-semibold">
                {user.firstName} {user.lastName}
              </h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
            <Badge variant="secondary" className="hidden sm:flex">
              {user.donorType} Donor
            </Badge>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-5 h-auto mb-6">
            <TabsTrigger value="profile" className="py-3">
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="donations" className="py-3">
              <HeartPulse className="w-4 h-4 mr-2" />
              My Donations
            </TabsTrigger>
            <TabsTrigger value="students" className="py-3">
              <BookOpen className="w-4 h-4 mr-2" />
              Students
            </TabsTrigger>
            <TabsTrigger value="new" className="py-3">
              <PlusCircle className="w-4 h-4 mr-2" />
              New Donation
            </TabsTrigger>
            <TabsTrigger value="security" className="py-3">
              <Shield className="w-4 h-4 mr-2" />
              Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <ProfileSection user={user} />
          </TabsContent>
          <TabsContent value="donations">
            <DonationHistory />
          </TabsContent>
          <TabsContent value="students">
            <StudentsSection />
          </TabsContent>
          <TabsContent value="new">
            <NewDonation />
          </TabsContent>
          <TabsContent value="security">
            <SecuritySection />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default DonorDashboard;
