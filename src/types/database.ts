export interface Database {
  public: {
    Tables: {
      leagues: {
        Row: {
          id: string;
          name: string;
          sport: string;
          active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          sport: string;
          active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          sport?: string;
          active?: boolean;
          created_at?: string;
        };
      };
      teams: {
        Row: {
          id: string;
          league_id: string;
          name: string;
          abbreviation: string;
          city: string;
          logo_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          league_id: string;
          name: string;
          abbreviation: string;
          city: string;
          logo_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          league_id?: string;
          name?: string;
          abbreviation?: string;
          city?: string;
          logo_url?: string | null;
          created_at?: string;
        };
      };
      matchups: {
        Row: {
          id: string;
          league_id: string;
          home_team_id: string;
          away_team_id: string;
          game_time: string;
          status: string;
          home_score: number | null;
          away_score: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          league_id: string;
          home_team_id: string;
          away_team_id: string;
          game_time: string;
          status?: string;
          home_score?: number | null;
          away_score?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          league_id?: string;
          home_team_id?: string;
          away_team_id?: string;
          game_time?: string;
          status?: string;
          home_score?: number | null;
          away_score?: number | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      odds: {
        Row: {
          id: string;
          matchup_id: string;
          home_moneyline: number;
          away_moneyline: number;
          spread: number;
          spread_odds_home: number;
          spread_odds_away: number;
          total: number;
          over_odds: number;
          under_odds: number;
          recorded_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          matchup_id: string;
          home_moneyline: number;
          away_moneyline: number;
          spread: number;
          spread_odds_home?: number;
          spread_odds_away?: number;
          total: number;
          over_odds?: number;
          under_odds?: number;
          recorded_at?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          matchup_id?: string;
          home_moneyline?: number;
          away_moneyline?: number;
          spread?: number;
          spread_odds_home?: number;
          spread_odds_away?: number;
          total?: number;
          over_odds?: number;
          under_odds?: number;
          recorded_at?: string;
          created_at?: string;
        };
      };
      analyses: {
        Row: {
          id: string;
          matchup_id: string;
          summary: string;
          key_metrics: Record<string, unknown>;
          analytical_lean: string;
          confidence_level: number;
          risk_note: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          matchup_id: string;
          summary: string;
          key_metrics?: Record<string, unknown>;
          analytical_lean: string;
          confidence_level: number;
          risk_note: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          matchup_id?: string;
          summary?: string;
          key_metrics?: Record<string, unknown>;
          analytical_lean?: string;
          confidence_level?: number;
          risk_note?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}

export type League = Database['public']['Tables']['leagues']['Row'];
export type Team = Database['public']['Tables']['teams']['Row'];
export type Matchup = Database['public']['Tables']['matchups']['Row'];
export type Odds = Database['public']['Tables']['odds']['Row'];
export type Analysis = Database['public']['Tables']['analyses']['Row'];

export interface MatchupWithDetails extends Matchup {
  home_team: Team;
  away_team: Team;
  league: League;
  odds: Odds[];
  analyses: Analysis[];
}