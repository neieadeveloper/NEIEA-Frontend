import { useState, useEffect } from 'react';
import { globalPartnersApi } from '../lib/globalPartnersApi';

export const useGlobalPartners = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPartners();
  }, []);

  const loadPartners = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await globalPartnersApi.getAllPublic();
      setPartners(data);
    } catch (err) {
      setError('Failed to load global partners');
      console.error('Error loading global partners:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    partners,
    loading,
    error,
    refetch: loadPartners
  };
};

export const useGlobalPartnerBySlug = (slug) => {
  const [partner, setPartner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (slug) {
      loadPartner();
    }
  }, [slug]);

  const loadPartner = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await globalPartnersApi.getBySlug(slug);
      setPartner(data);
    } catch (err) {
      setError('Failed to load partner details');
      console.error('Error loading partner:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    partner,
    loading,
    error,
    refetch: loadPartner
  };
};

