export type Priority = 'Low' | 'Medium' | 'High';

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string; // Stored as ISO string
  priority: Priority;
  completed: boolean;
}
