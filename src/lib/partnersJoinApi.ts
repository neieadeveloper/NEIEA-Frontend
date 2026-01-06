import axiosInstance from './axiosInstance';

export interface PartnersJoinPoint { _id?: string; title: string; description: string; display_order?: number }
export interface PartnersJoinMode { _id?: string; title: string; description: string; display_order?: number }

export interface PartnersJoinPage {
  headerSection: { title: string; subtitle: string; imageUrl?: string; videoLink?: string };
  overviewSection: {
    introductionParagraph: string;
    scalableModel: { title: string; description: string };
    lowCostModelParagraph: string;
    communityPartnerships: { title: string; description1: string; description2: string };
    globalCollaborations: { title: string; description: string };
    transparencyParagraph: string;
  };
  whyCollaborateSection: { title: string; points: PartnersJoinPoint[] };
  howYouCanPartnerSection: { title: string; modes: PartnersJoinMode[] };
  partneringWithCharitiesSection: { title: string; paragraphs: string[]; imageUrl?: string };
  callToActionSection: { title: string; subtitle: string; buttonText: string; buttonLink: string };
}

// Public API
export const partnersJoinPublicApi = {
  get: async (): Promise<PartnersJoinPage> => {
    const res = await axiosInstance.get('/partners-join-page');
    return res.data.data;
  },
};

// Admin API
export const partnersJoinAdminApi = {
  get: async (): Promise<PartnersJoinPage> => {
    const res = await axiosInstance.get('/partners-join-page/admin');
    return res.data.data;
  },
  createOrUpdate: async (payload: Partial<PartnersJoinPage>): Promise<PartnersJoinPage> => {
    const res = await axiosInstance.post('/partners-join-page/admin', payload);
    return res.data.data || res.data;
  },
  update: async (payload: Partial<PartnersJoinPage>): Promise<PartnersJoinPage> => {
    const res = await axiosInstance.put('/partners-join-page/admin', payload);
    return res.data.data || res.data;
  },
  uploadHeaderImage: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('heroImage', file);
    const res = await axiosInstance.post('/partners-join-page/admin/upload-header-image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data.data.imageUrl;
  },
  uploadSymbolicImage: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('symbolicImage', file);
    const res = await axiosInstance.post('/partners-join-page/admin/upload-symbolic-image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data.data.imageUrl;
  },
};


