import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
      <h1 className="text-4xl font-bold mb-4">Welcome to My App</h1>
      <p className="text-lg mb-6 text-secondary-foreground">
        Build your next app with Next.js and Supabase.
      </p>
      <div className="flex gap-4">
        <Link href="/sign-in">
          <button
            type="button"
            className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/80"
          >
            Sign In
          </button>
        </Link>
        <Link href="/sign-up">
          <button
            type="button"
            className="px-6 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80"
          >
            Sign Up
          </button>
        </Link>
      </div>
    </main>
  );
}
