// This is a server-side file.
'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating land recommendations based on user preferences.
 *
 * - generateLandRecommendation - A function that takes user preferences as input and returns a list of recommended land listings.
 * - LandRecommendationInput - The input type for the generateLandRecommendation function.
 * - LandRecommendationOutput - The output type for the generateLandRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LandRecommendationInputSchema = z.object({
  location: z.string().describe('The desired location of the land.'),
  area: z.string().describe('The desired area of the land (e.g., in acres or square feet).'),
  price: z.string().describe('The desired price range for the land.'),
});
export type LandRecommendationInput = z.infer<typeof LandRecommendationInputSchema>;

const LandRecommendationOutputSchema = z.object({
  recommendations: z.array(
    z.object({
      landId: z.string().describe('The unique identifier of the land listing.'),
      description: z.string().describe('A brief description of the land.'),
      suitabilityScore: z.number().describe('A score indicating how well the land matches the user preferences (0-1).'),
    })
  ).describe('A list of recommended land listings based on the user preferences.'),
});
export type LandRecommendationOutput = z.infer<typeof LandRecommendationOutputSchema>;

export async function generateLandRecommendation(input: LandRecommendationInput): Promise<LandRecommendationOutput> {
  return generateLandRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'landRecommendationPrompt',
  input: {schema: LandRecommendationInputSchema},
  output: {schema: LandRecommendationOutputSchema},
  prompt: `You are an expert real estate agent specializing in land properties. Based on the user's preferences for location, area, and price, you will provide a list of recommended land listings.

  User Preferences:
  - Location: {{{location}}}
  - Area: {{{area}}}
  - Price: {{{price}}}

  Please provide the recommendations in the following JSON format:
  {{$instructions}}
  `,
});

const generateLandRecommendationFlow = ai.defineFlow(
  {
    name: 'generateLandRecommendationFlow',
    inputSchema: LandRecommendationInputSchema,
    outputSchema: LandRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
