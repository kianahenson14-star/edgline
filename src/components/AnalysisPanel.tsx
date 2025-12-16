import { X, TrendingUp, AlertTriangle, BarChart2, Target, Shield } from 'lucide-react';
import type { MatchupWithDetails } from '../types/database';
import {
  formatMoneyline,
  formatSpread,
  formatTotal,
  formatFullDate,
  getConfidenceLabel,
  getConfidenceColor,
} from '../utils/format';

interface AnalysisPanelProps {
  matchup: MatchupWithDetails;
  onClose: () => void;
}

export function AnalysisPanel({ matchup, onClose }: AnalysisPanelProps) {
  const analysis = matchup.analyses[0];
  const latestOdds = matchup.odds[0];

  if (!analysis) return null;

  const metrics = analysis.key_metrics as Record<string, unknown>;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative min-h-screen flex items-start justify-center p-4 pt-20">
        <div className="relative w-full max-w-2xl bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden">
          <div className="sticky top-0 z-10 bg-slate-900 border-b border-slate-700">
            <div className="flex items-center justify-between p-4">
              <div>
                <span className="text-xs font-medium text-emerald-400 uppercase tracking-wider">
                  {matchup.league.name} Analysis
                </span>
                <h2 className="text-lg font-semibold text-white mt-1">
                  {matchup.away_team.name} @ {matchup.home_team.name}
                </h2>
                <p className="text-sm text-slate-400">{formatFullDate(matchup.game_time)}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-4 space-y-6">
            {latestOdds && (
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                    Line Summary
                  </h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-slate-800 rounded-lg p-3">
                    <div className="text-xs text-slate-400 mb-1">Spread</div>
                    <div className="text-lg font-semibold text-white">
                      {matchup.home_team.abbreviation} {formatSpread(latestOdds.spread)}
                    </div>
                    <div className="text-xs text-slate-500">
                      ({formatMoneyline(latestOdds.spread_odds_home)})
                    </div>
                  </div>
                  <div className="bg-slate-800 rounded-lg p-3">
                    <div className="text-xs text-slate-400 mb-1">Total</div>
                    <div className="text-lg font-semibold text-white">
                      O/U {formatTotal(latestOdds.total)}
                    </div>
                    <div className="text-xs text-slate-500">
                      O ({formatMoneyline(latestOdds.over_odds)}) / U ({formatMoneyline(latestOdds.under_odds)})
                    </div>
                  </div>
                  <div className="bg-slate-800 rounded-lg p-3">
                    <div className="text-xs text-slate-400 mb-1">{matchup.home_team.abbreviation} ML</div>
                    <div className="text-lg font-semibold text-white">
                      {formatMoneyline(latestOdds.home_moneyline)}
                    </div>
                  </div>
                  <div className="bg-slate-800 rounded-lg p-3">
                    <div className="text-xs text-slate-400 mb-1">{matchup.away_team.abbreviation} ML</div>
                    <div className="text-lg font-semibold text-white">
                      {formatMoneyline(latestOdds.away_moneyline)}
                    </div>
                  </div>
                </div>
              </section>
            )}

            <section>
              <div className="flex items-center gap-2 mb-3">
                <BarChart2 className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                  Key Metrics & Insights
                </h3>
              </div>
              <div className="bg-slate-800 rounded-lg p-4">
                <p className="text-slate-300 text-sm leading-relaxed mb-4">{analysis.summary}</p>
                {Object.keys(metrics).length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-3 border-t border-slate-700">
                    {Object.entries(metrics).map(([key, value]) => (
                      <div key={key} className="text-center py-2">
                        <div className="text-xs text-slate-500 capitalize">
                          {key.replace(/_/g, ' ')}
                        </div>
                        <div className="text-sm font-medium text-slate-200">
                          {String(value)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                  Analytical Lean
                </h3>
              </div>
              <div className="bg-slate-800 rounded-lg p-4">
                <p className="text-slate-300 text-sm leading-relaxed">{analysis.analytical_lean}</p>
                <div className="flex items-center gap-3 mt-4 pt-3 border-t border-slate-700">
                  <span className="text-xs text-slate-400">Data Confidence:</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`w-2 h-6 rounded-sm ${
                          level <= analysis.confidence_level
                            ? 'bg-emerald-500'
                            : 'bg-slate-700'
                        }`}
                      />
                    ))}
                  </div>
                  <span className={`text-sm font-medium ${getConfidenceColor(analysis.confidence_level)}`}>
                    {getConfidenceLabel(analysis.confidence_level)}
                  </span>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                  Risk & Bankroll Note
                </h3>
              </div>
              <div className="bg-amber-950/30 border border-amber-900/50 rounded-lg p-4">
                <p className="text-amber-200/90 text-sm leading-relaxed">{analysis.risk_note}</p>
              </div>
            </section>

            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-slate-400 leading-relaxed">
                  <strong className="text-slate-300">Disclaimer:</strong> This analysis is for informational
                  purposes only and does not constitute financial or gambling advice. Past performance does
                  not guarantee future results. Always gamble responsibly and within your means.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}