'use server';

/**
 * @fileOverview This file defines a Genkit flow to generate a detailed task description based on the task title.
 *
 * - generateDetailedTaskDescription - A function that generates a detailed task description.
 * - GenerateDetailedTaskDescriptionInput - The input type for the generateDetailedTaskDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {generate} from 'genkit/ai';

const GenerateDetailedTaskDescriptionInputSchema = z.object({
  taskTitle: z.string().describe('The title of the task.'),
});

export type GenerateDetailedTaskDescriptionInput = z.infer<typeof GenerateDetailedTaskDescriptionInputSchema>;


export async function generateDetailedTaskDescription(
  input: GenerateDetailedTaskDescriptionInput
): Promise<string> {
  const llmResponse = await generate({
    model: 'googleai/gemini-2.5-flash',
    prompt: `You are an AI assistant that generates detailed descriptions for tasks based on their titles.

  Task Title: ${input.taskTitle}

  Detailed Description:`,
    output: {
      format: 'text',
    },
  });

  return llmResponse.output() || '';
}
