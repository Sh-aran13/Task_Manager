import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AppLogo } from '@/app/components/icons';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen text-center animated-gradient-home animate-background-pan-slow">
      <header className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center text-primary-foreground">
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
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <h2 className="text-4xl font-bold tracking-tight mb-4 sm:text-5xl md:text-6xl text-primary-foreground">
          Welcome to TaskMaster
        </h2>
        <p className="max-w-2xl text-lg text-primary-foreground/80 mb-8 sm:text-xl">
          The modern, AI-powered solution to organize your life and accomplish your goals. Get started by creating an account or logging in.
        </p>
        <div className="space-x-4">
          <Button asChild size="lg">
            <Link href="/register">Get Started</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary">
            <Link href="/login">Sign In</Link>
          </Button>
        </div>
      </main>
      <footer className="w-full p-4 text-center text-sm text-primary-foreground/60">
        <p>&copy; {new Date().getFullYear()} React TaskMaster. All rights reserved.</p>
      </footer>
    </div>
  );
}
