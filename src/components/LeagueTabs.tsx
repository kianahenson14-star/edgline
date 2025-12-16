import type { League } from '../types/database';

interface LeagueTabsProps {
  leagues: League[];
  selectedLeague: string | null;
  onSelect: (leagueId: string | null) => void;
}

export function LeagueTabs({ leagues, selectedLeague, onSelect }: LeagueTabsProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2">
      <button
        onClick={() => onSelect(null)}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
          selectedLeague === null
            ? 'bg-emerald-600 text-white'
            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
        }`}
      >
        All Sports
      </button>
      {leagues.map((league) => (
        <button
          key={league.id}
          onClick={() => onSelect(league.id)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
            selectedLeague === league.id
              ? 'bg-emerald-600 text-white'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          {league.name}
        </button>
      ))}
    </div>
  );
}