import { useState, useEffect } from 'react';
import { contactApi, ContactInfo } from '../lib/contactApi';

export const useContact = () => {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadContactInfo();
  }, []);

  const loadContactInfo = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await contactApi.getContactInfo();
      setContactInfo(data);
    } catch (err) {
      setError('Failed to load contact information');
      console.error('Error loading contact information:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    contactInfo,
    loading,
    error,
    refetch: loadContactInfo
  };
};

export const useContactAdmin = () => {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadContactInfo();
  }, []);

  const loadContactInfo = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await contactApi.getContactInfoAdmin();
      setContactInfo(data);
    } catch (err) {
      setError('Failed to load contact information');
      console.error('Error loading contact information:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateContactInfo = async (data: ContactInfo) => {
    try {
      const updatedInfo = await contactApi.updateContactInfo(data);
      setContactInfo(updatedInfo);
      return updatedInfo;
    } catch (err) {
      console.error('Error updating contact information:', err);
      throw err;
    }
  };

  return {
    contactInfo,
    loading,
    error,
    updateContactInfo,
    refetch: loadContactInfo
  };
};
