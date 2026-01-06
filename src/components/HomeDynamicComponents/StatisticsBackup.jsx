import React, { useState, useEffect, useRef } from 'react';

const Statistics = ({ data }) => {
  // Use dynamic data if available, otherwise fallback to static data
  const statisticsData = data || {
    heading: "IMPACT & ACHIEVEMENTS",
    statistics: [
      { label: "Online Courses", value: 16, suffix: "+" },
      { label: "Partner Institutions", value: 68, suffix: "+" },
      { label: "Teachers Trained", value: 87, suffix: "+" },
      { label: "Students Enrolled", value: 2197, suffix: "+" },
      { label: "Live Sessions Conducted", value: 6361, suffix: "+" },
      { label: "Hours of Teaching", value: 12659, suffix: "+" },
      { label: "Students Benefited", value: 18942, suffix: "+" },
      { label: "Total Reach", value: 500000, suffix: "+" }
    ]
  };

  const [counters, setCounters] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef(null);

  // Initialize counters based on dynamic data
  useEffect(() => {
    const initialCounters = {};
    statisticsData.statistics.forEach((stat, index) => {
      initialCounters[`stat${index + 1}`] = 0;
    });
    setCounters(initialCounters);
  }, [statisticsData]);

  const targetValues = {};
  statisticsData.statistics.forEach((stat, index) => {
    targetValues[`stat${index + 1}`] = stat.value;
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          animateCounters();
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, [isVisible]);

  const animateCounters = () => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    Object.keys(targetValues).forEach((key) => {
      const target = targetValues[key];
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setCounters(prev => ({
          ...prev,
          [key]: Math.floor(current)
        }));
      }, stepDuration);
    });
  };

  // SAME COMPONENT FOR ALL SCREENS - Only CSS changes the layout
  return (
    <section className="home-stats p-fade-anim" ref={statsRef}>
      <div className="container">
        <div className="row">
          <div className="col-12 text-center mb-5">
            <h2 className="section-title">{statisticsData.heading}</h2>
          </div>
        </div>
        <div className="row">
          {statisticsData.statistics.slice(0, 4).map((stat, index) => (
            <div key={index} className="col-lg-3 col-md-6">
              <div className="hs-cont">
                <h4>
                  <span id={`home-stat-${index + 1}`} style={{display: 'none'}}>{stat.value}</span>
                  <span className={`home-stat-${index + 1}`}>
                    {stat.value > 1000 ? (counters[`stat${index + 1}`] || 0).toLocaleString() : (counters[`stat${index + 1}`] || 0)}
                  </span>{stat.suffix || ''}
                </h4>
                <p>{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
        {statisticsData.statistics.length > 4 && (
          <div className="row justify-content-center">
            {statisticsData.statistics.slice(4).map((stat, index) => (
              <div key={index + 4} className="col-lg-3 col-md-4 col-sm-6">
                <div className="hs-cont">
                  <h4>
                    <span id={`home-stat-${index + 5}`} style={{display: 'none'}}>{stat.value}</span>
                    <span className={`home-stat-${index + 5}`}>
                      {stat.value > 1000 ? (counters[`stat${index + 5}`] || 0).toLocaleString() : (counters[`stat${index + 5}`] || 0)}
                    </span>{stat.suffix || ''}
                  </h4>
                  <p>{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Statistics;