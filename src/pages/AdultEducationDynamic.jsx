import React, { useEffect, useState } from 'react';
import PageTemplate from '../components/PageTemplate';
import axiosInstance from '../lib/axiosInstance';

const AdultEducation = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axiosInstance.get('/adult-education-page');
        if (res.data.success) setData(res.data.data);
        else setError(res.data.message || 'Failed to load data');
      } catch (e) {
        setError(e.response?.data?.message || 'Failed to load data');
      } finally { setLoading(false); }
    };
    fetchData();
  }, []);

  if (loading) return <div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600" /></div>;
  if (error || !data) return <div className="max-w-3xl mx-auto py-12 text-center text-red-600">{error || 'No content available'}</div>;

  return (
    <PageTemplate
      breadcrumbPath={[
        { name: "Our Work", link: null },
        { name: "Adult Education", link: null }
      ]}
      title={data.introduction?.title}
      subtitle={data.introduction?.subtitle}
      description={data.introduction?.description}
      heroImage={data.introduction?.heroImage}
    >
      {/* Introduction Section */}
      <section className="mb-6 lg:mb-8 sm:mb-0">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-gray-700 text-lg leading-relaxed text-justify" dangerouslySetInnerHTML={{ __html: data.introduction?.content || '' }}>
          </p>
        </div>
      </section>

      {/* Why Adult Literacy Matters */}
      <section className="mb-6 lg:mb-12 sm:mb-0">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8">
            <div className="flex-1">
              <img 
                src={data.whyItMatters?.image}
                alt="Adult Literacy Program" 
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl lg:text-3xl font-semibold text-[#00000] mb-3 lg:mb-6 text-center">
                {data.whyItMatters?.title}
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed text-justify">
                {data.whyItMatters?.content}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Model */}
      <section className="mb-6 lg:mb-12 sm:mb-0">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-semibold text-[#00000] mb-3 lg:mb-8 text-center">
            {data.learningModel?.title}
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed text-justify mb-4 lg:mb-8" dangerouslySetInnerHTML={{ __html: data.learningModel?.description || '' }}>
          </p>
          <div className="space-y-3 lg:space-y-6">
            {(data.learningModel?.features || []).map((feature, index) => (
              <div key={index} className="flex items-start gap-3 p-3 lg:p-6 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-[#06038F] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-base lg:text-lg">{index + 1}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg lg:text-xl font-semibold text-[#00000] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-sm lg:text-base">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="mb-6 lg:mb-12 sm:mb-0">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-semibold text-[#00000] mb-4 lg:mb-8 text-center">
            {data.focusAreas?.title}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
            {(data.focusAreas?.areas || []).map((area, idx) => (
              <div key={area._id || idx} className="bg-white border border-gray-200 rounded-lg p-3 lg:p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
                <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2 lg:mb-4">
                  {idx + 1}. {area.title}
                </h3>
                <ul className="space-y-2 mb-3 lg:mb-6 flex-grow">
                  {(area.skills || []).map((skill, index) => (
                    <li key={index} className="text-gray-700 flex items-center text-sm lg:text-base">
                      <span className="text-[#00000] mr-2 flex-shrink-0">•</span>
                      <span className="lg:flex lg:items-start lg:mt-1">{skill}</span>
                    </li>
                  ))}
                </ul>
                <div className="bg-[#06038F] bg-opacity-10 p-3 lg:p-4 rounded-lg mt-auto min-h-[70px] lg:min-h-[80px] flex items-center">
                  <p className="text-[#00000] font-medium italic text-sm lg:text-base">
                    <strong>Outcome:</strong> {area.outcome}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why NEIEA */}
      <section className="mb-6 lg:mb-12 sm:mb-0">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-semibold text-[#00000] mb-4 lg:mb-8 text-center">
            {data.whyNeiea?.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-6">
            {(data.whyNeiea?.benefits || []).map((benefit, index) => (
              <div key={index} className="flex items-start gap-3 p-3 lg:p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 w-5 h-5 lg:w-6 lg:h-6 bg-[#06038F] rounded-full flex items-center justify-center">
                  <span className="text-white text-xs lg:text-sm font-bold">✓</span>
                </div>
                <p className="text-gray-700 leading-relaxed text-sm lg:text-base" dangerouslySetInnerHTML={{ __html: benefit }}></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Movement of Renewal */}
      <section className="mb-6 lg:mb-12 sm:mb-0">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-semibold text-[#00000] mb-4 lg:mb-8 text-center">
            {data.movement?.title}
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed text-justify mb-4 lg:mb-8" dangerouslySetInnerHTML={{ __html: data.movement?.content || '' }}>
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 lg:p-8 text-start">
            <p className="text-base lg:text-lg text-gray-700 leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: data.movement?.callToAction || '' }}>
            </p>
          </div>
        </div>
      </section>
    </PageTemplate>
  );
};

export default AdultEducation;
