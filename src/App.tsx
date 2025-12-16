import { useState } from 'react';
import { Header } from './components/Header';
import { LeagueTabs } from './components/LeagueTabs';
import { MatchupCard } from './components/MatchupCard';
import { AnalysisPanel } from './components/AnalysisPanel';
import { LoadingSpinner } from './components/LoadingSpinner';
import { EmptyState } from './components/EmptyState';
import { useMatchups } from './hooks/useMatchups';
import type { MatchupWithDetails } from './types/database';

function App() {
  const [selectedLeague, setSelectedLeague] = useState<string | null>(null);
  const [selectedMatchup, setSelectedMatchup] = useState<MatchupWithDetails | null>(null);
  const { matchups, leagues, loading, error } = useMatchups(selectedLeague);

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Upcoming Matchups</h2>
          <p className="text-slate-400 mb-6">
            Data-driven analysis for informed decisions. Remember: always wager responsibly.
          </p>
          <LeagueTabs
            leagues={leagues}
            selectedLeague={selectedLeague}
            onSelect={setSelectedLeague}
          />
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="bg-red-950/30 border border-red-900/50 rounded-lg p-4 text-red-200">
            Error loading matchups: {error}
          </div>
        ) : matchups.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {matchups.map((matchup) => (
              <MatchupCard
                key={matchup.id}
                matchup={matchup}
                onViewAnalysis={setSelectedMatchup}
              />
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-slate-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-slate-500 text-sm">
            <p className="mb-2">
              EdgeLine provides analytical insights for educational purposes only.
            </p>
            <p>
              This is not financial advice. Gambling involves risk. Please wager responsibly.
            </p>
          </div>
        </div>
      </footer>

      {selectedMatchup && (
        <AnalysisPanel
          matchup={selectedMatchup}
          onClose={() => setSelectedMatchup(null)}
        />
      )}
    </div>
  );
}

export default App;