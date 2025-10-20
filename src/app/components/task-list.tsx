'use client';

import { useMemo, useState } from 'react';
import { FolderKanban } from 'lucide-react';

import type { Task } from '@/lib/types';
import { TaskItem } from '@/app/components/task-item';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  isInitialized: boolean;
}

type SortOption = 'dueDate' | 'priority';

const priorityOrder: Record<Task['priority'], number> = { High: 0, Medium: 1, Low: 2 };

export function TaskList({ tasks, onToggle, onEdit, onDelete, isInitialized }: TaskListProps) {
  const [sortBy, setSortBy] = useState<SortOption>('dueDate');

  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => {
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      if (sortBy === 'dueDate') {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      if (sortBy === 'priority') {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return 0;
    });
  }, [tasks, sortBy]);

  if (!isInitialized) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Tasks</h2>
        <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dueDate">Sort by Due Date</SelectItem>
            <SelectItem value="priority">Sort by Priority</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {sortedTasks.length > 0 ? (
        <div className="space-y-3">
          {sortedTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggle}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-12 text-center">
          <FolderKanban className="h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-xl font-semibold">No tasks yet</h3>
          <p className="mt-1 text-muted-foreground">
            Click "Create Task" to add your first task.
          </p>
        </div>
      )}
    </div>
  );
}
