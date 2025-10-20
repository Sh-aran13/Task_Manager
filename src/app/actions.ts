'use server';

import { generateDetailedTaskDescription } from '@/ai/flows/generate-detailed-task-description';

export async function getAIDescription(taskTitle: string): Promise<{ detailedDescription: string } | { error: string }> {
  if (!taskTitle) {
    return { error: 'Task title is required to generate a description.' };
  }

  try {
    const description = await generateDetailedTaskDescription({ taskTitle });
    return { detailedDescription: description };
  } catch (error) {
    console.error('AI description generation failed:', error);
    return { error: 'Failed to generate AI description. Please try again.' };
  }
}
