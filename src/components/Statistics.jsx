import React, { useState, useEffect, useRef } from 'react';

const Statistics = () => {
  const [counters, setCounters] = useState({
    statOne: 0,
    statTwo: 0,
    statThree: 0,
    statFour: 0,
    statFive: 0,
    statSix: 0,
    statSeven: 0,
    statEight: 0
  });

  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef(null);

  const targetValues = {
    statOne: 16,
    statTwo: 68,
    statThree: 87,
    statFour: 2197,
    statFive: 6361,
    statSix: 12659,
    statSeven: 18942,
    statEight: 500000
  };

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
            <h2 className="section-title">IMPACT & ACHIEVEMENTS</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <div className="hs-cont">
              <h4>
                <span id="home-stat-one" style={{display: 'none'}}>16</span>
                <span className="home-stat-one">{counters.statOne}</span>+
              </h4>
              <p>Online Courses</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="hs-cont">
              <h4>
                <span id="home-stat-two" style={{display: 'none'}}>68</span>
                <span className="home-stat-two">{counters.statTwo}</span>+
              </h4>
              <p>Live Online Classes</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="hs-cont">
              <h4>
                <span id="home-stat-three" style={{display: 'none'}}>87</span>
                <span className="home-stat-three">{counters.statThree}</span>+
              </h4>
              <p>Partnerships</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="hs-cont">
              <h4>
                <span id="home-stat-four" style={{display: 'none'}}>2197</span>
                <span className="home-stat-four">{counters.statFour.toLocaleString()}</span>+
              </h4>
              <p>Teachers Trained</p>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-3 col-md-4 col-sm-6">
            <div className="hs-cont">
              <h4>
                <span id="home-stat-seven" style={{display: 'none'}}>18942</span>
                <span className="home-stat-seven">{counters.statSeven.toLocaleString()}</span>+
              </h4>
              <p>Learner Empowered</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6">
            <div className="hs-cont">
              <h4>
                <span id="home-stat-eight" style={{display: 'none'}}>500000</span>
                <span className="home-stat-eight">{counters.statEight.toLocaleString()}</span>+
              </h4>
              <p>Indirectly Empowered</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;