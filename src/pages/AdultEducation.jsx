import React from 'react';
import PageTemplate from '../components/PageTemplate';

// Data structure for dynamic content management
const adultEducationData = {
  introduction: {
    title: "Adult Literacy at NEIEA: Transforming Lives Through Learning",
    subtitle: "It's Never Too Late to Learn",
    description: "At NEIEA, we believe learning has no age limit. Our Adult Literacy Programs are designed to help learners grow in education, work, and everyday life.",
    heroImage: "/assets/images/AdultEducation/2.png",
    content: "At the <strong>New Equitable and Innovative Educational Association (NEIEA)</strong>, we believe learning has no age limit. For many marginalized adults, the opportunity to read, write, or build essential life skills was never given. Our <strong>Adult Literacy Programs</strong> are designed to change that—helping learners grow in education, work, and everyday life. Literacy for adults is not just about letters; it is about confidence, independence, and dignity."
  },
  whyItMatters: {
    title: "Why Adult Literacy Matters",
    image: "/assets/images/AdultEducation/1.png",
    content: "Illiteracy keeps adults trapped in cycles of poverty and exclusion. Without basic literacy, individuals often struggle to find employment, manage healthcare, or support their children's schooling. At NEIEA, we see adult literacy as a path to renewal—empowering individuals while uplifting entire families and communities."
  },
  learningModel: {
    title: "Our Innovative Blended Learning Model",
    description: "NEIEA's <strong>blended learning approach</strong> makes education flexible, affordable, and accessible:",
    features: [
      {
        title: "Digital Learning Made Simple",
        description: "Learners use smartphones or digital hubs to access beginner-friendly modules."
      },
      {
        title: "Community Support",
        description: "On-site mentors provide encouragement and hands-on guidance."
      },
      {
        title: "Culturally Relevant & Practical",
        description: "Lessons connect directly with everyday needs—whether reading medicine labels, managing digital payments, or communicating in English."
      }
    ]
  },
  focusAreas: {
    title: "Focus Areas of Adult Literacy at NEIEA",
    areas: [
      {
        id: 1,
        title: "Adult English Literacy",
        skills: [
          "Learn to read and write simple English",
          "Speak and understand basic conversations",
          "Practice listening and responding in daily situations",
          "Build a foundation for advanced English learning"
        ],
        outcome: "Adults gain confidence to communicate at home, work, and in the community."
      },
      {
        id: 2,
        title: "Adult Digital Literacy",
        skills: [
          "Use Microsoft Word, Excel, PowerPoint",
          "Work with Google Docs, Sheets, Slides, Forms, and Classroom",
          "Create designs with Canva",
          "Explore AI tools like ChatGPT"
        ],
        outcome: "Learners master practical digital skills for jobs, education, and daily life."
      },
      {
        id: 3,
        title: "Adult Financial Literacy",
        skills: [
          "Basics of saving, budgeting, and banking",
          "Safe use of digital payments and UPI",
          "Manage personal and household finances",
          "Introduction to entrepreneurship"
        ],
        outcome: "Adults achieve financial independence and plan for a secure future."
      }
    ]
  },
  whyNeiea: {
    title: "Why NEIEA?",
    benefits: [
      "Beginner-friendly, step-by-step learning",
      "Flexible online classes accessible from home",
      "Affordable and inclusive, especially for underserved communities",
      "Supportive environment with real-life applications"
    ]
  },
  movement: {
    title: "A Movement of Renewal",
    content: "For NEIEA, adult literacy is not a remedial effort—it is a <strong>movement of renewal and equity</strong>. Every adult who learns to read, write, or manage technology not only transforms their own life but also inspires their children and strengthens their community.",
    callToAction: "When an adult learns, an entire community rises. Together—with the support of charities, trusts, and partners—we can ensure that <strong>no adult is left behind in the journey of learning</strong>."
  }
};

const AdultEducation = () => {
  return (
    <PageTemplate
      breadcrumbPath={[
        { name: "Our Work", link: null },
        { name: "Adult Education", link: null }
      ]}
      title={adultEducationData.introduction.title}
      subtitle={adultEducationData.introduction.subtitle}
      description={adultEducationData.introduction.description}
      heroImage={adultEducationData.introduction.heroImage}
    >
      {/* Introduction Section */}
      <section className="mb-6 lg:mb-8 sm:mb-0">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-gray-700 text-lg leading-relaxed text-justify" dangerouslySetInnerHTML={{ __html: adultEducationData.introduction.content }}>
          </p>
        </div>
      </section>

      {/* Why Adult Literacy Matters */}
      <section className="mb-6 lg:mb-12 sm:mb-0">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8">
            <div className="flex-1">
              <img 
                src={adultEducationData.whyItMatters.image}
                alt="Adult Literacy Program" 
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl lg:text-3xl font-semibold text-[#06038F] mb-3 lg:mb-6 text-center">
                {adultEducationData.whyItMatters.title}
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed text-justify">
                {adultEducationData.whyItMatters.content}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Model */}
      <section className="mb-6 lg:mb-12 sm:mb-0">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-semibold text-[#06038F] mb-3 lg:mb-8 text-center">
            {adultEducationData.learningModel.title}
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed text-justify mb-4 lg:mb-8" dangerouslySetInnerHTML={{ __html: adultEducationData.learningModel.description }}>
          </p>
          <div className="space-y-3 lg:space-y-6">
            {adultEducationData.learningModel.features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3 p-3 lg:p-6 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-[#06038F] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-base lg:text-lg">{index + 1}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg lg:text-xl font-semibold text-[#06038F] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-sm lg:text-base">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="mb-6 lg:mb-12 sm:mb-0">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-semibold text-[#06038F] mb-4 lg:mb-8 text-center">
            {adultEducationData.focusAreas.title}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
            {adultEducationData.focusAreas.areas.map((area) => (
              <div key={area.id} className="bg-white border border-gray-200 rounded-lg p-3 lg:p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
                <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2 lg:mb-4">
                  {area.id}. {area.title}
                </h3>
                <ul className="space-y-2 mb-3 lg:mb-6 flex-grow">
                  {area.skills.map((skill, index) => (
                    <li key={index} className="text-gray-700 flex items-center text-sm lg:text-base">
                      <span className="text-[#06038F] mr-2 flex-shrink-0">•</span>
                      <span className="lg:flex lg:items-start lg:mt-1">{skill}</span>
                    </li>
                  ))}
                </ul>
                <div className="bg-[#06038F] bg-opacity-10 p-3 lg:p-4 rounded-lg mt-auto min-h-[70px] lg:min-h-[80px] flex items-center">
                  <p className="text-[#06038F] font-medium italic text-sm lg:text-base">
                    <strong>Outcome:</strong> {area.outcome}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why NEIEA */}
      <section className="mb-6 lg:mb-12 sm:mb-0">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-semibold text-[#06038F] mb-4 lg:mb-8 text-center">
            {adultEducationData.whyNeiea.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-6">
            {adultEducationData.whyNeiea.benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3 p-3 lg:p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 w-5 h-5 lg:w-6 lg:h-6 bg-[#06038F] rounded-full flex items-center justify-center">
                  <span className="text-white text-xs lg:text-sm font-bold">✓</span>
                </div>
                <p className="text-gray-700 leading-relaxed text-sm lg:text-base" dangerouslySetInnerHTML={{ __html: benefit }}></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Movement of Renewal */}
      <section className="mb-6 lg:mb-12 sm:mb-0">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-semibold text-[#06038F] mb-4 lg:mb-8 text-center">
            {adultEducationData.movement.title}
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed text-justify mb-4 lg:mb-8" dangerouslySetInnerHTML={{ __html: adultEducationData.movement.content }}>
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 lg:p-8 text-start">
            <p className="text-base lg:text-lg text-gray-700 leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: adultEducationData.movement.callToAction }}>
            </p>
          </div>
        </div>
      </section>
    </PageTemplate>
  );
};

export default AdultEducation;
