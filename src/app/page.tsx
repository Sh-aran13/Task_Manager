import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AppLogo } from '@/app/components/icons';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-center p-4">
      <header className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <AppLogo className="h-7 w-7" />
          <h1 className="text-xl font-bold tracking-tight">React TaskMaster</h1>
        </div>
        <div className="space-x-2">
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/register">Register</Link>
            </Button>
        </div>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center">
        <h2 className="text-4xl font-bold tracking-tight mb-4 sm:text-5xl md:text-6xl">
          Welcome to TaskMaster
        </h2>
        <p className="max-w-2xl text-lg text-muted-foreground mb-8 sm:text-xl">
          The modern, AI-powered solution to organize your life and accomplish your goals. Get started by creating an account or logging in.
        </p>
        <div className="space-x-4">
          <Button asChild size="lg">
            <Link href="/register">Get Started</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/login">Sign In</Link>
          </Button>
        </div>
      </main>
      <footer className="w-full p-4 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} React TaskMaster. All rights reserved.</p>
      </footer>
    </div>
  );
}
