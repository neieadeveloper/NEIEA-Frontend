import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Navigation from "./components/Navigation";
import Testimonials from "./pages/Testimonials";
import Leadership from "./pages/Leadership";
import Gallery from "./pages/Gallery";
import PartnerInstitutions from "./pages/PartnerInstitutions";
import PartneringInstitutionsPageManager from "./pages/PartneringInstitutions";
import GlobalPartners from "./pages/GlobalPartners";
import Career from "./pages/Career";
import Contact from "./pages/Contact";
import Introduction from "./pages/Introduction";
import RemoteLearning from "./pages/RemoteLearning";
import BlendedLearning from "./pages/BlendedLearning";
import DiscourseOrientedPedagogy from "./pages/DiscourseOrientedPedagogy";
import ApplicationOfTechnology from "./pages/ApplicationOfTechnology";
import ReportsFinancials from "./pages/ReportsFinancials";
import Home from "./pages/Home";
import ElementaryMiddleSchool from "./pages/ElementaryMiddleSchool";
import AdultEducation from "./pages/AdultEducation";
import SlumChildren from "./pages/SlumChildren";
import PublicGovernmentSchool from "./pages/PublicGovernmentSchool";
import GlobalEducation from "./pages/GlobalEducation";
import NeiUsaIntroduction from "./pages/NeiUsaIntroduction";
import SoftSkillTraining from "./pages/SoftSkillTraining";
import TechnicalSkillTraining from "./pages/TechnicalSkillTraining";
import GirlsEducation from "./pages/GirlsEducation";
import PartnersJoin from "./pages/PartnersJoin";
import Madrasa from "./pages/Madrasa";
import OutOfSchoolDropout from "./pages/OutOfSchoolDropout";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TeachersTraining from "./pages/TeachersTraining";
import BeAPartner from "./pages/BeAPartner";
import { useState } from "react";

const Index = () => {
  const [selectedPage, setSelectedPage] = useState<string | null>(null);

  const handlePageSelect = (pagePath: string) => {
    setSelectedPage(pagePath);
  };

  const renderSelectedPage = () => {
    try {
      switch (selectedPage) {
        case '/admin/dashboard/manage-website-pages/home':
          return <Home />;
        case '/about-us/testimonials':
          return <Testimonials />;
        case '/about-us/leadership':
          return <Leadership />;
        case '/about-us/media-events/gallery':
          return <Gallery />;
        case '/partners/institutions':
          return <PartnerInstitutions />;
        case '/about-us/working-model/partnering-institutions':
          return <PartneringInstitutionsPageManager />;
        case '/partners/global':
          return <GlobalPartners />;
        case '/partners/join':
          return <PartnersJoin />;
        case '/career':
          return <Career />;
        case '/about-us/contact':
          return <Contact />;
        case '/about-us/introduction':
          return <Introduction />;
        case '/about-us/working-model/remote-learning':
          return <RemoteLearning />;
        case '/about-us/working-model/blended-learning':
          return <BlendedLearning />;
        case '/about-us/working-model/blended-learning/discourse-oriented-pedagogy':
          return <DiscourseOrientedPedagogy />;
        case '/about-us/working-model/blended-learning/application-of-technology':
          return <ApplicationOfTechnology />;
        case '/our-works/education/elementary-middle-school':
          return <ElementaryMiddleSchool />;
        case '/our-works/education/adult-education':
          return <AdultEducation />;
        case '/our-works/education/slum-children':
          return <SlumChildren />;
        case '/our-works/education/public-government-school':
          return <PublicGovernmentSchool />;
        case '/our-works/global-education':
          return <GlobalEducation />;
        case '/our-works/education/out-of-school-dropout':
          return <OutOfSchoolDropout />;
        case '/our-works/skills-training/soft-skills':
          return <SoftSkillTraining />;
        case '/our-works/skills-training/technical-skills':
          return <TechnicalSkillTraining />;
        case '/our-works/teachers-training':
          return <TeachersTraining />;
        case '/our-works/education/girls-education':
          return <GirlsEducation />;
        case '/our-works/education/madrasa':
          return <Madrasa />;
        case '/about-us/reports-financials':
          return <ReportsFinancials />;
        case '/admin/dashboard/manage-website-pages/nei-usa-introduction':
          return <NeiUsaIntroduction />;
        case '/other/privacy-policy':
          return <PrivacyPolicy />;
        case '/donation/be-partner':
          return <BeAPartner />;
        
        default:
          return (
            <div className="text-center py-8 text-gray-500 h-[100vh]">
              Choose a page from the navigation menu to start managing its content
              {selectedPage && <div className="mt-2 text-sm">Selected: {selectedPage}</div>}
            </div>
          );
      }
    } catch (error) {
      console.error('Error rendering selected page:', error);
      return (
        <div className="text-center py-8 text-red-500">
          <h3 className="text-xl font-semibold mb-2">Error Loading Page</h3>
          <p>{(error as Error).message}</p>
        </div>
      );
    }
  };

  return (
    <div className="h-full">
      <Card className="border-0 shadow-none rounded-none">
        <CardHeader>
          <CardTitle data-scroll-target="website-pages" className="text-xl">Manage Website Pages</CardTitle>
          <CardDescription>
            Select a page from the navigation above to manage its content
          </CardDescription>
        </CardHeader>
        <Navigation onPageSelect={handlePageSelect} />
        <CardContent>
            <div className="">
                {renderSelectedPage()}
            </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
