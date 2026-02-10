'use client';

import { useState, useEffect } from 'react';
import { MoodSelector } from '@/components/mood-selector';
import { QuoteCard } from '@/components/quote-card';
import { MoodTrends } from '@/components/mood-trends';
import { generateMoodBasedQuote } from '@/ai/flows/generate-mood-based-quote';
import type { Mood, MoodRecord } from '@/lib/types';
import { useToast } from "@/hooks/use-toast";
import { Sparkles } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'vibesville_mood_history';

export default function Home() {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [generatedQuote, setGeneratedQuote] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [moodHistory, setMoodHistory] = useState<MoodRecord[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedHistory) {
        setMoodHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error("Failed to load mood history from localStorage", error);
    }
  }, []);

  const saveMoodToHistory = (mood: Mood) => {
    setMoodHistory(prevHistory => {
      const newRecord: MoodRecord = { mood, date: new Date().toISOString() };
      const updatedHistory = [...prevHistory, newRecord];
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedHistory));
      } catch (error) {
        console.error("Failed to save mood history to localStorage", error);
      }
      return updatedHistory;
    });
  };

  const handleMoodSelect = async (mood: Mood) => {
    setSelectedMood(mood);
    setIsLoading(true);
    setGeneratedQuote(null);
    try {
      const result = await generateMoodBasedQuote({ mood });
      setGeneratedQuote(result.quote);
      saveMoodToHistory(mood);
    } catch (error) {
      console.error("AI quote generation failed:", error);
      toast({
        variant: "destructive",
        title: "Oh no! Something went wrong.",
        description: "We couldn't generate a quote for you. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-8">
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-12">
        <header className="text-center">
          <h1 className="font-headline text-6xl md:text-7xl flex items-center gap-3">
            <Sparkles className="w-12 h-12 text-primary" />
            Vibesville
          </h1>
          <p className="font-body text-xl text-muted-foreground mt-2">How are you vibing today?</p>
        </header>

        <MoodSelector
          onSelectMood={handleMoodSelect}
          isLoading={isLoading}
          selectedMood={selectedMood}
        />

        <QuoteCard quote={generatedQuote} isLoading={isLoading} />
        
        <MoodTrends history={moodHistory} />
      </div>
    </div>
  );
}
