'use client';

import type { Mood } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Frown, Smile, Bed, Annoyed } from 'lucide-react';
import { cn } from '@/lib/utils';

type MoodOption = {
  mood: Mood;
  icon: React.ReactNode;
  label: string;
  colorClass: string;
};

const moodOptions: MoodOption[] = [
  { mood: 'Happy', icon: <Smile className="h-8 w-8" />, label: 'Happy', colorClass: 'text-chart-4 border-chart-4/50 hover:bg-chart-4/10 hover:border-chart-4' },
  { mood: 'Sad', icon: <Frown className="h-8 w-8" />, label: 'Sad', colorClass: 'text-chart-1 border-chart-1/50 hover:bg-chart-1/10 hover:border-chart-1' },
  { mood: 'Stressed', icon: <Annoyed className="h-8 w-8" />, label: 'Stressed', colorClass: 'text-chart-5 border-chart-5/50 hover:bg-chart-5/10 hover:border-chart-5' },
  { mood: 'Tired', icon: <Bed className="h-8 w-8" />, label: 'Tired', colorClass: 'text-chart-2 border-chart-2/50 hover:bg-chart-2/10 hover:border-chart-2' },
];

type MoodSelectorProps = {
  onSelectMood: (mood: Mood) => void;
  isLoading: boolean;
  selectedMood: Mood | null;
};

export function MoodSelector({ onSelectMood, isLoading, selectedMood }: MoodSelectorProps) {
  return (
    <div className="flex justify-center gap-4 flex-wrap">
      {moodOptions.map(({ mood, icon, label, colorClass }) => (
        <Button
          key={mood}
          onClick={() => onSelectMood(mood)}
          disabled={isLoading}
          variant={selectedMood === mood ? 'default' : 'outline'}
          size="lg"
          className={cn(
            'h-28 w-28 flex-col gap-2 rounded-xl transition-all duration-300',
            selectedMood === mood ? 'scale-110 shadow-lg' : 'hover:scale-105',
            selectedMood !== mood && colorClass
          )}
        >
          {icon}
          <span className="font-headline text-lg">{label}</span>
        </Button>
      ))}
    </div>
  );
}
