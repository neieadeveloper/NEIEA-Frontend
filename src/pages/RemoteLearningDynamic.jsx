import React, { useEffect, useState } from 'react';
import PageTemplate from '../components/PageTemplate';
import axiosInstance from '../lib/axiosInstance';

const defaultPageData = {
  headerSection: {
    title: 'Remote Individual Learning',
    subtitle: 'Online education model for individual learners',
    headerImage: '/assets/images/remoteIndividualLearning.png'
  },
  overviewSection: {
    title: 'Online Education Model for Individual Learners',
    description:
      "NEIEA's Online Education Model is a learner-centric framework that empowers individuals to access courses independently using their own digital devices—smartphone, laptop, or tablet. Designed to transcend geographical boundaries, it enables students to learn anytime, anywhere, with direct access to expert instruction and high-quality resources.\n\nBy integrating linguistic, academic, and technical education, this model creates a holistic, inclusive, and transformative learning ecosystem. It equips learners not only with academic excellence but also with the critical skills needed to thrive in today's knowledge-driven global economy."
  },
  coursesOfferedSection: {
    title: 'Courses Offered:',
    courses: [
      {
        icon: '🗣️',
        title: 'English Language Programs',
        description:
          'From beginner and foundational levels for first-time learners to advanced modules that refine fluency, confidence, and communication skills.'
      },
      {
        icon: '🧮',
        title: 'Mathematics & Science Foundations',
        description:
          'Strengthening conceptual clarity, problem-solving, and critical thinking across different age groups.'
      },
      {
        icon: '💻',
        title: 'Technical & Digital Literacy',
        description:
          'Practical training in Google Workspace, Microsoft Office Suite, and other essential tools for academic, professional, and entrepreneurial growth.'
      }
    ]
  },
  pedagogicalApproachSection: {
    title: 'Pedagogical Approach:',
    approaches: [
      {
        icon: '🎥',
        title: 'Live Interactive Sessions',
        description:
          'Led by expert mentors, fostering real-time dialogue, collaboration, and personalized support.'
      },
      {
        icon: '📚',
        title: 'Digital Resources & Assignments',
        description: 'Available anytime for flexible, self-paced learning.'
      },
      {
        icon: '📋',
        title: 'Assessments & Feedback',
        description:
          'Continuous evaluation ensures measurable progress and tailored guidance.'
      }
    ]
  },
  transformativeLearningSection: {
    title: 'Transformative Learning Ecosystem',
    description:
      "By integrating linguistic, academic, and technical education, this model creates a holistic, inclusive, and transformative learning ecosystem. It equips learners not only with academic excellence but also with the critical skills needed to thrive in today's knowledge-driven global economy."
  },
  callToActionSection: {
    title: 'Ready to Start Your Individual Learning Journey?',
    description:
      "Join NEIEA's learner-centric online education model and access courses independently using your own digital device. Learn anytime, anywhere with expert instruction.",
    buttonText: 'Start Learning Today',
    buttonLink: '/about-us/contact'
  }
};

const RemoteLearningDynamic = () => {
  const [pageData, setPageData] = useState(defaultPageData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRemoteLearningData = async () => {
      try {
        const response = await axiosInstance.get('/remote-learning-page');

        if (response.data?.success && response.data?.data) {
          const data = response.data.data;

          const sortedCourses = Array.isArray(data.coursesOfferedSection?.courses)
            ? [...data.coursesOfferedSection.courses].sort(
                (a, b) => (a.display_order ?? 0) - (b.display_order ?? 0)
              )
            : [];

          const sortedApproaches = Array.isArray(data.pedagogicalApproachSection?.approaches)
            ? [...data.pedagogicalApproachSection.approaches].sort(
                (a, b) => (a.display_order ?? 0) - (b.display_order ?? 0)
              )
            : [];

          setPageData({
            headerSection: {
              ...defaultPageData.headerSection,
              ...data.headerSection,
              headerImage:
                data.headerSection?.headerImage || defaultPageData.headerSection.headerImage
            },
            overviewSection: {
              ...defaultPageData.overviewSection,
              ...data.overviewSection
            },
            coursesOfferedSection: {
              ...defaultPageData.coursesOfferedSection,
              ...data.coursesOfferedSection,
              courses: sortedCourses.length
                ? sortedCourses.map((course) => ({
                    icon: course.icon || '📘',
                    title: course.title || '',
                    description: course.description || ''
                  }))
                : defaultPageData.coursesOfferedSection.courses
            },
            pedagogicalApproachSection: {
              ...defaultPageData.pedagogicalApproachSection,
              ...data.pedagogicalApproachSection,
              approaches: sortedApproaches.length
                ? sortedApproaches.map((approach) => ({
                    icon: approach.icon || '📘',
                    title: approach.title || '',
                    description: approach.description || ''
                  }))
                : defaultPageData.pedagogicalApproachSection.approaches
            },
            transformativeLearningSection: {
              ...defaultPageData.transformativeLearningSection,
              ...data.transformativeLearningSection
            },
            callToActionSection: {
              ...defaultPageData.callToActionSection,
              ...data.callToActionSection
            }
          });
        }
      } catch (error) {
        console.error('Error fetching remote learning page data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRemoteLearningData();
  }, []);

  if (loading) {
    return (
      <div className="container" style={{ padding: '50px 0' }}>
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  const {
    headerSection,
    overviewSection,
    coursesOfferedSection,
    pedagogicalApproachSection,
    transformativeLearningSection,
    callToActionSection
  } = pageData;

  const renderParagraphs = (text) =>
    (text || '')
      .split(/\n+/)
      .filter((para) => para.trim().length)
      .map((paragraph, idx) => (
        <p
          key={idx}
          style={{
            fontSize: '18px',
            lineHeight: '1.6',
            color: '#2c3e50',
            marginBottom: idx === 0 ? '15px' : '0',
            textAlign: 'left',
            fontWeight: '400'
          }}
        >
          {paragraph.trim()}
        </p>
      ));

  return (
    <PageTemplate
      breadcrumbPath={[
        { name: 'Our Working Model', link: null },
        { name: 'Remote Individual Learning', link: null }
      ]}
      title={headerSection.title || defaultPageData.headerSection.title}
      subtitle={headerSection.subtitle || defaultPageData.headerSection.subtitle}
      description={''}
      heroImage={headerSection.headerImage || defaultPageData.headerSection.headerImage}
      heroVideoUrl={headerSection?.heroVideoUrl || ""}
    >
      {/* Overview Section */}
      <div className="row mb-4">
        <div className="col-lg-11 mx-auto">
          <div
            style={{
              backgroundColor: '#ffffff',
              padding: '25px',
              borderRadius: '12px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
              border: '1px solid #e9ecef'
            }}
          >
            <h2
              style={{
                fontSize: '28px',
                fontWeight: '700',
                color: '#212529',
                marginBottom: '15px',
                textAlign: 'center',
                lineHeight: '1.3'
              }}
            >
              {overviewSection.title || defaultPageData.overviewSection.title}
            </h2>
            <div
              style={{
                width: '60px',
                height: '3px',
                backgroundColor: '#06038F',
                margin: '0 auto 20px',
                borderRadius: '2px'
              }}
            ></div>
            {renderParagraphs(overviewSection.description || defaultPageData.overviewSection.description)}
          </div>
        </div>
      </div>

      {/* Pedagogical Approach Section */}
      <div className="row mb-4">
        <div className="col-12">
          <h2
            style={{
              fontSize: '30px',
              fontWeight: '700',
              color: '#212529',
              marginBottom: '25px',
              textAlign: 'center'
            }}
          >
            {pedagogicalApproachSection.title || defaultPageData.pedagogicalApproachSection.title}
          </h2>
        </div>
      </div>

      <div className="row g-3 mb-4">
        {pedagogicalApproachSection.approaches.map((approach, index) => (
          <div key={approach._id || index} className="col-lg-4">
            <div
              className="card h-100 border-0 shadow-sm"
              style={{
                borderRadius: '12px',
                padding: '20px',
                backgroundColor: '#ffffff',
                border: '1px solid #e9ecef',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                textAlign: 'center'
              }}
            >
              {/* <div
                style={{
                  fontSize: '50px',
                  marginBottom: '15px'
                }}
              >
                {approach.icon}
              </div> */}
              <h5
                style={{
                  color: '#212529',
                  fontWeight: '700',
                  marginBottom: '15px',
                  fontSize: '20px',
                  lineHeight: '1.3'
                }}
              >
                {approach.title}
              </h5>
              <p
                style={{
                  color: '#2c3e50',
                  lineHeight: '1.6',
                  margin: '0',
                  fontSize: '16px',
                  fontWeight: '400',
                  textAlign: 'left'
                }}
              >
                {approach.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Courses Offered Section */}
      <div className="row mb-4">
        <div className="col-12">
          <h2
            style={{
              fontSize: '30px',
              fontWeight: '700',
              color: '#212529',
              marginBottom: '25px',
              textAlign: 'center'
            }}
          >
            {coursesOfferedSection.title || defaultPageData.coursesOfferedSection.title}
          </h2>
        </div>
      </div>

      <div className="row g-3 mb-4">
        {coursesOfferedSection.courses.map((course, index) => (
          <div key={course._id || index} className="col-lg-4">
            <div
              className="card h-100 border-0 shadow-sm"
              style={{
                borderRadius: '12px',
                padding: '20px',
                backgroundColor: '#ffffff',
                border: '1px solid #e9ecef',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                textAlign: 'center'
              }}
            >
              {/* <div
                style={{
                  fontSize: '50px',
                  marginBottom: '15px'
                }}
              >
                {course.icon}
              </div> */}
              <h5
                style={{
                  color: '#212529',
                  fontWeight: '700',
                  marginBottom: '15px',
                  fontSize: '20px',
                  lineHeight: '1.3'
                }}
              >
                {course.title}
              </h5>
              <p
                style={{
                  color: '#2c3e50',
                  lineHeight: '1.6',
                  margin: '0',
                  fontSize: '16px',
                  fontWeight: '400',
                  textAlign: 'left'
                }}
              >
                {course.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Transformative Learning Section */}
      <div className="row mb-4">
        <div className="col-lg-11 mx-auto">
          <div
            style={{
              backgroundColor: '#06038F',
              color: 'white',
              padding: '25px',
              borderRadius: '12px',
              textAlign: 'center'
            }}
          >
            <h3
              style={{
                fontSize: '24px',
                fontWeight: '700',
                marginBottom: '15px',
                color: 'white'
              }}
            >
              {transformativeLearningSection.title || defaultPageData.transformativeLearningSection.title}
            </h3>
            <p
              style={{
                fontSize: '18px',
                lineHeight: '1.6',
                marginBottom: '0',
                maxWidth: '800px',
                margin: '0 auto',
                opacity: '0.95'
              }}
            >
              {transformativeLearningSection.description ||
                defaultPageData.transformativeLearningSection.description}
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="row">
        <div className="col-12">
          <div
            style={{
              backgroundColor: '#f8f9fa',
              padding: '25px',
              borderRadius: '12px',
              textAlign: 'center'
            }}
          >
            <h4
              style={{
                color: '#212529',
                fontWeight: '600',
                marginBottom: '15px'
              }}
            >
              {callToActionSection.title || defaultPageData.callToActionSection.title}
            </h4>
            <p
              style={{
                color: '#00000',
                marginBottom: '20px',
                fontSize: '16px',
                maxWidth: '600px',
                margin: '0 auto 20px'
              }}
            >
              {callToActionSection.description || defaultPageData.callToActionSection.description}
            </p>
            <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3">
              <a
                href={callToActionSection.buttonLink || defaultPageData.callToActionSection.buttonLink}
                className="btn btn-primary"
                style={{
                  backgroundColor: '#06038F',
                  borderColor: '#06038F',
                  padding: '12px 25px',
                  fontSize: '16px',
                  fontWeight: '600',
                  borderRadius: '25px',
                  textDecoration: 'none'
                }}
              >
                {callToActionSection.buttonText || defaultPageData.callToActionSection.buttonText}
              </a>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default RemoteLearningDynamic;

