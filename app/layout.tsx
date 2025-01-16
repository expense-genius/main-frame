import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/contexts/authContext";
import "./globals.css";

export const metadata = {
  title: "Expense Genius - Smarter Financial Management",
  description:
    "Take control of your finances with Expense Genius. Track expenses, analyze spending patterns, and get AI-powered insights to achieve your financial goals effortlessly.",
  keywords: [
    "Expense Genius",
    "finance app",
    "expense tracker",
    "AI-powered finance",
    "financial management",
    "budgeting app",
    "personal finance",
    "money management",
  ],
  author: "Expense Genius Team",
  applicationName: "Expense Genius",
  openGraph: {
    title: "Expense Genius - Smarter Financial Management",
    description:
      "Empower your financial journey with Expense Genius. Track spending, save smarter, and achieve your goals with AI-powered insights.",
    url: "https://expensegenius.ai",
    siteName: "Expense Genius",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="w-full h-full">
      <body className="bg-background text-foreground w-full h-full m-0 p-0">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <main className="min-h-screen w-full flex flex-col">{children}</main>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}