import { TaskManager } from '@/app/components/task-manager';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="h-full bg-background">
      <div className="absolute top-4 right-4 space-x-2">
        <Button asChild>
          <Link href="/login">Login</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="/register">Register</Link>
        </Button>
      </div>
      <TaskManager />
    </div>
  );
}
