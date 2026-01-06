import React, { useState } from 'react';
import { toast } from 'sonner';
import PageTemplate from '../components/PageTemplate';
import { submitContactForm } from '../lib/contactApi';
import { contactFormSchema } from '../lib/contactSchema';
import { useContact } from '../hooks/useContact';

const Contact = () => {
  const { contactInfo, loading: contactLoading, error: contactError } = useContact();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    affiliation: '',
    inquiryType: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const inquiryTypes = [
    'Press',
    'Donation',
    'Partnership',
    'Membership',
    'Feedback',
    'Other'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = contactFormSchema.safeParse(formData);
    if (!validation.success) {
      const errorMessage = validation.error.errors[0]?.message || 'Please check your input';
      toast.error(errorMessage);
      return;
    }

    setIsLoading(true);

    try {
      const result = await submitContactForm(formData);

      if (result.success) {
        toast.success(result.message || 'Your message has been sent successfully!');
        // Reset form
        setFormData({
          name: '',
          email: '',
          affiliation: '',
          inquiryType: '',
          message: ''
        });
      } else {
        toast.error(result.message || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      toast.error(error.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Loading state
  if (contactLoading) {
    return (
      <PageTemplate
        breadcrumbPath={[
          { name: "Contact", link: null }
        ]}
        title="Contact"
        subtitle="Loading contact information..."
        description="Please wait while we load the contact information."
        showHeroSection={false}
      >
        <div className="container py-5">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status" style={{ color: "#06038F" }}>
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3" style={{ color: "#06038F" }}>Loading contact information...</p>
          </div>
        </div>
      </PageTemplate>
    );
  }

  // Error state
  if (contactError) {
    return (
      <PageTemplate
        breadcrumbPath={[
          { name: "Contact", link: null }
        ]}
        title="Contact"
        subtitle="Error loading contact information"
        description="Please try refreshing the page or contact support if the problem persists."
        showHeroSection={false}
      >
        <div className="container py-5">
          <div className="text-center">
            <div className="alert alert-danger" role="alert">
              <h2 className="alert-heading">Error Loading Contact Information</h2>
              <p>{contactError}</p>
              <hr />
              <p className="mb-0">Please try refreshing the page or contact support if the problem persists.</p>
            </div>
          </div>
        </div>
      </PageTemplate>
    );
  }

  // Handle case when contact information is not found
  if (!contactLoading && !contactError && !contactInfo) {
    return (
      <PageTemplate
        breadcrumbPath={[
          { name: "Contact", link: null }
        ]}
        title="Contact"
        subtitle="Contact Information"
        description="Contact Information"
        showHeroSection={false}
      >
        <div className="container py-5">
          <div className="text-center">
            <div className="alert alert-info" role="alert">
              <h2 className="alert-heading">Contact Information Not Available</h2>
              <p>Contact information is currently being updated. Please use the contact form below to reach us.</p>
              <hr />
              <p className="mb-0">We'll get back to you as soon as possible.</p>
            </div>
          </div>
        </div>
      </PageTemplate>
    );
  }

  const mailingAddressParts = [
    contactInfo?.addressLine1,
    contactInfo?.addressLine2,
    contactInfo ? `${contactInfo.city || ''} ${contactInfo.state || ''} ${contactInfo.postalCode || ''}`.trim() : '',
    contactInfo?.country,
    contactInfo?.location
  ].filter((part) => !!part && part.trim().length > 0);

  const mapQuery = mailingAddressParts.length > 0
    ? encodeURIComponent(mailingAddressParts.join(', '))
    : encodeURIComponent(contactInfo?.location || 'NEIEA');

  const mapSrc = `https://www.google.com/maps?q=${mapQuery}&output=embed`;

  return (
    <PageTemplate
      breadcrumbPath={[
        { name: "Contact", link: null }
      ]}
      title="Contact"
      subtitle={contactInfo?.location || "Contact Information"}
      // description={contactInfo ? `Email: ${contactInfo.email} | Phone: ${contactInfo.phone} | Working Hours: ${contactInfo.workingHours}` : "Contact Information"}
      description={contactInfo ? `Email: ${contactInfo.email} | Phone: ${contactInfo.phone}` : "Contact Information"}
    >
      <div className="row">
        {/* Map and Contact Form */}
        <div className="col-12">
          <div className="contact-form">
            {mapQuery && (
              <div className="mb-4">
                <iframe
                  title="NEIEA Location Map"
                  src={mapSrc}
                  width="100%"
                  height="320"
                  style={{ border: 0, borderRadius: "8px", width: "100%", height: "320px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            )}
            <h2
              style={{
                color: "#212529",
                fontWeight: "600",
                marginBottom: "15px",
                fontSize: "24px"
              }}
            >
              Get in Touch
            </h2>
            <p
              style={{
                color: "#00000",
                marginBottom: "30px",
                fontSize: "14px"
              }}
            >
              Use the form below and our team will get back to you promptly.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label
                  htmlFor="name"
                  className="form-label"
                  style={{ color: "#495057", fontWeight: "500", fontSize: "14px" }}
                >
                  Name <span style={{ color: "#dc3545" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  disabled={isLoading}
                  style={{
                    borderRadius: "4px",
                    border: "1px solid #dee2e6",
                    padding: "8px 12px",
                    fontSize: "14px"
                  }}
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="email"
                  className="form-label"
                  style={{ color: "#495057", fontWeight: "500", fontSize: "14px" }}
                >
                  Email <span style={{ color: "#dc3545" }}>*</span>
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  disabled={isLoading}
                  style={{
                    borderRadius: "4px",
                    border: "1px solid #dee2e6",
                    padding: "8px 12px",
                    fontSize: "14px"
                  }}
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="affiliation"
                  className="form-label"
                  style={{ color: "#495057", fontWeight: "500", fontSize: "14px" }}
                >
                  Affiliation / Organization
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="affiliation"
                  name="affiliation"
                  value={formData.affiliation}
                  onChange={handleChange}
                  placeholder="Affiliation"
                  disabled={isLoading}
                  style={{
                    borderRadius: "4px",
                    border: "1px solid #dee2e6",
                    padding: "8px 12px",
                    fontSize: "14px"
                  }}
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="inquiryType"
                  className="form-label"
                  style={{ color: "#495057", fontWeight: "500", fontSize: "14px" }}
                >
                  Inquiry Type <span style={{ color: "#dc3545" }}>*</span>
                </label>
                <select
                  className="form-control"
                  id="inquiryType"
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleChange}
                  disabled={isLoading}
                  style={{
                    borderRadius: "4px",
                    border: "1px solid #dee2e6",
                    padding: "8px 12px",
                    fontSize: "14px"
                  }}
                >
                  <option value="">Select</option>
                  {inquiryTypes.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="form-label"
                  style={{ color: "#495057", fontWeight: "500", fontSize: "14px" }}
                >
                  Message <span style={{ color: "#dc3545" }}>*</span>
                </label>
                <textarea
                  className="form-control"
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isLoading}
                  style={{
                    borderRadius: "4px",
                    border: "1px solid #dee2e6",
                    padding: "8px 12px",
                    resize: "vertical",
                    fontSize: "14px"
                  }}
                  placeholder="Message"
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading}
                style={{
                  backgroundColor: "#06038F",
                  borderColor: "#06038F",
                  padding: "8px 20px",
                  fontSize: "14px",
                  fontWeight: "500",
                  borderRadius: "4px"
                }}
              >
                {isLoading ? 'Sending...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Mailing Address Section */}
      <div className="row mt-5">
        <div className="col-12">
          <div
            className="card border-0 shadow-sm"
            style={{
              borderRadius: "8px",
              backgroundColor: "#f8f9fa",
              padding: "20px"
            }}
          >
            <h2
              style={{
                color: "#212529",
                fontWeight: "600",
                marginBottom: "15px",
                fontSize: "20px"
              }}
            >
              Mailing Address
            </h2>
            <div style={{ color: "#00000", fontSize: "14px", lineHeight: "1.6" }}>
              <p style={{ margin: "0 0 8px 0" }}>
                <strong>{contactInfo?.organizationName || "Organization Name"}</strong>
              </p>
              <p style={{ margin: "0 0 8px 0" }}>
                {contactInfo?.addressLine1 || "Address Line 1"}
              </p>
              {contactInfo?.addressLine2 && (
                <p style={{ margin: "0 0 8px 0" }}>
                  {contactInfo.addressLine2}
                </p>
              )}
              <p style={{ margin: "0 0 8px 0" }}>
                {contactInfo ? `${contactInfo.city}, ${contactInfo.state} – ${contactInfo.postalCode}` : "City, State – Postal Code"}
              </p>
              <p style={{ margin: "0" }}>
                {contactInfo?.country || "Country"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default Contact;