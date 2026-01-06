// src/lib/testimonialsApi.ts
import axiosInstance from './axiosInstance';


// Types matching MongoDB schema
export interface CardTestimonial {
  _id?: string;
  name: string;
  role: string;
  location: string;
  image: string;
  content: string;
  display_order?: number;
  is_active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface VideoTestimonial {
  _id?: string;
  title: string;
  description: string;
  type: string;
  duration: string;
  videoUrl: string;
  videoType: 'Video' | 'Short'; // New: Video type dropdown
  videoTag: string; // New: Video tag text (e.g., "Success Story", "Inspiring Journey")
  rating: number; // New: Rating out of 5 (0-5)
  display_order?: number;
  is_active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface FeaturedStory {
  _id?: string;
  heading: string;
  subHeading: string;
  story: string;
  display_order?: number;
  is_active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ReorderRequest {
  type: 'cards' | 'videos';
  items: { id: string; display_order: number }[];
}

// Card Testimonials API
export const cardTestimonialsApi = {
  getAll: async (): Promise<CardTestimonial[]> => {
    const response = await axiosInstance.get('/admin/testimonials/cards');
    console.log("resp=", response);
    return response.data;
  },

  create: async (testimonial: Omit<CardTestimonial, '_id'>, imageFile?: File): Promise<CardTestimonial> => {
    if (imageFile) {
      // Use FormData for file upload
      const formData = new FormData();
      formData.append('name', testimonial.name);
      formData.append('role', testimonial.role);
      formData.append('location', testimonial.location);
      formData.append('content', testimonial.content);
      formData.append('image', imageFile);
      
      const response = await axiosInstance.post('/admin/testimonials/cards', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } else {
      // Regular JSON request for non-file uploads
      const response = await axiosInstance.post('/admin/testimonials/cards', testimonial);
      return response.data;
    }
  },

  update: async (id: string, testimonial: Partial<CardTestimonial>, imageFile?: File): Promise<CardTestimonial> => {
    if (imageFile) {
      // Use FormData for file upload
      const formData = new FormData();
      Object.keys(testimonial).forEach(key => {
        if (key !== 'image' && testimonial[key as keyof CardTestimonial] !== undefined) {
          formData.append(key, String(testimonial[key as keyof CardTestimonial]));
        }
      });
      formData.append('image', imageFile);
      
      const response = await axiosInstance.put(`/admin/testimonials/cards/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } else {
      // Regular JSON request for non-file uploads
      const response = await axiosInstance.put(`/admin/testimonials/cards/${id}`, testimonial);
      return response.data;
    }
  },

  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/admin/testimonials/cards/${id}`);
  }
};

// Video Testimonials API
export const videoTestimonialsApi = {
  getAll: async (): Promise<VideoTestimonial[]> => {
    const response = await axiosInstance.get('/admin/testimonials/videos');
    return response.data;
  },

  create: async (testimonial: Omit<VideoTestimonial, '_id'>): Promise<VideoTestimonial> => {
    const response = await axiosInstance.post('/admin/testimonials/videos', testimonial);
    return response.data;
  },

  update: async (id: string, testimonial: Partial<VideoTestimonial>): Promise<VideoTestimonial> => {
    const response = await axiosInstance.put(`/admin/testimonials/videos/${id}`, testimonial);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/admin/testimonials/videos/${id}`);
  }
};

// Public APIs (for landing page) - These don't need authentication
export const publicTestimonialsApi = {
  getCardTestimonials: async (): Promise<CardTestimonial[]> => {
    const response = await axiosInstance.get('/testimonials/cards');
    return response.data;
  },

  getVideoTestimonials: async (): Promise<VideoTestimonial[]> => {
    const response = await axiosInstance.get('/testimonials/videos');
    return response.data;
  }
};

// Reorder API
export const reorderTestimonials = async (reorderData: ReorderRequest): Promise<void> => {
  await axiosInstance.put('/admin/testimonials/reorder', reorderData);
};

// Featured Stories API
export const featuredStoriesApi = {
  getAll: async (): Promise<FeaturedStory[]> => {
    const response = await axiosInstance.get('/admin/testimonials/featured-stories');
    return response.data;
  },

  create: async (story: Omit<FeaturedStory, '_id'>): Promise<FeaturedStory> => {
    const response = await axiosInstance.post('/admin/testimonials/featured-stories', story);
    return response.data;
  },

  update: async (id: string, story: Partial<FeaturedStory>): Promise<FeaturedStory> => {
    const response = await axiosInstance.put(`/admin/testimonials/featured-stories/${id}`, story);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/admin/testimonials/featured-stories/${id}`);
  }
};

// Public API for Featured Stories
export const publicFeaturedStoriesApi = {
  getFeaturedStories: async (): Promise<FeaturedStory[]> => {
    const response = await axiosInstance.get('/testimonials/featured-stories');
    return response.data;
  }
};