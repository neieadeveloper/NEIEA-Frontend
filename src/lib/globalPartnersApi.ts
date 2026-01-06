import axiosInstance from './axiosInstance';

const API_BASE_URL = (import.meta as any).env.VITE_API_BASE_URL || 'http://localhost:5000';

export interface GlobalPartner {
  _id?: string;
  name: string;
  shortName: string;
  location: string;
  website?: string;
  shortDescription: string;
  about?: string;
  collaboration?: string;
  impact?: string;
  programs?: string[];
  featuredImage: string;
  detailImages: string[];
  slug: string;
  display_order: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ReorderItem {
  id: string;
  display_order: number;
}

export interface ReorderData {
  type: string;
  items: ReorderItem[];
}

const getAuthToken = () => {
  return localStorage.getItem('token');
};

const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    'Authorization': token ? `Bearer ${token}` : ''
  };
};

export const globalPartnersApi = {
  // Get all partners (Admin - includes inactive)
  getAll: async (): Promise<GlobalPartner[]> => {
    try {
      const response = await axiosInstance.get(`/admin/global-partners`, {
        headers: getAuthHeaders()
      });
      return response.data.data;
    } catch (error) {
      console.error('Error fetching global partners:', error);
      throw error;
    }
  },

  // Get all public partners (Public - only active)
  getAllPublic: async (): Promise<GlobalPartner[]> => {
    try {
      const response = await axiosInstance.get(`/global-partners-page`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching global partners:', error);
      throw error;
    }
  },

  // Get single partner by slug
  getBySlug: async (slug: string): Promise<GlobalPartner> => {
    try {
      const response = await axiosInstance.get(`/global-partners-page/info/${slug}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching global partner:', error);
      throw error;
    }
  },

  // Create new partner
  create: async (
    data: Omit<GlobalPartner, '_id' | 'slug' | 'display_order' | 'createdAt' | 'updatedAt'>,
    featuredImageFile?: File,
    detailImageFiles?: File[]
  ): Promise<GlobalPartner> => {
    try {
      const formData = new FormData();
      
      // Add text fields
      Object.keys(data).forEach(key => {
        if (key === 'programs' && Array.isArray((data as any)[key])) {
          formData.append(key, JSON.stringify((data as any)[key]));
        } else if (key !== 'featuredImage' && key !== 'detailImages') {
          formData.append(key, (data as any)[key]);
        }
      });

      // Add featured image
      if (featuredImageFile) {
        formData.append('featuredImage', featuredImageFile);
      }

      // Add detail images
      if (detailImageFiles && detailImageFiles.length > 0) {
        detailImageFiles.forEach((file) => {
          formData.append('detailImages', file);
        });
      }

      const response = await axiosInstance.post(`/admin/global-partners`, formData, {
        headers: {
          ...getAuthHeaders(),
          'Content-Type': 'multipart/form-data'
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error creating global partner:', error);
      throw error;
    }
  },

  // Update partner
  update: async (
    id: string,
    data: Partial<GlobalPartner> & { 
      existingDetailImages?: string[],
      imagesToRemove?: { url: string, key: string }[]
    },
    featuredImageFile?: File,
    detailImageFiles?: File[]
  ): Promise<GlobalPartner> => {
    try {
      const formData = new FormData();
      
      // Add text fields
      Object.keys(data).forEach(key => {
        if (key === 'programs' && Array.isArray((data as any)[key])) {
          formData.append(key, JSON.stringify((data as any)[key]));
        } else if (key === 'existingDetailImages') {
          formData.append(key, JSON.stringify(data.existingDetailImages));
        } else if (key === 'imagesToRemove') {
          formData.append(key, JSON.stringify(data.imagesToRemove));
        } else if (key !== 'featuredImage' && key !== 'detailImages' && key !== '_id') {
          formData.append(key, (data as any)[key]);
        }
      });

      // Add featured image if provided
      if (featuredImageFile) {
        formData.append('featuredImage', featuredImageFile);
      }

      // Add new detail images if provided
      if (detailImageFiles && detailImageFiles.length > 0) {
        detailImageFiles.forEach((file) => {
          formData.append('detailImages', file);
        });
      }

      const response = await axiosInstance.put(`/admin/global-partners/${id}`, formData, {
        headers: {
          ...getAuthHeaders(),
          'Content-Type': 'multipart/form-data'
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error updating global partner:', error);
      throw error;
    }
  },

  // Delete partner
  delete: async (id: string): Promise<void> => {
    try {
      await axiosInstance.delete(`/admin/global-partners/${id}`, {
        headers: getAuthHeaders()
      });
    } catch (error) {
      console.error('Error deleting global partner:', error);
      throw error;
    }
  },

  // Reorder partners
  reorder: async (data: ReorderData): Promise<void> => {
    try {
      // Backend expects { items: [...] }, not { type, items }
      const payload = { items: data.items };
      await axiosInstance.put(`/admin/global-partners/reorder`, payload, {
        headers: getAuthHeaders()
      });
    } catch (error) {
      console.error('Error reordering global partners:', error);
      throw error;
    }
  }
};

