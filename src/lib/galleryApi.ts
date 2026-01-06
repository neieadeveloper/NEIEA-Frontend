import axiosInstance from './axiosInstance';

export interface GalleryItem {
  _id: string;
  title: string;
  description: string;
  image: string;
  category: 'events' | 'leadership' | 'partnerships' | 'workshops' | 'digital';
  year: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateGalleryItemData {
  title: string;
  description: string;
  category: string;
  year: string;
}

export interface ReorderData {
  items: Array<{
    id: string;
    display_order: number;
  }>;
}

export interface GalleryCategory {
  id: string;
  name: string;
  count: number;
}

export interface GalleryResponse {
  success: boolean;
  data: GalleryItem[];
  pagination?: {
    current: number;
    pages: number;
    total: number;
  };
}

export interface CategoriesResponse {
  success: boolean;
  data: GalleryCategory[];
}

export const galleryApi = {
  // Admin APIs
  admin: {
    // Get all gallery items (Admin)
    getAll: async (category?: string, page = 1, limit = 50): Promise<GalleryResponse> => {
      const params: any = { page, limit };
      if (category && category !== 'all') {
        params.category = category;
      }
      const response = await axiosInstance.get('/admin/gallery', { params });
      return response.data;
    },

    // Get single gallery item (Admin)
    getById: async (id: string): Promise<GalleryItem> => {
      const response = await axiosInstance.get(`/admin/gallery/${id}`);
      return response.data.data;
    },

    // Create new gallery item (Admin)
    create: async (data: CreateGalleryItemData, imageFile: File): Promise<GalleryItem> => {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('category', data.category);
      formData.append('year', data.year);
      formData.append('image', imageFile);

      const response = await axiosInstance.post('/admin/gallery', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.data;
    },

    // Update gallery item (Admin)
    update: async (id: string, data: CreateGalleryItemData, imageFile?: File): Promise<GalleryItem> => {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('category', data.category);
      formData.append('year', data.year);
      
      if (imageFile) {
        formData.append('image', imageFile);
      }

      const response = await axiosInstance.put(`/admin/gallery/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.data;
    },

    // Delete gallery item (Admin)
    delete: async (id: string): Promise<void> => {
      await axiosInstance.delete(`/admin/gallery/${id}`);
    },

    // Reorder gallery items (Admin)
    reorder: async (data: ReorderData): Promise<void> => {
      await axiosInstance.put('/admin/gallery/reorder', data);
    },

    // Toggle gallery item status (Admin)
    toggleStatus: async (id: string): Promise<GalleryItem> => {
      const response = await axiosInstance.put(`/admin/gallery/${id}/toggle-status`);
      return response.data.data;
    }
  },

  // Public APIs
  public: {
    // Get all active gallery items (Public)
    getAll: async (category?: string, page = 1, limit = 20): Promise<GalleryResponse> => {
      const params: any = { page, limit };
      if (category && category !== 'all') {
        params.category = category;
      }
      const response = await axiosInstance.get('/gallery', { params });
      return response.data;
    },

    // Get gallery categories (Public)
    getCategories: async (): Promise<CategoriesResponse> => {
      const response = await axiosInstance.get('/gallery/categories');
      return response.data;
    },

    // Get single gallery item (Public)
    getById: async (id: string): Promise<GalleryItem> => {
      const response = await axiosInstance.get(`/gallery/${id}`);
      return response.data.data;
    },

    // Get recent gallery items (Public)
    getRecent: async (limit = 6): Promise<GalleryItem[]> => {
      const response = await axiosInstance.get('/gallery/recent', { params: { limit } });
      return response.data.data;
    }
  }
};
