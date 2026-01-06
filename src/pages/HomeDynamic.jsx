import React, { useState, useEffect } from 'react';
import axiosInstance from '../lib/axiosInstance';
import Banner from '../components/HomeDynamicComponents/Banner';
import OurMission from '../components/HomeDynamicComponents/OurMission';
import SocialEmbed from '../components/HomeDynamicComponents/SocialEmbed';
import VideoSection from '../components/HomeDynamicComponents/VideoSection';
import GlobalPrograms from '../components/HomeDynamicComponents/GlobalPrograms';
import Statistics from '../components/HomeDynamicComponents/Statistics';
import Testimonials from '../components/HomeDynamicComponents/Testimonials';

const HomeDynamic = () => {
  const [homePageData, setHomePageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [socialEmbeds, setSocialEmbeds] = useState([]);
  const [embedsLoading, setEmbedsLoading] = useState(false);

  useEffect(() => {
    fetchHomePageData();
    fetchSocialEmbeds();
  }, []);

  const fetchHomePageData = async () => {
    try {
      setLoading(true);
      setError(null); // Clear any previous errors
      const response = await axiosInstance.get('/homepage');
      
      console.log('Homepage API Response:', response.data);
      
      if (response.data.success) {
        console.log('Homepage data received:', response.data.data);
        setHomePageData(response.data.data);
      } else {
        console.log('API returned success: false', response.data);
        setError(`API Error: ${response.data.message || 'Failed to load homepage data'}`);
      }
    } catch (err) {
      console.error('Error fetching homepage data:', err);
      console.error('Error response:', err.response?.data);
      setError(`Network Error: ${err.response?.data?.message || err.message || 'Failed to load homepage data'}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchSocialEmbeds = async () => {
    try {
      setEmbedsLoading(true);
      const response = await axiosInstance.get('/social-embeds', {
        params: { page: 'home', isActive: true },
      });

      if (response.data.success && Array.isArray(response.data.data)) {
        setSocialEmbeds(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching social embeds:', err);
    } finally {
      setEmbedsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !homePageData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Unable to Load Homepage</h2>
          <p className="text-gray-600 mb-4">{error || 'No homepage data available'}</p>
          <div className="space-y-2">
            <button 
              onClick={fetchHomePageData}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
            >
              Retry
            </button>
            <p className="text-sm text-gray-500">
              If this persists, please check that homepage data has been saved in the admin panel.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="home">
      <Banner data={homePageData.banner} />
      <OurMission data={homePageData.ourMission} />
      {!embedsLoading && <SocialEmbed embeds={socialEmbeds} />}
      <VideoSection data={homePageData.innovationSection} />
      <GlobalPrograms data={homePageData.globalPrograms} />
      <Statistics data={homePageData.statistics} />
      <Testimonials data={homePageData.testimonials} />
    </div>
  );
};

export default HomeDynamic;
