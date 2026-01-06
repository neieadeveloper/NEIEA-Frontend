import React, { useEffect, useState } from 'react';
import PageTemplate from '../components/PageTemplate';
import axiosInstance from '../lib/axiosInstance';

const GlobalEducation = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axiosInstance.get('/global-education-page');
        if (res.data.success) setData(res.data.data); else setError(res.data.message || 'Failed to load content');
      } catch (e) {
        setError(e.response?.data?.message || 'Failed to load content');
      } finally { setLoading(false); }
    };
    fetchData();
  }, []);

  if (loading) return <div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600" /></div>;
  if (error || !data) return <div className="max-w-3xl mx-auto py-12 text-center text-red-600">{error || 'No content available'}</div>;

  const valuesInEducation = (data.valuesList || []).map((v, i) => ({ id: v._id || i+1, ...v }));

  const sdgContributions = (data.sdgFocusSection?.contributions || []).map((c, i) => ({ id: c._id || i+1, ...c }));

  return (
    <PageTemplate
      breadcrumbPath={[
        { name: "Our Works", link: "/our-works" },
        { name: "Global Education" }
      ]}
      title={data.heroSection?.title || "Global Education"}
      subtitle={data.heroSection?.subtitle}
      description={data.heroSection?.description}
      heroImage={data.heroSection?.heroImage}
    >
      {/* Introduction */}
      <div className="row mb-5">
        <div className="col-lg-10 mx-auto">
          <div className="text-center" style={{ padding: "40px 20px" }}>
            <h2 
              style={{ 
                fontSize: "32px", 
                fontWeight: "700", 
                marginBottom: "25px",
                color: "#212529"
              }}
            >
              {data.introduction?.heading}
            </h2>
            <p 
              style={{ 
                fontSize: "18px", 
                lineHeight: "1.8", 
                marginBottom: "0",
                color: "#00000"
              }}
            >
              {data.introduction?.description}
            </p>
          </div>
        </div>
      </div>

      {/* NEIEA's Global Mission */}
      <div className="row mb-5">
        <div className="col-lg-6 d-flex align-items-center">
          <div style={{ padding: "20px 0" }}>
            <h4 
              style={{ 
                color: "#212529",
                fontWeight: "700", 
                marginBottom: "20px",
                fontSize: "24px"
              }}
            >
              {data.missionSection?.heading}
            </h4>
            <p 
              style={{ 
                color: "#00000",
                fontSize: "16px", 
                lineHeight: "1.8",
                margin: "0"
              }}
            >
              NEIEA's mission is to provide high-quality, innovative education to all, with a special focus on marginalized communities worldwide. Our inclusive approach ensures that education reaches those typically left behind in mainstream systems—girls, slum-dwelling children, dropouts, Madrasa students, and learners in underserved communities. Through free online courses and modern pedagogies like Discourse Oriented Pedagogy (DOP), we foster critical thinking, collaboration, and problem-solving skills essential for global citizenship.
            </p>
          </div>
        </div>
        <div className="col-lg-6 d-flex align-items-center justify-content-center">
          <img 
            src={data.missionSection?.image} 
            alt="NEIEA's Global Education Mission" 
            style={{ 
              width: "80%", 
              maxHeight: "300px", 
              objectFit: "contain"
            }} 
          />
        </div>
      </div>

      {/* SDG Section */}
      <div className="row mb-5">
        <div className="col-lg-12">
          <div className="text-center mb-4">
            <h3 
              style={{ 
                color: "#212529",
                fontSize: "28px", 
                fontWeight: "700", 
                marginBottom: "20px"
              }}
            >
              {data.sdgSection?.heading}
            </h3>
            <p 
              style={{ 
                color: "#00000",
                fontSize: "18px", 
                lineHeight: "1.8",
                maxWidth: "800px",
                margin: "0 auto"
              }}
            >
              {data.sdgSection?.description}
            </p>
          </div>
        </div>
      </div>

      {/* NEIEA's Focus on SDG 4 */}
      <div className="row mb-5">
        <div className="col-lg-12">
          <div className="text-center mb-4">
            <h4 
              style={{ 
                color: "#212529",
                fontSize: "24px", 
                fontWeight: "700", 
                marginBottom: "20px"
              }}
            >
              {data.sdgFocusSection?.heading}
            </h4>
            <p 
              style={{ 
                color: "#00000",
                fontSize: "16px", 
                lineHeight: "1.8",
                maxWidth: "900px",
                margin: "0 auto 30px"
              }}
            >
              {data.sdgFocusSection?.description}
            </p>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-5">
        {sdgContributions.map((contribution) => (
          <div key={contribution.id} className="col-lg-4">
            <div 
              className="card border-0 text-center"
              style={{ 
                padding: "30px 20px",
                backgroundColor: "white",
                border: "1px solid #e9ecef",
                borderRadius: "8px"
              }}
            >
              <div 
                style={{ 
                  fontSize: "50px",
                  marginBottom: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "80px"
                }}
              >
                {contribution.icon}
              </div>
              <h5 
                style={{ 
                  color: "#212529", 
                  fontWeight: "700", 
                  marginBottom: "15px",
                  fontSize: "18px"
                }}
              >
                {contribution.title}
              </h5>
              <p 
                style={{ 
                  color: "#00000", 
                  fontSize: "15px", 
                  lineHeight: "1.6",
                  marginBottom: "0"
                }}
              >
                {contribution.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Equity and Impact Section */}
      <div className="row mb-5">
        <div className="col-lg-10 mx-auto">
          <div className="text-center" style={{ padding: "30px 20px" }}>
            <h4 
              style={{ 
                color: "#212529",
                fontSize: "24px", 
                fontWeight: "700", 
                marginBottom: "20px"
              }}
            >
              {data.equityImpactSection?.heading}
            </h4>
            <div style={{ textAlign: "left", maxWidth: "800px", margin: "0 auto" }}>
              <p 
                style={{ 
                  color: "#00000",
                  fontSize: "16px", 
                  lineHeight: "1.8",
                  marginBottom: "15px"
                }}
              >
                {(data.equityImpactSection?.paragraphs||[])[0]}
              </p>
              <p 
                style={{ 
                  color: "#00000",
                  fontSize: "16px", 
                  lineHeight: "1.8",
                  margin: "0"
                }}
              >
                {(data.equityImpactSection?.paragraphs||[])[1]}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-lg-6 d-flex align-items-center justify-content-center">
          <img 
            src={data.equityImpactSection?.image} 
            alt="Impact and Equity" 
            style={{ 
              width: "100%", 
              maxHeight: "400px", 
              objectFit: "contain"
            }} 
          />
        </div>
        <div className="col-lg-6 d-flex align-items-center">
          <div style={{ padding: "20px 0" }}>
            <h4 
              style={{ 
                color: "#212529",
                fontWeight: "700", 
                marginBottom: "20px",
                fontSize: "24px"
              }}
            >
              Why It Matters
            </h4>
            <p 
              style={{ 
                color: "#00000",
                fontSize: "16px", 
                lineHeight: "1.8",
                margin: "0"
              }}
            >
              By operationalizing SDG 4 with purpose and precision, NEIEA is doing more than imparting education, it's creating pathways out of poverty, enabling lifelong growth, and empowering future generations. When marginalized learners get access to high-quality, meaningful education, entire communities transform.
            </p>
          </div>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-lg-12 text-center">
          <img 
            src={data.bannerImage} 
            alt="Global Education Impact" 
            style={{ 
              width: "100%", 
              maxHeight: "500px", 
              objectFit: "contain"
            }} 
          />
        </div>
      </div>

      {/* Integrating Values in Education */}
      <div className="row mb-5">
        <div className="col-lg-12">
          <div className="text-center mb-4">
            <h3 
              style={{ 
                color: "#212529",
                fontSize: "28px", 
                fontWeight: "700", 
                marginBottom: "20px"
              }}
            >
              {data.valuesIntroSection?.heading}
            </h3>
            <p 
              style={{ 
                color: "#00000",
                fontSize: "18px", 
                lineHeight: "1.8",
                maxWidth: "800px",
                margin: "0 auto"
              }}
            >
              {data.valuesIntroSection?.description}
            </p>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-5">
        {valuesInEducation.map((value) => (
          <div key={value.id} className="col-lg-6">
            <div 
              className="card border-0"
              style={{ 
                padding: "25px",
                backgroundColor: "white",
                border: "1px solid #e9ecef",
                borderRadius: "8px"
              }}
            >
              <div className="d-flex align-items-start">
                <div 
                  style={{ 
                    fontSize: "40px", 
                    marginRight: "20px",
                    minWidth: "60px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  {value.icon}
                </div>
                <div>
                  <h5 
                    style={{ 
                      color: "#212529", 
                      fontWeight: "700", 
                      marginBottom: "15px",
                      fontSize: "18px"
                    }}
                  >
                    {value.title}
                  </h5>
                  <p 
                    style={{ 
                      color: "#00000", 
                      fontSize: "15px", 
                      lineHeight: "1.6", 
                      margin: "0"
                    }}
                  >
                    {value.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Values Summary */}
      <div className="row mb-5">
        <div className="col-lg-10 mx-auto">
          <div className="text-center" style={{ padding: "30px 20px" }}>
            <p 
              style={{ 
                color: "#00000",
                fontSize: "18px", 
                lineHeight: "1.8",
                margin: "0",
                fontWeight: "600"
              }}
            >
              {data.valuesSummary}
            </p>
          </div>
        </div>
      </div>

    </PageTemplate>
  );
};

export default GlobalEducation;