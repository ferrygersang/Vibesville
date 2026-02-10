export type Mood = 'Happy' | 'Sad' | 'Stressed' | 'Tired';

export type MoodRecord = {
  mood: Mood;
  date: string; // ISO string
};
