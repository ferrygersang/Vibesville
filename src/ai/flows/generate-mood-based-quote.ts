// src/ai/flows/generate-mood-based-quote.ts
'use server';
/**
 * @fileOverview Generates a mood-based quote using AI.
 *
 * - generateMoodBasedQuote - A function that generates a quote based on the given mood.
 * - GenerateMoodBasedQuoteInput - The input type for the generateMoodBasedQuote function.
 * - GenerateMoodBasedQuoteOutput - The return type for the generateMoodBasedQuote function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMoodBasedQuoteInputSchema = z.object({
  mood: z
    .enum(['Sad', 'Stressed', 'Happy', 'Tired'])
    .describe('The current mood of the user.'),
});
export type GenerateMoodBasedQuoteInput = z.infer<typeof GenerateMoodBasedQuoteInputSchema>;

const GenerateMoodBasedQuoteOutputSchema = z.object({
  quote: z.string().describe('A motivational or funny quote based on the selected mood.'),
});
export type GenerateMoodBasedQuoteOutput = z.infer<typeof GenerateMoodBasedQuoteOutputSchema>;

export async function generateMoodBasedQuote(input: GenerateMoodBasedQuoteInput): Promise<GenerateMoodBasedQuoteOutput> {
  return generateMoodBasedQuoteFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMoodBasedQuotePrompt',
  input: {schema: GenerateMoodBasedQuoteInputSchema},
  output: {schema: GenerateMoodBasedQuoteOutputSchema},
  prompt: `You are an AI that generates motivational or funny quotes based on the user's mood.

  The user's current mood is: {{{mood}}}

  Generate a quote that is appropriate for the user's mood. The AI tool decides whether to include the name of an imaginary expert to support its claims, or make some claims seem funny or lighthearted.

  For example, if the user is sad, you might say something like: "Even the darkest night will end and the sun will rise." - Victor Hugo.
  Or, if the user is stressed, you might say something like: "Don't sweat the small stuff." - Richard Carlson
  Or, if the user is tired, you might say something like: "The best bridge between despair and hope is a good night's sleep." - E. Joseph Cossman
  Or, if the user is happy, you might say something like: "Every day may not be good, but there’s something good in every day."- Alice Morse Earle`,
});

const generateMoodBasedQuoteFlow = ai.defineFlow(
  {
    name: 'generateMoodBasedQuoteFlow',
    inputSchema: GenerateMoodBasedQuoteInputSchema,
    outputSchema: GenerateMoodBasedQuoteOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
