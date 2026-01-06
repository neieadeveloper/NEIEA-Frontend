// src/hooks/useLeadership.ts
import { useState, useEffect } from 'react';
import { DEFAULT_LEADERSHIP_HERO, LeadershipHeroSection, LeadershipMember, publicLeadershipApi } from '@/lib/leadershipApi';

export const useLeadership = () => {
  const [leadershipMembers, setLeadershipMembers] = useState<LeadershipMember[]>([]);
  const [heroSection, setHeroSection] = useState<LeadershipHeroSection>(DEFAULT_LEADERSHIP_HERO);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadLeadershipMembers();
  }, []);

  const loadLeadershipMembers = async () => {
    try {
      setLoading(true);
      const [members, hero] = await Promise.all([
        publicLeadershipApi.getLeadershipMembers(),
        publicLeadershipApi.getLeadershipHero().catch((heroError) => {
          console.error('Error loading leadership hero section:', heroError);
          return DEFAULT_LEADERSHIP_HERO;
        })
      ]);

      console.log('Public API Response:', members); // Debug log
      setLeadershipMembers(Array.isArray(members) ? members : []);
      setHeroSection(hero || DEFAULT_LEADERSHIP_HERO);
    } catch (err) {
      setError('Failed to load leadership members');
      console.error('Error loading leadership members:', err);
      setLeadershipMembers([]); // Set empty array on error
      setHeroSection(DEFAULT_LEADERSHIP_HERO);
    } finally {
      setLoading(false);
    }
  };

  const getMembersByCategory = (category: 'directors' | 'advisors' | 'staff') => {
    if (!leadershipMembers || !Array.isArray(leadershipMembers)) {
      console.log('No leadershipMembers or not array:', leadershipMembers); // Debug log
      return [];
    }
    const filtered = leadershipMembers.filter(member => member.category === category);
    console.log('Filtered leadershipMembers for', category, ':', filtered); // Debug log
    return filtered;
  };

  return {
    leadershipMembers,
    heroSection,
    getMembersByCategory,
    loading,
    error,
    refetch: loadLeadershipMembers
  };
};
