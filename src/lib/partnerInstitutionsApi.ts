// src/lib/partnerInstitutionsApi.ts
import axiosInstance from './axiosInstance';

// Types matching MongoDB schema
export interface PartnerInstitution {
  _id?: string;
  name: string;
  shortName: string;
  slug?: string;
  location: string;
  address?: string;
  website?: string;
  facebook?: string;
  featuredImage: string;
  featuredImageKey?: string;
  detailImages: string[];
  detailImageKeys?: string[];
  shortDescription: string;
  about?: string;
  foundingStory?: string;
  challenges?: string;
  neieaImpact?: string;
  additionalInfo?: string;
  totalStudents: string;
  established: string;
  display_order?: number;
  is_active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ReorderRequest {
  type: 'partner-institution';
  items: { id: string; display_order: number }[];
}

// Partner Institutions API (Admin)
export const partnerInstitutionsApi = {
  getAll: async (): Promise<PartnerInstitution[]> => {
    const response = await axiosInstance.get('/admin/partner-institution');
    return response.data.data || response.data;
  },

  getById: async (id: string): Promise<PartnerInstitution> => {
    const response = await axiosInstance.get(`/admin/partner-institution/${id}`);
    return response.data.data || response.data;
  },

  create: async (
    institution: Omit<PartnerInstitution, '_id'>,
    featuredImageFile?: File,
    detailImageFiles?: File[]
  ): Promise<PartnerInstitution> => {
    const formData = new FormData();
    
    // Append text fields
    formData.append('name', institution.name);
    formData.append('shortName', institution.shortName);
    formData.append('location', institution.location);
    formData.append('shortDescription', institution.shortDescription);
    formData.append('totalStudents', institution.totalStudents);
    formData.append('established', institution.established);
    
    // Optional fields
    if (institution.address) formData.append('address', institution.address);
    if (institution.website) formData.append('website', institution.website);
    if (institution.facebook) formData.append('facebook', institution.facebook);
    if (institution.about) formData.append('about', institution.about);
    if (institution.foundingStory) formData.append('foundingStory', institution.foundingStory);
    if (institution.challenges) formData.append('challenges', institution.challenges);
    if (institution.neieaImpact) formData.append('neieaImpact', institution.neieaImpact);
    if (institution.additionalInfo) formData.append('additionalInfo', institution.additionalInfo);
    
    // Append featured image
    if (featuredImageFile) {
      formData.append('featuredImage', featuredImageFile);
    }
    
    // Append detail images
    if (detailImageFiles && detailImageFiles.length > 0) {
      detailImageFiles.forEach((file) => {
        formData.append('detailImages', file);
      });
    }
    
    const response = await axiosInstance.post('/admin/partner-institution', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data || response.data;
  },

  update: async (
    id: string,
    institution: Partial<PartnerInstitution> & {
      existingDetailImages?: string[];
      imagesToRemove?: {url: string, key: string}[];
    },
    featuredImageFile?: File,
    detailImageFiles?: File[]
  ): Promise<PartnerInstitution> => {
    const formData = new FormData();
    
    // Append text fields
    Object.keys(institution).forEach(key => {
      if (
        key !== 'featuredImage' && 
        key !== 'detailImages' && 
        key !== '_id' &&
        key !== 'existingDetailImages' &&
        key !== 'imagesToRemove' &&
        institution[key as keyof PartnerInstitution] !== undefined &&
        institution[key as keyof PartnerInstitution] !== null
      ) {
        const value = institution[key as keyof PartnerInstitution];
        if (Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, String(value));
        }
      }
    });
    
    // Append existing detail images (to keep)
    if (institution.existingDetailImages) {
      formData.append('existingDetailImages', JSON.stringify(institution.existingDetailImages));
    }
    
    // Append images to remove
    if (institution.imagesToRemove && institution.imagesToRemove.length > 0) {
      formData.append('imagesToRemove', JSON.stringify(institution.imagesToRemove));
    }
    
    // Append featured image if new one is provided
    if (featuredImageFile) {
      formData.append('featuredImage', featuredImageFile);
    }
    
    // Append new detail images if provided
    if (detailImageFiles && detailImageFiles.length > 0) {
      detailImageFiles.forEach((file) => {
        formData.append('detailImages', file);
      });
    }
    
    const response = await axiosInstance.put(`/admin/partner-institution/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data || response.data;
  },

  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/admin/partner-institution/${id}`);
  },

  reorder: async (reorderData: ReorderRequest): Promise<void> => {
    await axiosInstance.put('/admin/partner-institution/reorder', reorderData);
  }
};

// Public APIs (for landing page)
export const publicPartnerInstitutionsApi = {
  getAll: async (): Promise<PartnerInstitution[]> => {
    const response = await axiosInstance.get('/partner-institution');
    return response.data.data || response.data;
  },

  getBySlug: async (slug: string): Promise<PartnerInstitution> => {
    const response = await axiosInstance.get(`/partner-institution/info/${slug}`);
    return response.data.data || response.data;
  }
};

