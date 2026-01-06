import { z } from 'zod';

export const globalPartnerSchema = z.object({
  name: z.string()
    .min(3, 'Partner name must be at least 3 characters')
    .max(200, 'Partner name must not exceed 200 characters'),
  
  shortName: z.string()
    .min(2, 'Short name must be at least 2 characters')
    .max(50, 'Short name must not exceed 50 characters'),
  
  location: z.string()
    .min(3, 'Location must be at least 3 characters')
    .max(200, 'Location must not exceed 200 characters'),
  
  website: z.string()
    .url('Please enter a valid URL')
    .optional()
    .or(z.literal('')),
  
  shortDescription: z.string()
    .min(50, 'Short description must be at least 50 characters')
    .max(500, 'Short description must not exceed 500 characters'),
  
  about: z.string()
    .min(100, 'About section must be at least 100 characters')
    .optional()
    .or(z.literal('')),
  
  collaboration: z.string()
    .min(100, 'Collaboration description must be at least 100 characters')
    .optional()
    .or(z.literal('')),
  
  impact: z.string()
    .min(100, 'Impact description must be at least 100 characters')
    .optional()
    .or(z.literal('')),
  
  programs: z.string()
    .optional()
    .or(z.literal('')),
  
  featuredImage: z.string().min(1, 'Featured image is required'),
  
  detailImages: z.array(z.string()).optional()
});

export type GlobalPartnerFormData = z.infer<typeof globalPartnerSchema>;

