import React from 'react';
import Banner from '../components/Banner';
import OurMission from '../components/OurMission';
import VideoSection from '../components/VideoSection';
import GlobalPrograms from '../components/GlobalPrograms';
import Statistics from '../components/Statistics';
import Testimonials from '../components/Testimonials';

const Home = () => {
  return (
    <div className="home">
      <Banner />
      <OurMission />
      <VideoSection />
      <GlobalPrograms />
      <Statistics />
      <Testimonials />
    </div>
  );
};

export default Home;
