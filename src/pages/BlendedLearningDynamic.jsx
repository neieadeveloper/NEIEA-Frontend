import React, { useState, useEffect } from 'react';
import PageTemplate from '../components/PageTemplate';
import axiosInstance from '../lib/axiosInstance';
import './BlendedLearningDynamic.css';

const BlendedLearningDynamic = () => {
  const [pageData, setPageData] = useState({
    headerSection: {
      title: "NEIEA'S BLENDED LEARNING MODEL",
      shortDescription: "",
      headerImage: "/assets/images/BlendedLearningModel/1.png",
      headerVideoUrl: ""
    },
    overviewSection: {
      title: "NEIEA'S BLENDED LEARNING MODEL",
      description: "Loading...",
      supportingImage: "/assets/images/BlendedLearningModel/2.png"
    }
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlendedLearningData();
  }, []);

  const fetchBlendedLearningData = async () => {
    try {
      const response = await axiosInstance.get('/blended-learning-page');
      if (response.data.success && response.data.data) {
        const data = response.data.data;
        console.log('Fetched Blended Learning Data:', data);
        console.log('Header Video URL:', data.headerSection?.headerVideoUrl);
        // Convert paragraphs to description if it exists (backward compatibility)
        if (data.overviewSection.paragraphs && !data.overviewSection.description) {
          data.overviewSection.description = data.overviewSection.paragraphs.join('\n\n');
        }
        setPageData(data);
      }
    } catch (error) {
      console.error('Error fetching blended learning data:', error);
      // Keep default values on error
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <PageTemplate
      breadcrumbPath={[
        { name: "Our Working Model", link: null },
        { name: "Blended Learning Model", link: null }
      ]}
      title={pageData.headerSection.title}
      subtitle=""
      description={pageData.headerSection.shortDescription}
      heroImage={pageData.headerSection.headerImage}
      heroVideoUrl={pageData.headerSection.headerVideoUrl}
    >
      {/* Main Content with First Image on the Right */}
      <div className="container">
        <div className="row mb-5 align-items-center">
          <div className="col-md-6">
            <h2 className="blended-learning-title">
              {pageData.overviewSection.title}
            </h2>
            <div
              className="blended-learning-content"
              dangerouslySetInnerHTML={{ __html: pageData.overviewSection.description.replace(/\n\n/g, '</p><p style="margin-bottom: 20px;">') }}
            />
          </div>

          <div className="col-md-6 blended-learning-image-container">
            <img
              src={pageData.overviewSection.supportingImage}
              alt="Blended Learning Model"
              className="img-fluid blended-learning-image"
            />
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default BlendedLearningDynamic;
