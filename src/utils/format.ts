export function formatMoneyline(value: number): string {
  return value > 0 ? `+${value}` : `${value}`;
}

export function formatSpread(value: number): string {
  if (value === 0) return 'PK';
  return value > 0 ? `+${value}` : `${value}`;
}

export function formatTotal(value: number): string {
  return value.toFixed(1);
}

export function formatGameTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);

  if (diffHours < 0) {
    return 'Started';
  } else if (diffHours < 1) {
    const diffMins = Math.floor(diffMs / (1000 * 60));
    return `${diffMins}m`;
  } else if (diffHours < 24) {
    return `${Math.floor(diffHours)}h`;
  } else {
    const days = Math.floor(diffHours / 24);
    return `${days}d`;
  }
}

export function formatFullDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function getConfidenceLabel(level: number): string {
  const labels: Record<number, string> = {
    1: 'Very Low',
    2: 'Low',
    3: 'Moderate',
    4: 'High',
    5: 'Very High',
  };
  return labels[level] || 'Unknown';
}

export function getConfidenceColor(level: number): string {
  const colors: Record<number, string> = {
    1: 'text-red-500',
    2: 'text-orange-500',
    3: 'text-yellow-500',
    4: 'text-emerald-500',
    5: 'text-emerald-600',
  };
  return colors[level] || 'text-gray-500';
}