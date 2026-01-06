import React from 'react';
import PageTemplate from '../components/PageTemplate.jsx';

const PrivacyPolicy = () => {
  const sections = [
    {
      heading: 'Introduction',
      subHeading: 'Your privacy matters to us',
      description:
        'This Privacy Policy explains what information we collect, how we use it, and the choices you have. By using our website, you agree to the practices described here.'
    },
    {
      heading: 'Information We Collect',
      subHeading: 'Data you provide and data collected automatically',
      description:
        'We may collect personal details you submit (such as name, email, messages) and usage data gathered automatically (such as device, browser, pages visited, and interaction data) to improve our services.'
    },
    {
      heading: 'How We Use Your Information',
      subHeading: 'Operate, improve, and secure our services',
      description:
        'We use your information to respond to inquiries, provide updates, personalize content, enhance site performance, maintain security, and comply with legal obligations where applicable.'
    },
    {
      heading: 'Sharing and Disclosure',
      subHeading: 'Limited sharing with safeguards',
      description:
        'We do not sell your personal data. We may share information with trusted service providers who assist us in operations (e.g., hosting, analytics), bound by confidentiality and data protection obligations, or when required by law.'
    },
    {
      heading: 'Data Retention',
      subHeading: 'Keeping data only as long as necessary',
      description:
        'We retain personal information for as long as needed to fulfill the purposes outlined here or as required by law. When no longer needed, data is deleted or anonymized securely.'
    },
    {
      heading: 'Your Choices and Rights',
      subHeading: 'Access, update, or request deletion',
      description:
        'You may request access to, correction of, or deletion of your personal information, subject to legal limitations. Contact us if you wish to exercise these rights.'
    },
    {
      heading: 'Security',
      subHeading: 'Protecting your information',
      description:
        'We implement reasonable technical and organizational measures to protect your data. However, no method of transmission over the internet is 100% secure.'
    },
    {
      heading: 'Third-Party Links',
      subHeading: 'External sites and services',
      description:
        'Our website may contain links to third-party sites. We are not responsible for the privacy practices of those sites. Review their policies for more information.'
    },
    {
      heading: 'Updates to This Policy',
      subHeading: 'When this policy changes',
      description:
        'We may update this Privacy Policy periodically to reflect changes in our practices or for legal, operational, or regulatory reasons. The revised version will be posted on this page.'
    },
    {
      heading: 'Contact Us',
      subHeading: 'Questions about privacy',
      description:
        'If you have any questions or requests regarding this Privacy Policy or our data practices, please contact us through the details provided on our Contact page.'
    }
  ];

  const breadcrumbPath = [
    { name: 'Legal', link: null },
    { name: 'Privacy Policy', link: null }
  ];

  return (
    <PageTemplate
      breadcrumbPath={breadcrumbPath}
      title="Privacy Policy"
      subtitle="Transparency about how we handle your information"
      description="Learn what data we collect, how we use it, and your choices."
      showHeroSection={true}
    >
      <div className="row gy-4">
        {sections.map((section, index) => (
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


