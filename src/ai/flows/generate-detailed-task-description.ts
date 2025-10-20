'use server';

/**
 * @fileOverview This file defines a Genkit flow to generate a detailed task description based on the task title.
 *
 * - generateDetailedTaskDescription - A function that generates a detailed task description.
 * - GenerateDetailedTaskDescriptionInput - The input type for the generateDetailedTaskDescription function.
 * - GenerateDetailedTaskDescriptionOutput - The output type for the generateDetailedTaskDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDetailedTaskDescriptionInputSchema = z.object({
  taskTitle: z.string().describe('The title of the task.'),
});

export type GenerateDetailedTaskDescriptionInput = z.infer<typeof GenerateDetailedTaskDescriptionInputSchema>;

const GenerateDetailedTaskDescriptionOutputSchema = z.object({
  detailedDescription: z.string().describe('A detailed description of the task.'),
});

export type GenerateDetailedTaskDescriptionOutput = z.infer<typeof GenerateDetailedTaskDescriptionOutputSchema>;

export async function generateDetailedTaskDescription(
  input: GenerateDetailedTaskDescriptionInput
): Promise<GenerateDetailedTaskDescriptionOutput> {
  return generateDetailedTaskDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDetailedTaskDescriptionPrompt',
  input: {schema: GenerateDetailedTaskDescriptionInputSchema},
  output: {schema: GenerateDetailedTaskDescriptionOutputSchema},
  prompt: `You are an AI assistant that generates detailed descriptions for tasks based on their titles.

  Task Title: {{{taskTitle}}}

  Detailed Description:`,
});

const generateDetailedTaskDescriptionFlow = ai.defineFlow(
  {
    name: 'generateDetailedTaskDescriptionFlow',
    inputSchema: GenerateDetailedTaskDescriptionInputSchema,
    outputSchema: GenerateDetailedTaskDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
