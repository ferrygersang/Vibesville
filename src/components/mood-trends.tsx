'use client';

import type { Mood, MoodRecord } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bar, BarChart, Cell, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

type MoodTrendsProps = {
  history: MoodRecord[];
};

const chartConfig = {
  count: { label: 'Count' },
  Happy: { label: 'Happy', color: 'hsl(var(--chart-4))' },
  Sad: { label: 'Sad', color: 'hsl(var(--chart-1))' },
  Stressed: { label: 'Stressed', color: 'hsl(var(--chart-5))' },
  Tired: { label: 'Tired', color: 'hsl(var(--chart-2))' },
} satisfies ChartConfig;

export function MoodTrends({ history }: MoodTrendsProps) {
  if (history.length === 0) {
    return null;
  }
  
  const moodCounts = history.reduce((acc, record) => {
    acc[record.mood] = (acc[record.mood] || 0) + 1;
    return acc;
  }, {} as Record<Mood, number>);

  const chartData = (['Happy', 'Sad', 'Stressed', 'Tired'] as Mood[]).map((mood) => ({
    mood,
    count: moodCounts[mood] || 0,
  }));

  return (
    <Card className="w-full max-w-2xl animate-in fade-in-50 duration-700 delay-200">
      <CardHeader>
        <CardTitle className="font-headline">Your Mood Trends</CardTitle>
        <CardDescription>A look back at your recent moods.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart accessibilityLayer data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
              <XAxis dataKey="mood" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Bar dataKey="count" radius={4}>
                {chartData.map((entry) => (
                  <Cell key={entry.mood} fill={chartConfig[entry.mood].color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
