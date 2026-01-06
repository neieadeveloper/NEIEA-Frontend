import { useState, useEffect } from 'react';
import { galleryApi, GalleryItem, GalleryCategory } from '@/lib/galleryApi';

export const useGallery = (category?: string) => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadGalleryItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await galleryApi.public.getAll(category, 1, 300);
      setGalleryItems(response.data);
    } catch (err) {
      setError('Failed to load gallery items');
      console.error('Error loading gallery items:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const response = await galleryApi.public.getCategories();
      setCategories(response.data);
    } catch (err) {
      console.error('Error loading categories:', err);
    }
  };

  useEffect(() => {
    loadGalleryItems();
    loadCategories();
  }, [category]);

  return {
    galleryItems,
    categories,
    loading,
    error,
    refetch: loadGalleryItems
  };
};

export const useAdminGallery = (category?: string) => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadGalleryItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await galleryApi.admin.getAll(category, 1, 300);
      setGalleryItems(response.data);
    } catch (err) {
      setError('Failed to load gallery items');
      console.error('Error loading gallery items:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGalleryItems();
  }, [category]);

  return {
    galleryItems,
    loading,
    error,
    refetch: loadGalleryItems
  };
};
