import { ThemeProvider } from "next-themes";
import "./globals.css";

export const metadata = {
  title: "My App",
  description: "A fresh Next.js app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col items-center">
            {/* Page Content */}
            <div className="flex flex-col gap-10 max-w-5xl p-5">{children}</div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
