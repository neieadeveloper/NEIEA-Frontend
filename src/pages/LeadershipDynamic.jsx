import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLeadership } from '../hooks/useLeadership';
import PageTemplate from '../components/PageTemplate';

const LeadershipDynamic = () => {
  const [activeTab, setActiveTab] = useState('directors');
  const [hoveredMember, setHoveredMember] = useState(null);
  const navigate = useNavigate();
  const { leadershipMembers, heroSection, getMembersByCategory, loading, error } = useLeadership();

  const decodeHtmlEntities = (text) => {
    if (!text) return text;
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
  };

  // Loading state
  if (loading) {
    return (
      <PageTemplate 
        breadcrumbPath={[{ name: 'About' }, { name: 'Leadership' }]}
        title="Leadership"
        subtitle="Meet Our Team"
        description="Loading leadership information..."
        showHeroSection={false}
      >
        <div className="container py-5">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading leadership information...</p>
          </div>
        </div>
      </PageTemplate>
    );
  }

  // Error state
  if (error) {
    return (
      <PageTemplate 
        breadcrumbPath={[{ name: 'About' }, { name: 'Leadership' }]}
        title="Leadership"
        subtitle="Meet Our Team"
        description="Error loading leadership information"
        showHeroSection={false}
      >
        <div className="container py-5">
          <div className="text-center">
            <div className="alert alert-danger" role="alert">
              <h4 className="alert-heading">Error Loading Leadership</h4>
              <p>{error}</p>
              <hr />
              <p className="mb-0">Please try refreshing the page or contact support if the problem persists.</p>
            </div>
          </div>
        </div>
      </PageTemplate>
    );
  }

  const getCurrentMembers = () => {
    if (!leadershipMembers || !Array.isArray(leadershipMembers)) {
      return [];
    }
    return getMembersByCategory(activeTab);
  };

  const handleMemberClick = (member) => {
    if (member.slug) {
      navigate(`/about-us/leadership/bio/${member.slug}`);
    }
  };

  const handleViewBio = (member) => {
    const memberSlug = member.name.toLowerCase().replace(/\s+/g, '-').replace(/\./g, '');
    navigate(`/about-us/leadership/bio/${memberSlug}`);
  };
  
  const MemberCard = ({ member }) => (
    <div className="col-lg-3 col-md-6 mb-4">
      <div
        className="card h-100 border-0 shadow-sm"
        style={{
          borderRadius: "0px",
          overflow: "hidden",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          position: "relative",
          cursor: "pointer"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-10px)";
          e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.15)";
          setHoveredMember(member.name);
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.08)";
          setHoveredMember(null);
        }}
        onClick={() => handleMemberClick(member)}
      >
        <div
          style={{
            height: "280px",
            background: "#f8f9fa",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            position: "relative"
          }}
        >
          {member.image ? (
            <img
              src={member.image}
              alt={member.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : (
            <div 
              style={{
                width: "120px",
                height: "120px",
                backgroundColor: "#06038F",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "36px",
                fontWeight: "bold"
              }}
            >
              {member.name.charAt(0)}
            </div>
          )}
          
          {/* View Bio Overlay */}
          <div
            style={{
              opacity: hoveredMember === member.name ? 1 : 0,
              position: "absolute",
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              top: 0,
              left: 0,
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              alignItems: "center",
              color: "white",
              transition: "opacity .3s ease-in-out",
              fontSize: "18px",
              fontWeight: "500",
              lineHeight: "24px",
              zIndex: 1
            }}
          >
            View Bio 
            <svg 
              width="20" 
              height="20" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path 
                fillRule="evenodd" 
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" 
                clipRule="evenodd" 
              />
            </svg>
          </div>
        </div>
        
        <div className="card-body p-4">
          <h4
            style={{
              fontSize: "20px",
              fontWeight: "700",
              color: "#212529",
              marginBottom: "10px",
            }}
          >
            {member.name}
          </h4>
          <p
            style={{
              color: "#06038F",
              fontSize: "14px",
              lineHeight: "1.5",
              margin: "0",
            }}
          >
            {decodeHtmlEntities(member.title)}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="leadership-page">
      {/* Breadcrumb */}
      {/*
      <div className="container-fluid" style={{ backgroundColor: "#f8f9fa", padding: "10px 0" }}>
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0" style={{ backgroundColor: "transparent" }}>
              <li className="breadcrumb-item">
                <Link to="/" onClick={goHome} style={{ color: "#6c757d", textDecoration: "none" }}>
                  🏠 Home
                </Link>
              </li>
              <li className="breadcrumb-item">
                <span style={{ color: "#6c757d" }}>About</span>
              </li>
              <li className="breadcrumb-item active" aria-current="page" style={{ color: "#495057" }}>
                Board of Directors
              </li>
            </ol>
          </nav>
        </div>
      </div>
      */}

      {/* Hero Section */}
      <section style={{ backgroundColor: "#f8f9fa", paddingBottom: "40px" }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 style={{
                fontSize: "48px",
                fontWeight: "700",
                color: "#212529",
                marginBottom: "30px",
                lineHeight: "1.2",
              }}>
                {decodeHtmlEntities(heroSection?.title) || 'Meet Our Team'}
              </h1>
              <p style={{
                fontSize: "18px",
                lineHeight: "1.6",
                color: "#00000",
                marginBottom: "0",
              }}>
                {decodeHtmlEntities(heroSection?.description) || 'Meet our team of dedicated leaders at NEIEA, a passionate group committed to empowering communities through innovative education and skill-building programs. With diverse backgrounds in teaching, administration, technology, and outreach, our team brings extensive experience and vision to every project.'}
              </p>
            </div>
            <div className="col-lg-6">
              <div className="text-center">
                <img
                  src={heroSection?.heroImage || '/assets/images/banner-2.png'}
                  alt={decodeHtmlEntities(heroSection?.title) || 'Leadership Team'}
                  className="img-fluid"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    borderRadius: "15px"
                  }}
                  onError={(e) => {
                    e.currentTarget.src = '/assets/images/banner-2.png';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <div style={{
        backgroundColor: "#fff",
        padding: "0px 0",
        borderBottom: "1px solid #e9ecef",
      }}>
        <div className="container">
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "60px"
          }}>
            {/* Directors Tab */}
            <div
              onClick={() => setActiveTab('directors')}
              style={{
                cursor: "pointer",
                padding: "10px 0",
                borderBottom: activeTab === 'directors' ? "3px solid #06038F" : "none",
                color: activeTab === 'directors' ? "#06038F" : "#909090",
                fontWeight: activeTab === 'directors' ? "600" : "500",
                fontSize: "18px",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}
            >
              <span style={{ color: activeTab === 'directors' ? "#007bff" : "#adb5bd" }}></span>
              Directors
            </div>

            {/* Advisors Tab */}
            <div
              onClick={() => setActiveTab('advisors')}
              style={{
                cursor: "pointer",
                padding: "10px 0",
                borderBottom: activeTab === 'advisors' ? "3px solid #06038F" : "none",
                color: activeTab === 'advisors' ? "#06038F" : "#909090",
                fontWeight: activeTab === 'advisors' ? "600" : "500",
                fontSize: "18px",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}
            >
              <span style={{ color: "#adb5bd" }}></span>
              Advisors
            </div>

            {/* Staff Tab */}
            <div
              onClick={() => setActiveTab('staff')}
              style={{
                cursor: "pointer",
                padding: "10px 0",
                borderBottom: activeTab === 'staff' ? "3px solid #06038F" : "none",
                color: activeTab === 'staff' ? "#06038F" : "#909090",
                fontWeight: activeTab === 'staff' ? "600" : "500",
                fontSize: "18px",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}
            >
              <span style={{ color: "#adb5bd" }}></span>
              Staff
            </div>
          </div>
        </div>
      </div>

      {/* Board Members Section */}
      <section style={{ backgroundColor: "#fff", padding: "80px 0" }}>
        <div className="container">
          {getCurrentMembers().length > 0 ? (
            <div className="row g-4">
              {getCurrentMembers().map((member, index) => (
                <MemberCard key={index} member={member} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">No members found</h3>
              <p className="text-gray-600">Please check back later for updates.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default LeadershipDynamic;
