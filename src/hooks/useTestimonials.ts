// src/hooks/useTestimonials.ts
import { useState, useEffect } from 'react';
import { publicTestimonialsApi, CardTestimonial, VideoTestimonial } from '@/lib/testimonialsApi';

export const useTestimonials = () => {
  const [cardTestimonials, setCardTestimonials] = useState<CardTestimonial[]>([]);
  const [videoTestimonials, setVideoTestimonials] = useState<VideoTestimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      setLoading(true);
      const [cards, videos] = await Promise.all([
        publicTestimonialsApi.getCardTestimonials(),
        publicTestimonialsApi.getVideoTestimonials()
      ]);
      
      // Data is already filtered for active testimonials and sorted by display_order from backend
      setCardTestimonials(cards);
      setVideoTestimonials(videos);
    } catch (err) {
      setError('Failed to load testimonials');
      console.error('Error loading testimonials:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    cardTestimonials,
    videoTestimonials,
    loading,
    error,
    refetch: loadTestimonials
  };
};