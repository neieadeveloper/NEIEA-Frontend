// src/lib/leadershipApi.ts
import axiosInstance from './axiosInstance';

// Types matching MongoDB schema
export interface LeadershipMember {
  _id?: string;
  name: string;
  title: string;
  description: string;
  image: string;
  hasImage?: boolean;
  category: 'directors' | 'advisors' | 'staff';
  display_order?: number;
  is_active?: boolean;
  fullBio?: string;
  slug?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LeadershipHeroSection {
  title: string;
  description: string;
  heroImage: string;
}

export const DEFAULT_LEADERSHIP_HERO: LeadershipHeroSection = {
  title: 'Meet Our Team',
  description: 'Meet our team of dedicated leaders at NEIEA, a passionate group committed to empowering communities through innovative education and skill-building programs. With diverse backgrounds in teaching, administration, technology, and outreach, our team brings extensive experience and vision to every project.',
  heroImage: '/assets/images/banner-2.png'
};

export interface ReorderRequest {
  type: 'leadership';
  items: { id: string; display_order: number }[];
}

// Leadership Members API
export const leadershipApi = {
  getAll: async (): Promise<LeadershipMember[]> => {
    const response = await axiosInstance.get('/admin/leadership');
    return response.data.data || response.data; // Handle both formats
  },

  create: async (member: Omit<LeadershipMember, '_id'>, imageFile?: File): Promise<LeadershipMember> => {
    if (imageFile) {
      // Use FormData for file upload
      const formData = new FormData();
      formData.append('name', member.name);
      formData.append('title', member.title);
      formData.append('description', member.description);
      formData.append('category', member.category);
      formData.append('hasImage', String(member.hasImage ?? true));
      if (member.fullBio) formData.append('fullBio', member.fullBio);
      formData.append('image', imageFile);
      
      const response = await axiosInstance.post('/admin/leadership', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.data || response.data;
    } else {
      // Regular JSON request for non-file uploads
      const response = await axiosInstance.post('/admin/leadership', member);
      return response.data.data || response.data;
    }
  },

  update: async (id: string, member: Partial<LeadershipMember>, imageFile?: File): Promise<LeadershipMember> => {
    if (imageFile) {
      // Use FormData for file upload
      const formData = new FormData();
      Object.keys(member).forEach(key => {
        if (key !== 'image' && member[key as keyof LeadershipMember] !== undefined) {
          formData.append(key, String(member[key as keyof LeadershipMember]));
        }
      });
      formData.append('image', imageFile);
      
      const response = await axiosInstance.put(`/admin/leadership/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.data || response.data;
    } else {
      // Regular JSON request for non-file uploads
      const response = await axiosInstance.put(`/admin/leadership/${id}`, member);
      return response.data.data || response.data;
    }
  },

  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/admin/leadership/${id}`);
  }
};

// Public APIs (for landing page) - These don't need authentication
export const publicLeadershipApi = {
  getLeadershipMembers: async (): Promise<LeadershipMember[]> => {
    const response = await axiosInstance.get('/leadership');
    return response.data.data || response.data; // Handle both formats
  },

  getLeadershipHero: async (): Promise<LeadershipHeroSection> => {
    const response = await axiosInstance.get('/leadership-page');
    const data = response.data.data || response.data;
    const heroSection = data?.heroSection || data;
    return {
      title: heroSection?.title || DEFAULT_LEADERSHIP_HERO.title,
      description: heroSection?.description || DEFAULT_LEADERSHIP_HERO.description,
      heroImage: heroSection?.heroImage || DEFAULT_LEADERSHIP_HERO.heroImage
    };
  },

  getMemberBio: async (slug: string): Promise<{member: LeadershipMember, relatedMembers: LeadershipMember[]}> => {
    const response = await axiosInstance.get(`/leadership/bio/${slug}`);
    return response.data.data || response.data;
  },

  getMembersByCategory: async (category: 'directors' | 'advisors' | 'staff'): Promise<LeadershipMember[]> => {
    const response = await axiosInstance.get(`/leadership/category/${category}`);
    return response.data.data || response.data;
  }
};

// Reorder API
export const reorderLeadership = async (reorderData: ReorderRequest): Promise<void> => {
  await axiosInstance.post('/admin/leadership/reorder', reorderData);
};
