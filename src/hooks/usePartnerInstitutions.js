import { useState, useEffect } from 'react';
import { publicPartnerInstitutionsApi } from '../lib/partnerInstitutionsApi';

export const usePartnerInstitutions = () => {
  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadInstitutions();
  }, []);

  const loadInstitutions = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await publicPartnerInstitutionsApi.getAll();
      setInstitutions(data);
    } catch (err) {
      setError('Failed to load partner institutions');
      console.error('Error loading partner institutions:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    institutions,
    loading,
    error,
    refetch: loadInstitutions
  };
};

export const usePartnerInstitutionBySlug = (slug) => {
  const [institution, setInstitution] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (slug) {
      loadInstitution();
    }
  }, [slug]);

  const loadInstitution = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await publicPartnerInstitutionsApi.getBySlug(slug);
      setInstitution(data);
    } catch (err) {
      setError('Failed to load institution details');
      console.error('Error loading institution:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    institution,
    loading,
    error,
    refetch: loadInstitution
  };
};

