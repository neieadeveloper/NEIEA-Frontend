import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import {
  BookOpen,
  Users,
  PlusCircle,
  UserPlus,
  Key,
  Building2,
  LogOut,
  Layers,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Mail,
  MessageSquare,
  UserCheck,
  Newspaper,
} from "lucide-react";
import CoursesSection from "./CoursesSection";
import DonorsSection from "./DonorsSection";
import NewCourse from "./NewCourse";
import SecuritySection from "./SecuritySection";
import ManageAdmins from "./ManageAdmins";
import CourseSectionForInstitution from "./CourseSectionForInstitution";
// import logoRemovedBg from "../../../assets/images/neia-primary-logo.svg?url";
import ReferredBy from "./ReferredBy";
import Index from "./manageWebsitePages/Index.tsx";
import SubscribeSection from "./SubscribeSection";
import ContactInquiriesSection from "./ContactInquiriesSection";
import NewsSection from "./NewsSection";
import VolunteersSection from "./VolunteersSection";

const sidebarItems = [
  // { label: "Dashboard", value: "dashboard", icon: <Menu className="w-5 h-5" /> },
  { label: "Courses", value: "courses", icon: <BookOpen className="w-5 h-5" /> },
  { label: "New Course", value: "new", icon: <PlusCircle className="w-5 h-5" /> },
  { label: "ReferredBy", value: "referredBy", icon: <PlusCircle className="w-5 h-5" /> },
  { label: "Donors", value: "donors", icon: <Users className="w-5 h-5" /> },
  { label: "Institutions", value: "institutions", icon: <Building2 className="w-5 h-5" /> },
  { label: "Subscribe Emails", value: "subscribe", icon: <Mail className="w-5 h-5" /> },
  { label: "Contact Inquiries", value: "contact-inquiries", icon: <MessageSquare className="w-5 h-5" /> },
  { label: "Volunteers", value: "volunteers", icon: <UserCheck className="w-5 h-5" /> },
  { label: "Manage Admins", value: "admins", icon: <UserPlus className="w-5 h-5" /> },
  { label: "News / Updates", value: "news", icon: <Newspaper className="w-5 h-5" /> },
  { label: "Security", value: "security", icon: <Key className="w-5 h-5" /> },
  // { label: "Home Page", value: "website-navigation", icon: <Layers className="w-5 h-5" /> },
  { label: "Manage Website Pages", value: "website-pages", icon: <Layers className="w-5 h-5" /> },
];

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("courses");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // for mobile
  const mainContentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (activeTab === "website-pages") {
      const container = mainContentRef.current;

      if (container) {
        const heading = container.querySelector('[data-scroll-target="website-pages"]') as HTMLElement | null;

        if (heading) {
          heading.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          container.scrollTo({ top: 0, behavior: "smooth" });
        }
      }

      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [activeTab]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-white relative admin-dashboard">
      {/* Mobile Hamburger Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-40 bg-ngo-color1 text-white p-2 rounded-full shadow-lg hover:bg-ngo-color1/90 transition-colors"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open sidebar"
      >
        <Menu size={24} />
      </button>
      
      {/* Sidebar */}
      <aside
        className={`
          transition-all duration-300 bg-white text-ngo-color1 flex flex-col min-h-screen shadow-xl border-r border-gray-200
          ${sidebarCollapsed ? "w-20 py-3 px-2" : "w-64 py-6 px-4"}
          fixed top-0 left-0 z-50 h-full md:static md:block md:z-auto md:h-auto
          ${sidebarOpen ? "block" : "hidden"} md:block
        `}
        style={{ maxWidth: sidebarCollapsed ? '5rem' : '16rem' }}
      >
        {/* Mobile Close Button */}
        <div className="md:hidden flex justify-end mb-6">
          <button
            className="bg-ngo-color1 text-white rounded-full p-2 hover:bg-ngo-color1/90 transition-colors"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Logo Section */}
        <div className={`mb-8 flex items-center gap-3 ${sidebarCollapsed ? "justify-center" : ""}`}>
          <div className="w-12 h-12 rounded-full bg-ngo-color1 flex items-center justify-center shadow-lg">
            <img src="/assets/images/neia-primary-logo.svg" alt="NEIEA Logo" className="w-8 h-8" />
          </div>
          {!sidebarCollapsed && (
            <h3 className="font-bold text-xl text-ngo-color1">NEIEA</h3>
          )}
        </div>
        
        {/* Collapse/Expand Button - only on desktop */}
        <div className="hidden md:flex justify-center mb-8">
          <button
            className="flex items-center justify-center w-8 h-8 rounded-full bg-ngo-color1 text-white hover:bg-ngo-color1/90 transition-colors"
            onClick={() => setSidebarCollapsed((prev) => !prev)}
            aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-1">
            {sidebarItems.map((item) => (
              <li key={item.value}>
                <button
                  className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200 font-medium text-sm focus:outline-none
                    ${activeTab === item.value
                      ? "bg-ngo-color1 text-white shadow-md"
                      : "text-ngo-color1 hover:bg-ngo-color1/10 hover:text-ngo-color1"}
                    ${sidebarCollapsed ? "justify-center px-2" : ""}
                  `}
                  onClick={() => {
                    setActiveTab(item.value);
                    setSidebarOpen(false);
                  }}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  {!sidebarCollapsed && <span className="ml-3">{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Logout Button */}
        <div className="mt-auto pt-6 border-t border-gray-200">
          <button
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-ngo-color1 hover:bg-ngo-color1/90 text-white font-medium transition-colors"
            onClick={logout}
          >
            <LogOut size={18} />
            {!sidebarCollapsed && "Log out"}
          </button>
        </div>
      </aside>
      
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Main Content */}
      <main ref={mainContentRef} className="flex-1 overflow-y-auto bg-white">
        {activeTab === "courses" && <CoursesSection />}
        {activeTab === "new" && <NewCourse />}
        {activeTab === "referredBy" && <ReferredBy />}
        {activeTab === "donors" && <DonorsSection />}
        {activeTab === "institutions" && <CourseSectionForInstitution />}
        {activeTab === "subscribe" && <SubscribeSection />}
        {activeTab === "contact-inquiries" && <ContactInquiriesSection />}
        {activeTab === "volunteers" && <VolunteersSection />}
        {activeTab === "admins" && <ManageAdmins />}
        {activeTab === "news" && <NewsSection />}
        {activeTab === "security" && <SecuritySection />}
        {/* {activeTab === "website-navigation" && <ManageLandingPages />}
        {activeTab === "website-pages" && <WebsitePageManager />} */}
        {activeTab === "website-pages" && <Index />}
      </main>
    </div>
  );
};

export default AdminDashboard;
