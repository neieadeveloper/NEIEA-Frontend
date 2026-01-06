import React, { useState, useEffect, useRef } from 'react';
import axiosInstance from '../../lib/axiosInstance';

const defaultBackground = '/assets/images/Stats_Background.jpg';
const defaultStatistics = [
  { label: 'Online Courses', value: 16, suffix: '+' },
  { label: 'Live Online Classes', value: 68, suffix: '+' },
  { label: 'Partnerships', value: 87, suffix: '+' },
  { label: 'Teachers Trained', value: 2197, suffix: '+' },
  { label: 'Learner Empowered', value: 18942, suffix: '+' },
  { label: 'Indirectly Empowered', value: 500000, suffix: '+' },
];

const Statistics = () => {
  const [statisticsData, setStatisticsData] = useState({
    heading: 'IMPACT & ACHIEVEMENTS',
    backgroundImage: defaultBackground,
    statistics: defaultStatistics,
  });
  const [counters, setCounters] = useState(defaultStatistics.map(() => 0));

  const statsRef = useRef(null);
  const timersRef = useRef([]);
  const hasAnimatedRef = useRef(false);

  const animateCounters = () => {
    timersRef.current.forEach(clearInterval);
    timersRef.current = [];

    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    statisticsData.statistics.forEach((stat, index) => {
      const target = Number(stat.value) || 0;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }

        setCounters((prev) => {
          const next = [...prev];
          next[index] = Math.floor(current);
          return next;
        });
      }, stepDuration);

      timersRef.current.push(timer);
    });
  };

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axiosInstance.get('/homepage');
        const statsSection = response.data?.data?.statistics;

        if (response.data?.success && statsSection) {
          const normalizedStats = Array.isArray(statsSection.statistics)
            ? statsSection.statistics.map((item) => ({
                label: item.label || '',
                value: Number(item.value) || 0,
                suffix: item.suffix || '',
              }))
            : [];

          setStatisticsData({
            heading: statsSection.heading || 'IMPACT & ACHIEVEMENTS',
            backgroundImage: statsSection.backgroundImage || defaultBackground,
            statistics: normalizedStats.length > 0 ? normalizedStats : defaultStatistics,
          });
        }
      } catch (error) {
        console.error('Failed to load statistics section:', error);
      }
    };

    fetchStatistics();
  }, []);

  useEffect(() => {
    setCounters(new Array(statisticsData.statistics.length).fill(0));
    hasAnimatedRef.current = false;
  }, [statisticsData.statistics]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          animateCounters();
        }
      },
      { threshold: 0.5 }
    );

    const current = statsRef.current;

    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [statisticsData.statistics]);

  useEffect(() => {
    return () => {
      timersRef.current.forEach(clearInterval);
      timersRef.current = [];
    };
  }, []);

  const formatNumber = (value) => new Intl.NumberFormat('en-IN').format(value);

  const statsList = statisticsData.statistics || [];
  const backgroundImageUrl = statisticsData.backgroundImage || defaultBackground;

  return (
    <section className="home-stats p-fade-anim" ref={statsRef}>
      {backgroundImageUrl && (
        <div
          className="home-stats__background"
          style={{ backgroundImage: `url(${backgroundImageUrl})` }}
          aria-hidden="true"
        ></div>
      )}
      <div className="container">
        <div className="home-stats__header text-center">
          <h2 className="section-title">{statisticsData.heading}</h2>
        </div>

        <div className="home-stats__grid">
          {statsList.map((stat, index) => (
            <div className="home-stats__card" key={`${stat.label}-${index}`}>
              <div className="home-stats__value">
                {formatNumber(counters[index] || 0)}
                {stat.suffix || ''}
              </div>
              <div className="home-stats__label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;