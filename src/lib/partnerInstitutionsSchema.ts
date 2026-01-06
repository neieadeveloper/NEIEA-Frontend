import { z } from 'zod';

// Image validation helpers
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

// For card images - recommended size 800x600 or similar 4:3 ratio
export const cardImageValidation = z
  .instanceof(File)
  .refine((file) => file.size <= MAX_FILE_SIZE, 'Card image must be less than 2MB')
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
    'Only .jpg, .jpeg, .png and .webp formats are supported'
  )
  .optional();

// For detail page images - recommended size 1200x800 or similar 3:2 ratio
export const detailImageValidation = z
  .instanceof(File)
  .refine((file) => file.size <= MAX_FILE_SIZE, 'Detail image must be less than 2MB')
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
    'Only .jpg, .jpeg, .png and .webp formats are supported'
  )
  .optional();

// Main schema for partner institution form
export const partnerInstitutionSchema = z.object({
  name: z.string()
    .min(3, 'Institution name must be at least 3 characters')
    .max(200, 'Institution name must not exceed 200 characters'),
  
  shortName: z.string()
    .min(2, 'Short name must be at least 2 characters')
    .max(50, 'Short name must not exceed 50 characters'),
  
  location: z.string()
    .min(3, 'Location must be at least 3 characters')
    .max(200, 'Location must not exceed 200 characters'),
  
  address: z.string()
    .min(10, 'Address must be at least 10 characters')
    .max(500, 'Address must not exceed 500 characters')
    .optional()
    .or(z.literal('')),
  
  website: z.string()
    .url('Must be a valid URL')
    .optional()
    .or(z.literal('')),
  
  facebook: z.string()
    .url('Must be a valid URL')
    .optional()
    .or(z.literal('')),
  
  shortDescription: z.string()
    .min(50, 'Short description must be at least 50 characters')
    .max(300, 'Short description must not exceed 300 characters'),
  
  about: z.string()
    .min(100, 'About section must be at least 100 characters')
    .optional()
    .or(z.literal('')),
  
  foundingStory: z.string()
    .min(100, 'Founding story must be at least 100 characters')
    .optional()
    .or(z.literal('')),
  
  challenges: z.string()
    .min(100, 'Challenges section must be at least 100 characters')
    .optional()
    .or(z.literal('')),
  
  neieaImpact: z.string()
    .min(100, 'NEIEA Impact section must be at least 100 characters')
    .optional()
    .or(z.literal('')),
  
  additionalInfo: z.string()
    .min(50, 'Additional info must be at least 50 characters')
    .optional()
    .or(z.literal('')),
  
  totalStudents: z.string()
    .min(2, 'Total students info is required')
    .max(100, 'Total students info must not exceed 100 characters'),
  
  established: z.string()
    .min(2, 'Established info is required')
    .max(100, 'Established info must not exceed 100 characters'),
  
  featuredImage: z.string().optional(),
  
  detailImages: z.array(z.string()).optional(),
});

export type PartnerInstitutionFormData = z.infer<typeof partnerInstitutionSchema>;

// Validation messages
export const validationMessages = {
  imageSizeError: 'Image size must be less than 2MB',
  imageTypeError: 'Only .jpg, .jpeg, .png and .webp formats are supported',
  cardImageRecommendation: 'Recommended size: 800x600px (4:3 ratio) for best display in cards',
  detailImageRecommendation: 'Recommended size: 1200x800px (3:2 ratio) for best display in gallery',
  maxDetailImages: 'Maximum 10 images allowed for detail gallery',
};

