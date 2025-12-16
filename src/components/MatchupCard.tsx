import { Clock, ChevronRight, BarChart3 } from 'lucide-react';
import type { MatchupWithDetails } from '../types/database';
import { formatMoneyline, formatSpread, formatTotal, formatGameTime } from '../utils/format';

interface MatchupCardProps {
  matchup: MatchupWithDetails;
  onViewAnalysis: (matchup: MatchupWithDetails) => void;
}

export function MatchupCard({ matchup, onViewAnalysis }: MatchupCardProps) {
  const latestOdds = matchup.odds[0];
  const hasAnalysis = matchup.analyses.length > 0;

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden hover:border-slate-600 transition-colors">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800/50 border-b border-slate-700">
        <span className="text-xs font-medium text-emerald-400 uppercase tracking-wider">
          {matchup.league.name}
        </span>
        <div className="flex items-center gap-1.5 text-slate-400">
          <Clock className="w-3.5 h-3.5" />
          <span className="text-xs">{formatGameTime(matchup.game_time)}</span>
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-3 gap-4 items-center mb-4">
          <div className="text-center">
            <div className="text-lg font-bold text-white">{matchup.away_team.abbreviation}</div>
            <div className="text-xs text-slate-400">{matchup.away_team.city}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-slate-500 font-medium">@</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-white">{matchup.home_team.abbreviation}</div>
            <div className="text-xs text-slate-400">{matchup.home_team.city}</div>
          </div>
        </div>

        {latestOdds && (
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="bg-slate-900/50 rounded-lg p-2 text-center">
              <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Spread</div>
              <div className="text-sm font-semibold text-slate-200">
                {formatSpread(latestOdds.spread)}
              </div>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-2 text-center">
              <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Total</div>
              <div className="text-sm font-semibold text-slate-200">
                {formatTotal(latestOdds.total)}
              </div>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-2 text-center">
              <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">ML</div>
              <div className="text-sm font-semibold text-slate-200">
                {formatMoneyline(latestOdds.home_moneyline)}
              </div>
            </div>
          </div>
        )}

        <button
          onClick={() => onViewAnalysis(matchup)}
          disabled={!hasAnalysis}
          className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            hasAnalysis
              ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
              : 'bg-slate-700 text-slate-400 cursor-not-allowed'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          {hasAnalysis ? 'View Analysis' : 'No Analysis Available'}
          {hasAnalysis && <ChevronRight className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}