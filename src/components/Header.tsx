import { Activity, TrendingUp } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-slate-900 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-600">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-white tracking-tight">EdgeLine</h1>
              <p className="text-xs text-slate-400">Sports Analytics</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm">Data-Driven Insights</span>
          </div>
        </div>
      </div>
    </header>
  );
}