import { Calendar } from 'lucide-react';

interface EmptyStateProps {
  message?: string;
}

export function EmptyState({ message = 'No upcoming matchups found' }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-4">
        <Calendar className="w-8 h-8 text-slate-500" />
      </div>
      <h3 className="text-lg font-medium text-slate-300 mb-2">{message}</h3>
      <p className="text-sm text-slate-500 max-w-md">
        Check back later for upcoming games and analytics.
      </p>
    </div>
  );
}