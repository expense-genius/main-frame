"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import EGLogo from "@/components/common/EGLogo";

interface RedirectHandlerProps {
  redirectTo?: string; // Default is "/" - the homepage
  redirectMessage?: string; // Default is "Authentication required beyond this point."
  redirectPageName?: string; // Default is "the homepage"
  countdownDuration?: number; // Default is 7 seconds
}

/**
 * Creates a redirect handler component that redirects the user to a specified page after a countdown display.
 * @param redirectTo - The page to redirect to (default is the "/" homepage)
 * @param redirectMessage - The message to display to the user (default is "Authentication required beyond this point")
 * @param redirectPageName - The name of the page to redirect to (default is "the homepage")
 * @param countdownDuration - The duration of the countdown in seconds (default is 7 seconds)
 * @returns
 */
const RedirectHandler: React.FC<RedirectHandlerProps> = ({
  redirectTo = "/",
  redirectMessage = "Authentication required beyond this point",
  redirectPageName = "the homepage",
  countdownDuration = 7,
}) => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(countdownDuration);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      router.push(redirectTo);
    }, countdownDuration * 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [redirectTo, countdownDuration, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800">
      {/* The header with the logo */}
      <header className="absolute top-0 left-0 w-full flex justify-between items-center p-6 z-50">
        <EGLogo />
      </header>

      {/* Glowing Elements */}
      <div className="absolute -top-10 left-10 w-72 h-72 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl opacity-50 z-0"></div>
      <div className="absolute bottom-10 -right-10 w-96 h-96 bg-gradient-to-r from-pink-500 to-red-500 rounded-full blur-3xl opacity-50 z-0"></div>

      {/* Redirect Message */}
      <div className="bg-white shadow-lg rounded-lg p-8 text-center z-10">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          {redirectMessage}
        </h1>
        <h2 className="text-lg text-gray-600 mb-6">
          Redirecting to{" "}
          <span className="font-semibold">{redirectPageName}</span> in{" "}
          <span className="font-semibold text-blue-500">{countdown}</span>{" "}
          {countdown === 1 ? "second" : "seconds"}.
        </h2>
        <div className="flex flex-col sm:flex-row sm:justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            onClick={() => router.push(redirectTo)}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-300"
          >
            Click here to go now
          </button>
        </div>
      </div>
    </div>
  );
};

export default RedirectHandler;
