import React, { useEffect, useState } from 'react';
import PageTemplate from '../components/PageTemplate.jsx';
import axiosInstance from '../lib/axiosInstance';

const PrivacyPolicy = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axiosInstance.get('/privacy-policy-page');
        if (res.data.success) setData(res.data.data); else setError(res.data.message || 'Failed to load content');
      } catch (e) {
        setError(e.response?.data?.message || 'Failed to load content');
      } finally { setLoading(false); }
    };
    fetchData();
  }, []);

  const breadcrumbPath = [
    { name: 'Legal', link: null },
    { name: 'Privacy Policy', link: null }
  ];

  return (
    <PageTemplate
      breadcrumbPath={breadcrumbPath}
      title={data?.heroSection?.title || 'Privacy Policy'}
      subtitle={data?.heroSection?.subtitle}
      description={data?.heroSection?.description}
      heroImage={data?.heroSection?.heroImage}
    >
      <div className="row gy-4">
        {(data?.sections || []).map((section, index) => (
          <div className="col-12" key={index}>
            <div
              className="p-4 p-md-5 bg-white rounded-3 shadow-sm h-100"
              style={{ border: '1px solid #ececec' }}
            >
              <h3
                className="mb-2"
                style={{ fontWeight: 700, color: '#06038F' }}
              >
                {section.heading}
              </h3>
              {section.subHeading && (
                <h5
                  className="mb-3"
                  style={{ fontWeight: 600, color: '#555' }}
                >
                  {section.subHeading}
                </h5>
              )}
              {section.description && (
                <p className="mb-0" style={{ lineHeight: 1.8, color: '#333' }}>
                  {section.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </PageTemplate>
  );
};

export default PrivacyPolicy;


