import axiosInstance from './axiosInstance';

export interface ContactInfo {
  _id?: string;
  location: string;
  email: string;
  phone: string;
  workingHours: string;
  organizationName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  is_active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  affiliation: string;
  inquiryType: string;
  message: string;
}

// Submit contact form (Public)
export const submitContactForm = async (data: ContactFormData): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await axiosInstance.post('/contact/contact-form', data);
    return response.data;
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
};

export const contactApi = {
  // Get contact information (Public)
  getContactInfo: async (): Promise<ContactInfo> => {
    try {
      const response = await axiosInstance.get('/contact');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching contact information:', error);
      throw error;
    }
  },

  // Get contact information (Admin)
  getContactInfoAdmin: async (): Promise<ContactInfo> => {
    try {
      const response = await axiosInstance.get('/admin/contact');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching contact information:', error);
      throw error;
    }
  },

  // Update contact information (Admin)
  updateContactInfo: async (data: ContactInfo): Promise<ContactInfo> => {
    try {
      const response = await axiosInstance.put('/admin/contact', data);
      return response.data.data;
    } catch (error) {
      console.error('Error updating contact information:', error);
      throw error;
    }
  }
};