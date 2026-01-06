import React, { useEffect, useState } from 'react';
import PageTemplate from '../components/PageTemplate';
import axiosInstance from '@/lib/axiosInstance';
import { toast } from 'sonner';

const SoftSkillTraining = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await axiosInstance.get('/soft-skill-training-page');
        if (res.data.success) setData(res.data.data);
      } catch (err) {
        toast.error('Failed to load content');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="container py-5 text-center">Loading...</div>;
  if (!data) return <div className="container py-5 text-center">No content available</div>;

  const keyBenefits = (data?.keyBenefitsSection?.benefits || []).map((b, idx) => ({ id: b._id || idx, title: b.title, description: b.description, icon: b.icon }));
  const programHighlights = (data?.programHighlightsSection?.highlights || []).map((h, idx) => ({ id: h._id || idx, title: h.title, description: h.description, icon: h.icon }));

  return (
    <PageTemplate
      breadcrumbPath={[
        { name: "Our Work", link: null },
        { name: "Skills Training", link: null },
        { name: "Soft Skill Training", link: null }
      ]}
      title={data?.heroSection?.title || 'Soft Skill Training Program'}
      subtitle={data?.heroSection?.subtitle || ''}
      description={data?.heroSection?.description || ''}
      heroImage={data?.heroSection?.heroImage || '/assets/images/Skill_Training/softSkillTraining1.png'}
    >
      {/* Program Overview */}
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
              {data?.introduction?.heading || 'Transform Your Communication Skills'}
            </h2>
            <p 
              style={{ 
                fontSize: "20px", 
                lineHeight: "1.8", 
                marginBottom: "0",
                color: "#00000",
                maxWidth: "800px",
                margin: "0 auto"
              }}
            >
              {data?.introduction?.description || ''}
            </p>
          </div>
        </div>
      </div>

      {/* Key Benefits Section */}
      <div className="row mb-5">
        <div className="col-12">
          <div className="text-center mb-5">
            <h6 
              style={{
                color: "#fd7e14",
                fontSize: "14px",
                fontWeight: "600",
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginBottom: "15px"
              }}
            >
              KEY BENEFITS
            </h6>
            <h2 
              style={{ 
                fontSize: "36px", 
                fontWeight: "700", 
                color: "#212529", 
                marginBottom: "20px",
                lineHeight: "1.3"
              }}
            >
              {data?.keyBenefitsSection?.heading || "What You'll Gain"}
            </h2>
            <p 
              style={{ 
                fontSize: "18px", 
                color: "#00000", 
                maxWidth: "600px",
                margin: "0 auto"
              }}
            >
              {data?.keyBenefitsSection?.description || ''}
            </p>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-5">
        {keyBenefits.map((benefit) => (
          <div key={benefit.id} className="col-lg-4 col-md-6">
            <div style={{ padding: "20px 0", textAlign: "center" }}>
              <div 
                style={{ 
                  fontSize: "50px",
                  marginBottom: "20px"
                }}
              >
                {benefit.icon}
              </div>
              <h5 
                style={{ 
                  color: "#212529", 
                  fontWeight: "700", 
                  marginBottom: "15px",
                  fontSize: "20px"
                }}
              >
                {benefit.title}
              </h5>
              <p 
                style={{ 
                  color: "#00000", 
                  fontSize: "16px", 
                  lineHeight: "1.6",
                  marginBottom: "0"
                }}
              >
                {benefit.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Program Highlights Section */}
      <div className="row mb-5">
        <div className="col-12">
          <div className="text-center mb-5">
            <h6 
              style={{
                color: "#fd7e14",
                fontSize: "14px",
                fontWeight: "600",
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginBottom: "15px"
              }}
            >
              PROGRAM HIGHLIGHTS
            </h6>
            <h2 
              style={{ 
                fontSize: "36px", 
                fontWeight: "700", 
                color: "#212529", 
                marginBottom: "20px",
                lineHeight: "1.3"
              }}
            >
              Why Choose Our Program
            </h2>
            <p 
              style={{ 
                fontSize: "18px", 
                color: "#00000", 
                maxWidth: "600px",
                margin: "0 auto"
              }}
            >
              Innovative learning approach designed for maximum impact
            </p>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-5">
        {programHighlights.map((highlight) => (
          <div key={highlight.id} className="col-lg-6 col-md-6">
            <div style={{ padding: "20px 0", textAlign: "center" }}>
              <div 
                style={{ 
                  fontSize: "60px",
                  marginBottom: "20px"
                }}
              >
                {highlight.icon}
              </div>
              <h4 
                style={{ 
                  color: "#212529",
                  fontWeight: "700", 
                  marginBottom: "15px",
                  fontSize: "24px"
                }}
              >
                {highlight.title}
              </h4>
              <p 
                style={{ 
                  color: "#00000",
                  fontSize: "18px", 
                  lineHeight: "1.6",
                  marginBottom: "0"
                }}
              >
                {highlight.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </PageTemplate>
  );
};

export default SoftSkillTraining;
