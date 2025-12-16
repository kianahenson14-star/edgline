import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { League, MatchupWithDetails } from '../types/database';

export function useMatchups(selectedLeague: string | null) {
  const [matchups, setMatchups] = useState<MatchupWithDetails[]>([]);
  const [leagues, setLeagues] = useState<League[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLeagues() {
      const { data, error } = await supabase
        .from('leagues')
        .select('*')
        .order('name');

      if (error) {
        setError(error.message);
        return;
      }

      setLeagues(data || []);
    }

    fetchLeagues();
  }, []);

  useEffect(() => {
    async function fetchMatchups() {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('matchups')
        .select(`
          *,
          home_team:teams!matchups_home_team_id_fkey(*),
          away_team:teams!matchups_away_team_id_fkey(*),
          league:leagues(*),
          odds(*),
          analyses(*)
        `)
        .gte('game_time', new Date().toISOString())
        .order('game_time', { ascending: true });

      if (selectedLeague) {
        query = query.eq('league_id', selectedLeague);
      }

      const { data, error } = await query;

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      setMatchups((data as MatchupWithDetails[]) || []);
      setLoading(false);
    }

    fetchMatchups();
  }, [selectedLeague]);

  return { matchups, leagues, loading, error };
}