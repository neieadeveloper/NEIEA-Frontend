import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css'; // Tailwind CSS
import "./assets/css/style.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Component
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import HomeDynamic from "./pages/HomeDynamic";
import NotFound from "./pages/NotFound";
// import Introduction from "./pages/Introduction.jsx";
// import Leadership from "./pages/Leadership";
// import Bio from "./pages/Bio";
// import Testimonials from "./pages/Testimonials";
import TestimonialsDynamic from "./pages/TestimonialsDynamic";
import Contact from "./pages/Contact";
import BlendedLearningDynamic from "./pages/BlendedLearningDynamic";
// import DiscourseOrientedPedagogy from "./pages/DiscourseOrientedPedagogy";
import DiscourseOrientedPedagogyDynamic from "./pages/DiscourseOrientedPedagogyDynamic";
import ApplicationOfTechnologyDynamic from "./pages/ApplicationOfTechnologyDynamic";
import PartneringInstitutions from "./pages/PartneringInstitutions";
import RemoteLearningDynamic from "./pages/RemoteLearningDynamic";
// import Gallery from "./pages/Gallery";
import GalleryDynamic from "./pages/GalleryDynamic";
// import ReportsFinancials from "./pages/ReportsFinancials";
import ReportsFinancialsDynamic from "./pages/ReportsFinancialsDynamic";
import PartnersJoinDynamic from "./pages/PartnersJoinDynamic";
// import PartnerInstitutions from "./pages/PartnerInstitutions";
// import PartnerInstitutionsInfo from "./pages/PartnerInstitutionsInfo";
import PartnerInstitutionsDynamic from "./pages/PartnerInstitutionsDynamic";
import PartnerInstitutionsInfoDynamic from "./pages/PartnerInstitutionsInfoDynamic";
import GlobalPartners from "./pages/GlobalPartners";
// import GlobalPartnersInfo from "./pages/GlobalPartnersInfo";
import GlobalPartnersDynamic from "./pages/GlobalPartnersDynamic";
import TeachersTraining from "./pages/TeachersTraining";
import SkillsTraining from "./pages/SkillsTraining";
import SoftSkillTraining from "./pages/SoftSkillTraining";
import TechnicalSkillTraining from "./pages/TechnicalSkillTraining";
import AdultEducation from "./pages/AdultEducation";
import GlobalEducation from "./pages/GlobalEducation";
// import ElementaryMiddleSchool from "./pages/ElementaryMiddleSchool";
import ElementaryMiddleSchoolDynamic from "./pages/ElementaryMiddleSchoolDynamic";
// import SlumChildren from "./pages/SlumChildren";
// import PublicGovernmentSchool from "./pages/PublicGovernmentSchool";
import GirlsEducation from "./pages/GirlsEducation";
import OutOfSchoolDropout from "./pages/OutOfSchoolDropout";
import Madrasa from "./pages/Madrasa";
import NeiUsaIntroductionDynamic from "./pages/NeiUsaIntroductionDynamic";
import Login from './pages/Login';
// import Career from './pages/Career';
import CareerDynamic from './pages/CareerDynamic';
import Donate from './pages/Donate';
import DonationForm from './pages/DonationForm';
import Courses from './pages/Courses';
import ApplyCourse from './pages/ApplyCourse';
import ApplyCourseInstitution from './pages/ApplyCourseInstitution';
import AdminDashboard from './pages/dashboards/adminDashboard/AdminDashboard';
import EditCoursePage from './pages/dashboards/adminDashboard/EditCoursePage';
import ScrollToTop from './utils/ScrollToTop';
import BeAPartner from './pages/BeAPartner.jsx';
import Volunteer from './pages/Volunteer';
import { useEffect } from 'react';
import LeadershipDynamic from './pages/LeadershipDynamic.jsx';
import BioDynamic from './pages/BioDynamic.jsx';
import ContactDynamic from './pages/ContactDynamic.jsx';
import IntroductionDynamic from './pages/IntroductionDynamic.jsx';
import PartneringInstitutionDynamic from './pages/PartneringInstitutionDynamic.jsx';
import SlumChildrenDynamic from './pages/SlumChildrenDynamic.jsx';
import PublicGovernmentSchoolDynamic from './pages/PublicGovernmentSchoolDynamic.jsx';
import SoftSkillTrainingDynamic from './pages/SoftSkillTrainingDynamic.jsx';
import GirlsEducationDynamic from './pages/GirlsEducationDynamic.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import TechnicalSkillTrainingDynamic from './pages/TechnicalSkillTrainingDynamic.jsx';
import OutOfSchoolDropoutDynamic from './pages/OutOfSchoolDropoutDynamic.jsx';
import MadrasaDynamic from './pages/MadrasaDynamic.jsx';
import AdultEducationDynamic from './pages/AdultEducationDynamic.jsx';
import TeachersTrainingDynamic from './pages/TeachersTrainingDynamic.jsx';
import GlobalEducationDynamic from './pages/GlobalEducationDynamic.jsx';
import PrivacyPolicyDynamic from './pages/PrivacyPolicyDynamic.jsx';
import BeAPartnerDynamic from './pages/BeAPartnerDynamic.jsx';
import SearchResults from './pages/SearchResults.jsx';
import NewsDynamic from './pages/NewsDynamic';
const queryClient = new QueryClient();

function AppContent() {
  useEffect(() => {
    const hostname = window.location.hostname;
    const port = window.location.port;
    const baseTitle = "NEIEA";

    if (hostname === "localhost") {
      document.title = `${baseTitle}-Localhost:${port}`;
    }
  }, []);

  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isAdminRoute = location.pathname.startsWith('/admin/');

  return (
    <div className={`App ${isHomePage ? 'home' : ''}`}>
      {!isAdminRoute && <Header />}
      <main>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<HomeDynamic />} />

          {/* About Us Routes */}
          {/* <Route path="/about-us/introduction" element={<Introduction />} /> */}
          <Route path="/about-us/introduction" element={<IntroductionDynamic />} />
          <Route path="/about-us/leadership" element={<LeadershipDynamic />} />
          <Route path="/about-us/leadership/bio/:memberName" element={<BioDynamic />} />
          {/* <Route path="/about-us/leadership" element={<Leadership />} />
          <Route path="/about-us/leadership/bio/:memberName" element={<Bio />} /> */}
          {/* <Route path="/about-us/testimonials" element={<Testimonials />} /> */}
          <Route path="/about-us/testimonials" element={<TestimonialsDynamic />} />
          {/* <Route path="/about-us/contact" element={<Contact />} /> */}
          <Route path="/about-us/contact" element={<ContactDynamic />} />

          {/* Working Model Routes */}
          <Route path="/about-us/working-model/blended-learning" element={<BlendedLearningDynamic />} />
          {/* <Route path="/about-us/working-model/blended-learning/discourse-oriented-pedagogy" element={<DiscourseOrientedPedagogy />} /> */}
          <Route path="/about-us/working-model/blended-learning/discourse-oriented-pedagogy" element={<DiscourseOrientedPedagogyDynamic />} />
          <Route path="/about-us/working-model/blended-learning/application-of-technology" element={<ApplicationOfTechnologyDynamic />} />
          <Route path="/about-us/working-model/partnering-institutions" element={<PartneringInstitutionDynamic />} />
          <Route path="/about-us/working-model/remote-learning" element={<RemoteLearningDynamic />} />

          {/* Media and Events */}
          <Route path="/about-us/media-events/gallery" element={<GalleryDynamic />} />
          {/* <Route path="/about-us/media-events/gallery" element={<Gallery />} /> */}
          {/* <Route path="/about-us/reports-financials" element={<ReportsFinancials />} /> */}
          <Route path="/about-us/reports-financials" element={<ReportsFinancialsDynamic />} />

          {/* Our Work Routes */}
          {/* <Route path="/our-works/teachers-training" element={<TeachersTraining />} /> */}
          <Route path="/our-works/teachers-training" element={<TeachersTrainingDynamic />} />
          <Route path="/our-works/skills-training" element={<SkillsTraining />} />
          {/* <Route path="/our-works/skills-training/soft-skills" element={<SoftSkillTraining />} /> */}
          <Route path="/our-works/skills-training/soft-skills" element={<SoftSkillTrainingDynamic />} />
          {/* <Route path="/our-works/skills-training/technical-skills" element={<TechnicalSkillTraining />} /> */}
          <Route path="/our-works/skills-training/technical-skills" element={<TechnicalSkillTrainingDynamic />} />
          {/* <Route path="/our-works/adult-education" element={<AdultEducation />} /> */}
          <Route path="/our-works/adult-education" element={<AdultEducationDynamic />} />
          {/* <Route path="/our-works/global-education" element={<GlobalEducation />} /> */}
          <Route path="/our-works/global-education" element={<GlobalEducationDynamic />} />

          {/* Education Routes */}
          {/* <Route path="/our-works/education/elementary-middle-school" element={<ElementaryMiddleSchool />} /> */}
          <Route path="/our-works/education/elementary-middle-school" element={<ElementaryMiddleSchoolDynamic />} />
          {/* <Route path="/our-works/education/slum-children" element={<SlumChildren />} /> */}
          <Route path="/our-works/education/slum-children" element={<SlumChildrenDynamic />} />
          {/* <Route path="/our-works/education/public-government-school" element={<PublicGovernmentSchool />} /> */}
          <Route path="/our-works/education/public-government-school" element={<PublicGovernmentSchoolDynamic />} />
          {/* <Route path="/our-works/education/girls-education" element={<GirlsEducation />} /> */}
          <Route path="/our-works/education/girls-education" element={<GirlsEducationDynamic />} />
          {/* <Route path="/our-works/education/out-of-school-dropout" element={<OutOfSchoolDropout />} /> */}
          <Route path="/our-works/education/out-of-school-dropout" element={<OutOfSchoolDropoutDynamic />} />
          {/* <Route path="/our-works/education/madrasa" element={<Madrasa />} /> */}
          <Route path="/our-works/education/madrasa" element={<MadrasaDynamic />} />



          {/* Partners Routes */}
          <Route path="/partners/join" element={<PartnersJoinDynamic />} />
          {/* Static versions - kept for reference */}
          {/* <Route path="/partners/institutions" element={<PartnerInstitutions />} /> */}
          {/* <Route path="/partners/institutions/:institutionSlug" element={<PartnerInstitutionsInfo />} /> */}
          {/* Dynamic versions - fetching from API */}
          <Route path="/partners/institutions" element={<PartnerInstitutionsDynamic />} />
          <Route path="/partners/institutions/:institutionSlug" element={<PartnerInstitutionsInfoDynamic />} />
          <Route path="/partners/global" element={<GlobalPartners />} />
          <Route path="/partners/global/:partnerSlug" element={<GlobalPartnersDynamic />} />
          <Route path="/donation/volunteer" element={<Volunteer />} />


          {/* NEI USA Routes */}
          <Route path="/nei-usa/introduction" element={<NeiUsaIntroductionDynamic />} />

          <Route path="/login" element={<Login />} />
          {/* <Route path="/career" element={<Career />} /> */}
          <Route path="/career" element={<CareerDynamic />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/donation/form" element={<DonationForm />} />
          {/* <Route path="/donation/be-partner" element={<BeAPartner />} /> */}
          <Route path="/donation/be-partner" element={<BeAPartnerDynamic />} />
          <Route path="/courses/:category" element={<Courses />} />
          <Route path="/apply-course/:id" element={<ApplyCourse />} />
          <Route path="/apply-course-institution" element={<ApplyCourseInstitution />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/dashboard/course/edit/:id" element={<EditCoursePage />} />
          {/* <Route path="/privacy-policy" element={<PrivacyPolicy />} /> */}
          <Route path="/privacy-policy" element={<PrivacyPolicyDynamic />} />

          <Route path="/news" element={<NewsDynamic />} />

          {/* Search Route */}
          <Route path="/search" element={<SearchResults />} />

          <Route path="*" element={<HomeDynamic />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner richColors position="top-center" />
        <Router>
          <ScrollToTop />
          <AppContent />
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

