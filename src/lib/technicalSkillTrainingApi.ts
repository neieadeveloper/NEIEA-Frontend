import axiosInstance from '@/lib/axiosInstance';

export type TSTItem = {
  _id?: string;
  icon?: string;
  title: string;
  description?: string;
  image?: string;
  display_order?: number;
};

export type TSTPage = {
  _id?: string;
  heroSection: { title: string; subtitle?: string; description?: string; heroImage?: string };
  introduction: { heading: string; description: string };
  solutionSection?: { heading?: string; description?: string };
  toolsSection: { heading?: string; tools: string[] };
  targetGroupsSection: { heading?: string; groups: TSTItem[] };
  learningModesSection: { heading?: string; description?: string; modes: TSTItem[] };
  impactAreasSection: { heading?: string; description?: string; areas: TSTItem[] };
  testimonialsSection: { heading?: string; description?: string; testimonials: { _id?: string; text: string; author?: string; role?: string; display_order?: number }[] };
};

export const technicalSkillTrainingPublicApi = {
  async get() {
    const res = await axiosInstance.get('/technical-skill-training-page');
    return res.data.data as TSTPage;
  },
};

export const technicalSkillTrainingAdminApi = {
  async get() {
    const res = await axiosInstance.get('/admin/technical-skill-training-page');
    return res.data.data as (TSTPage | null);
  },
  async create(payload: TSTPage) {
    const res = await axiosInstance.post('/admin/technical-skill-training-page', payload);
    return res.data.data as TSTPage;
  },
  async update(payload: Partial<TSTPage>) {
    const res = await axiosInstance.put('/admin/technical-skill-training-page', payload);
    return res.data.data as TSTPage;
  },
  async reorder(section: 'targetGroups' | 'learningModes' | 'impactAreas' | 'testimonials', items: { id: string; display_order: number }[]) {
    await axiosInstance.post('/admin/technical-skill-training-page/reorder', { section, items });
  },
  async uploadHeroImage(file: File) {
    const fd = new FormData();
    fd.append('heroImage', file);
    const res = await axiosInstance.post('/admin/technical-skill-training-page/upload-hero-image', fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    if (res.data.success && res.data.data) {
      return res.data.data as TSTPage;
    }
    throw new Error(res.data.message || 'Upload failed');
  },
  async uploadLearningModeImage(itemId: string, file: File) {
    const fd = new FormData();
    fd.append('modeImage', file);
    await axiosInstance.post(`/admin/technical-skill-training-page/learning-mode/${itemId}/upload-image`, fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};


