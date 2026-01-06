import React, { useState } from 'react';
import { toast } from 'sonner';
import PageTemplate from '../components/PageTemplate';
import { submitContactForm } from '../lib/contactApi';
import { contactFormSchema } from '../lib/contactSchema';

const Contact = () => {
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

  return (
    <PageTemplate
      breadcrumbPath={[
        { name: "Contact", link: null }
      ]}
      title="Contact"
      subtitle="Hyderabad, Telangana, India"
      description="Email: feedback@neiea.org | Phone: +91 70907 70784 | Working Hours: Monday – Friday 10 AM – 6 PM"
    >
      <div className="row">
        {/* Contact Information */}
        <div className="col-lg-4">
          <div className="contact-info">
            <div className="mb-4">
              <div className="d-flex align-items-start mb-3">
                <div
                  style={{
                    color: "#dc3545",
                    marginRight: "10px",
                    fontSize: "16px"
                  }}
                >
                  📍
                </div>
                <div>
                  <p style={{ color: "#6c757d", margin: "0", fontSize: "14px" }}>
                    Hyderabad, Telangana, India
                  </p>
                </div>
              </div>

              <div className="d-flex align-items-start mb-3">
                <div
                  style={{
                    color: "#dc3545",
                    marginRight: "10px",
                    fontSize: "16px"
                  }}
                >
                  📧
                </div>
                <div>
                  <a
                    href="mailto:feedback@neiea.org"
                    style={{
                      color: "#007bff",
                      textDecoration: "underline",
                      fontSize: "14px"
                    }}
                  >
                    feedback@neiea.org
                  </a>
                </div>
              </div>

              <div className="d-flex align-items-start mb-3">
                <div
                  style={{
                    color: "#dc3545",
                    marginRight: "10px",
                    fontSize: "16px"
                  }}
                >
                  📞
                </div>
                <div>
                  <p style={{ color: "#6c757d", margin: "0", fontSize: "14px" }}>
                    +91 70907 70784
                  </p>
                </div>
              </div>

              <div className="d-flex align-items-start mb-4">
                <div
                  style={{
                    color: "#dc3545",
                    marginRight: "10px",
                    fontSize: "16px"
                  }}
                >
                  🕒
                </div>
                <div>
                  <p style={{ color: "#6c757d", margin: "0", fontSize: "14px" }}>
                    Working Hours: Monday – Friday: 10 AM – 6 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="col-lg-8">
          <div className="contact-form">
            <h3
              style={{
                color: "#212529",
                fontWeight: "600",
                marginBottom: "15px",
                fontSize: "24px"
              }}
            >
              Get in Touch
            </h3>
            <p
              style={{
                color: "#6c757d",
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
            <h4
              style={{
                color: "#212529",
                fontWeight: "600",
                marginBottom: "15px",
                fontSize: "20px"
              }}
            >
              Mailing Address
            </h4>
            <div style={{ color: "#6c757d", fontSize: "14px", lineHeight: "1.6" }}>
              <p style={{ margin: "0 0 8px 0" }}>
                <strong>NEIEA (New Equitable and Innovative Educational Association)</strong>
              </p>
              <p style={{ margin: "0 0 8px 0" }}>
                22-2-472/3, Panjathan Colony
              </p>
              <p style={{ margin: "0 0 8px 0" }}>
                Hyderabad, Telangana – 500024
              </p>
              <p style={{ margin: "0" }}>
                India
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default Contact;