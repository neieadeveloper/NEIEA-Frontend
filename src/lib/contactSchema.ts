import { z } from 'zod';

export const contactSchema = z.object({
  location: z.string().min(1, 'Location is required').max(200, 'Location must not exceed 200 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required').max(50, 'Phone number must not exceed 50 characters'),
  workingHours: z.string().min(1, 'Working hours is required').max(200, 'Working hours must not exceed 200 characters'),
  organizationName: z.string().min(1, 'Organization name is required').max(200, 'Organization name must not exceed 200 characters'),
  addressLine1: z.string().min(1, 'Address line 1 is required').max(200, 'Address line 1 must not exceed 200 characters'),
  addressLine2: z.string().max(200, 'Address line 2 must not exceed 200 characters').optional().or(z.literal('')),
  city: z.string().min(1, 'City is required').max(100, 'City must not exceed 100 characters'),
  state: z.string().min(1, 'State is required').max(100, 'State must not exceed 100 characters'),
  postalCode: z.string().min(1, 'Postal code is required').max(20, 'Postal code must not exceed 20 characters'),
  country: z.string().min(1, 'Country is required').max(100, 'Country must not exceed 100 characters'),
});

export type ContactInfo = z.infer<typeof contactSchema> & {
  _id?: string;
  is_active?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

// Schema for contact form submission
export const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must not exceed 100 characters'),
  email: z.string().email('Invalid email address'),
  affiliation: z.string().max(200, 'Affiliation must not exceed 200 characters').optional().or(z.literal('')),
  inquiryType: z.string().min(1, 'Inquiry type is required'),
  message: z.string().min(1, 'Message is required').max(1000, 'Message must not exceed 1000 characters'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;