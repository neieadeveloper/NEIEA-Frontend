import React, { useEffect, useState } from 'react';
import PageTemplate from '../components/PageTemplate';
import axiosInstance from '@/lib/axiosInstance';
import { Link } from 'react-router-dom';

const PartnersJoinDynamic = () => {
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await axiosInstance.get('/partners-join-page');
        if (res.data?.success) setPage(res.data.data);
      } catch (e) {
        // keep defaults if API not ready
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return null;

  // Build contentData like the original static page
  const contentData = page ? {
    sections: [
      {
        id: 'introduction',
        title: 'Overview',
        content: (page.overviewSection?.introductionParagraph || '').split(/\n{2,}/).filter(Boolean)
      },
      {
        id: 'scalable-model',
        title: page.overviewSection?.scalableModel?.title || 'A Scalable Model for Quality Learning',
        content: [page.overviewSection?.scalableModel?.description || '', page.overviewSection?.lowCostModelParagraph || '']
      },
      {
        id: 'community-partnerships',
        title: page.overviewSection?.communityPartnerships?.title || 'Partnerships That Empower Communities',
        content: [page.overviewSection?.communityPartnerships?.description1 || '', page.overviewSection?.communityPartnerships?.description2 || '']
      },
      {
        id: 'global-collaborations',
        title: page.overviewSection?.globalCollaborations?.title || 'Global Collaborations for Greater Impact',
        content: [page.overviewSection?.globalCollaborations?.description || '', page.overviewSection?.transparencyParagraph || '']
      },
      {
        id: 'why-collaborate',
        title: page.whyCollaborateSection?.title || 'Why Collaborate with NEIEA?',
        content: (page.whyCollaborateSection?.points || []).map(pt => `${pt.title}: ${pt.description}`)
      },
      {
        id: 'how-to-partner',
        title: page.howYouCanPartnerSection?.title || 'How You Can Partner with NEIEA',
        content: (page.howYouCanPartnerSection?.modes || []).map(m => `${m.title}: ${m.description}`)
      },
      {
        id: 'charities-foundations',
        title: page.partneringWithCharitiesSection?.title || 'Partnering with Charities, Trusts, and Foundations',
        content: page.partneringWithCharitiesSection?.paragraphs || []
      }
    ],
    callToAction: {
      title: page.callToActionSection?.title || 'Together, we can take the gift of learning to every corner where it is needed most.',
      contact: {
        email: page.callToActionSection?.buttonLink || '/about-us/contact',
        courseLink: '/courses/english'
      },
      buttonText: page.callToActionSection?.buttonText || 'Contact Us'
    }
  } : null;

  return (
    <PageTemplate
      breadcrumbPath={[
        { name: 'Partners', link: null },
        { name: 'Join NEIEA as a Partner', link: null }
      ]}
      title={page?.headerSection?.title || 'Join NEIEA as an Institutional Partner'}
      subtitle={page?.headerSection?.subtitle || 'Together We Can Transform Education'}
      description={''}
      heroImage={page?.headerSection?.imageUrl || '/assets/images/JoinNeieaAsPartner/1.png'}
      videoLink={page?.headerSection?.videoLink || null}
    >
      {/* Main Content Section cloned from original static layout */}
      <section style={{ 
        backgroundColor: '#ffffff', 
        padding: '60px 0',
        minHeight: '100vh',
        fontFamily: 'system-ui, -apple-system, "Roboto", sans-serif;'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div className="content-container" style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
            {contentData?.sections.map((section) => (
              <div key={section.id} className="section-content" style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                <div className="section-header" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <h2 style={{ color: '#06038F', fontSize: '28px', fontWeight: 700, margin: 0, lineHeight: '1.2', paddingRight: section.title === 'Overview' ? '20px' : '0' }}>
                    {section.title}
                  </h2>
                  {section.title === 'Overview' && (
                    <div style={{ height: '1px', backgroundColor: '#06038F', flex: 1, minWidth: '20px' }}></div>
                  )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {section.content.map((paragraph, pIndex) => (
                    <p key={pIndex} style={{ fontSize: '22px', lineHeight: '32px', letterSpacing: '-.02em', paddingBottom: '14px', color: '#000000', margin: 0, textAlign: 'left' }}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            {/* Call to Action Section */}
            <div className="call-to-action" style={{ backgroundColor: '#f8f9fa', padding: '40px', borderRadius: '8px', textAlign: 'center', marginTop: '40px' }}>
              <p style={{ fontSize: '1.25rem', fontWeight: 600, color: '#06038F', marginBottom: '30px', lineHeight: 1.5 }}>
                {contentData?.callToAction.title}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center' }}>
                <p style={{ fontSize: '1.1rem', margin: 0, color: '#333333' }}>
                  <strong>Interested in collaboration? Become an NEIEA Partner today!</strong>
                </p>
                <div className="call-to-action-buttons" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <Link
                    to={'/courses/english'}
                    style={{ color: '#06038F', textDecoration: 'none', fontWeight: 600, fontSize: '1.1rem', padding: '10px 20px', border: '2px solid #06038F', borderRadius: '5px', transition: 'all 0.3s ease' }}
                  >
                    Join NEIEA Courses
                  </Link>
                  <Link
                    to={contentData?.callToAction.contact.email || '/about-us/contact'}
                    style={{ color: '#06038F', textDecoration: 'none', fontWeight: 600, fontSize: '1.1rem', padding: '10px 20px', border: '2px solid #06038F', borderRadius: '5px', transition: 'all 0.3s ease' }}
                  >
                    {contentData?.callToAction.buttonText || 'Contact Us'}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Responsive Styles */}
        <style jsx>{`
          @media (max-width: 768px) {
            .container { padding: 0 15px !important; }
            section { padding: 30px 0 !important; }
            .content-container { gap: 30px !important; }
            .section-content { gap: 20px !important; }
            h2 { font-size: 1.8rem !important; line-height: 1.3 !important; word-wrap: break-word !important; hyphens: auto !important; margin-bottom: 15px !important; }
            .section-header { align-items: center !important; margin-bottom: 15px !important; }
            .section-header h2 { padding-right: 0 !important; }
            .section-header h2:first-child { padding-right: 15px !important; }
            .section-header div { min-width: 15px !important; }
            .call-to-action-buttons { flex-direction: column !important; gap: 15px !important; }
            .call-to-action-buttons a { width: 100% !important; text-align: center !important; }
          }
          @media (max-width: 480px) {
            section { padding: 20px 0 !important; }
            .content-container { gap: 20px !important; }
            .section-content { gap: 15px !important; }
            h2 { font-size: 1.5rem !important; line-height: 1.2 !important; word-wrap: break-word !important; hyphens: auto !important; margin-bottom: 10px !important; }
            .section-header { margin-bottom: 10px !important; }
            .section-header h2 { padding-right: 0 !important; }
            .section-header h2:first-child { padding-right: 12px !important; }
            .section-header div { min-width: 12px !important; }
            p { font-size: 1rem !important; margin-bottom: 15px !important; }
            .call-to-action { padding: 20px 15px !important; margin-top: 20px !important; }
          }
          @media (max-width: 360px) {
            section { padding: 15px 0 !important; }
            .content-container { gap: 15px !important; }
            h2 { font-size: 1.3rem !important; line-height: 1.1 !important; margin-bottom: 8px !important; }
            .section-header { margin-bottom: 8px !important; }
            .section-header h2 { padding-right: 0 !important; }
            .section-header h2:first-child { padding-right: 10px !important; }
            .section-header div { min-width: 10px !important; }
            p { margin-bottom: 12px !important; }
          }
        `}</style>
      </section>
    </PageTemplate>
  );
};

export default PartnersJoinDynamic;


