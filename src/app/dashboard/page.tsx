'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged, signOut, type User } from 'firebase/auth';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { AppLogo } from '@/app/components/icons';
import { TaskManager } from '@/app/components/task-manager';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export default function DashboardPage() {
  const router = useRouter();
  const auth = getAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push('/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth, router]);

  const handleSignOut = async () => {
    await signOut(auth);
    toast({
      title: 'Signed Out',
      description: 'You have been successfully signed out.',
    });
    router.push('/');
  };

  if (loading) {
    return (
       <div className="flex flex-col h-full">
        <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b">
            <div className="container mx-auto px-4">
            <div className="flex h-16 items-center justify-between">
                <div className="flex items-center gap-2">
                    <AppLogo className="h-7 w-7" />
                    <h1 className="text-xl font-bold tracking-tight">React TaskMaster</h1>
                </div>
                <Skeleton className="h-10 w-24" />
            </div>
            </div>
        </header>
        <main className="flex-1 overflow-y-auto">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-3xl mx-auto">
                    <div className="space-y-4">
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-24 w-full" />
                        <Skeleton className="h-24 w-full" />
                        <Skeleton className="h-24 w-full" />
                    </div>
                </div>
            </div>
        </main>
      </div>
    );
  }

  return (
     <div className={cn(
        "flex flex-col h-full",
        !loading && "animate-fade-in-up opacity-0"
     )}>
        <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-2">
                    <AppLogo className="h-7 w-7" />
                    <h1 className="text-xl font-bold tracking-tight">React TaskMaster</h1>
                    </div>
                     <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground hidden sm:inline">
                            {user?.email}
                        </span>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline">
                                Sign Out
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure you want to sign out?</AlertDialogTitle>
                              <AlertDialogDescription>
                                You will be returned to the home page.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={handleSignOut} className={buttonVariants({ variant: 'destructive' })}>
                                Sign Out
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
            </div>
        </header>
        <main className="flex-1 overflow-y-auto bg-background animated-gradient animate-background-pan">
            <TaskManager />
        </main>
     </div>
  );
}
