'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { AppLogo } from '@/app/components/icons';
import { useTasks } from '@/app/hooks/use-tasks';
import { TaskList } from '@/app/components/task-list';
import { TaskForm } from '@/app/components/task-form';
import type { Task } from '@/lib/types';

export function TaskManager() {
  const { tasks, addTask, updateTask, deleteTask, toggleTaskCompletion, isInitialized } = useTasks();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleSave = (taskData: Omit<Task, 'id' | 'completed'> | Task) => {
    if ('id' in taskData) {
      updateTask(taskData);
    } else {
      addTask(taskData);
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
  };

  const isEditOpen = !!editingTask;
  const closeEditDialog = () => setEditingTask(null);

  return (
    <div className="flex flex-col h-full">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <AppLogo className="h-7 w-7" />
              <h1 className="text-xl font-bold tracking-tight">React TaskMaster</h1>
            </div>
            <Button onClick={() => setIsCreateOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Task
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <TaskList
              tasks={tasks}
              onToggle={toggleTaskCompletion}
              onEdit={handleEdit}
              onDelete={deleteTask}
              isInitialized={isInitialized}
            />
          </div>
        </div>
      </main>

      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Create a new task</DialogTitle>
          </DialogHeader>
          <TaskForm
            onSave={handleSave}
            onClose={() => setIsCreateOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isEditOpen} onOpenChange={(open) => !open && closeEditDialog()}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Edit task</DialogTitle>
          </DialogHeader>
          {editingTask && (
            <TaskForm
              task={editingTask}
              onSave={handleSave}
              onClose={closeEditDialog}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
