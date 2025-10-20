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
import { useTasks } from '@/app/hooks/use-tasks';
import { TaskList } from '@/app/components/task-list';
import { TaskForm } from '@/app/components/task-form';
import type { Task } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export function TaskManager() {
  const { tasks, addTask, updateTask, deleteTask, toggleTaskCompletion, isInitialized } = useTasks();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const { toast } = useToast();

  const handleSave = (taskData: Omit<Task, 'id' | 'completed'> | Task) => {
    if ('id' in taskData) {
      updateTask(taskData);
      toast({
        title: 'Task Updated',
        description: `The task "${taskData.title}" has been successfully updated.`,
      });
    } else {
      addTask(taskData);
      toast({
        title: 'Task Created',
        description: `The task "${taskData.title}" has been successfully created.`,
      });
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
  };
  
  const handleDelete = (id: string) => {
    const taskToDelete = tasks.find(t => t.id === id);
    if(taskToDelete) {
       deleteTask(id);
        toast({
            title: 'Task Deleted',
            description: `The task "${taskToDelete.title}" has been successfully deleted.`,
        });
    }
  };

  const isEditOpen = !!editingTask;
  const closeEditDialog = () => setEditingTask(null);

  return (
    <div className="flex flex-col h-full">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
           <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold tracking-tight">My Tasks</h1>
                <Button onClick={() => setIsCreateOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Task
                </Button>
            </div>
          <TaskList
            tasks={tasks}
            onToggle={toggleTaskCompletion}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isInitialized={isInitialized}
          />
        </div>
      </div>

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
