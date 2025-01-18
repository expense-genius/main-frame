"use client";

import { useEffect, useState } from "react";
import { PlaidLinkOptions, usePlaidLink } from "react-plaid-link";
import { useAuth } from "@/contexts/authContext";
import { EGLogo, RedirectHandler } from "@/components/common";
import { fetchLinkToken, exchangeAndSetPublicToken } from "./logic";
import { useRouter } from "next/navigation";

const ConnectBanksPage = () => {
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    return <RedirectHandler />;
  }

  const handleConnectBank = async () => {
    const linkToken = await fetchLinkToken();
    setLinkToken(linkToken);
  };

  //Initializes the Plaid Link widget with the provided link token.
  // Calls exchangeAndSetPublicToken on successful completion.
  const config: PlaidLinkOptions = {
    token: linkToken,
    onSuccess: async (public_token, metadata) => {
      console.log(`Finished with link! ${JSON.stringify(metadata)}`);
      await exchangeAndSetPublicToken(public_token);

      // Redirect to the dashboard (TODO: Ask if they want to connect another bank else redirect to dashboard)
      router.push("/dashboard");
    },
    onExit: (error, metadata) => {
      console.log(
        `Exited with error: ${JSON.stringify(error)} and Metadata: ${JSON.stringify(metadata)}`
      );
      if (error) {
        console.error("Plaid Link error:", error);
      }
    },
  };

  const { open, ready } = usePlaidLink(config);

  useEffect(() => {
    console.log("Link Token:", linkToken);
    console.log("Ready:", ready);
    if (linkToken && ready) {
      open();
    }
  }, [linkToken, open]);

  return (
    <main className="relative min-h-screen bg-gray-50 text-gray-900 font-sans overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-400 to-gray-100 z-0"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-pattern bg-opacity-50"></div>
      <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-r from-green-300 to-teal-400 rounded-full blur-3xl opacity-30"></div>

      {/* Header */}
      <header className="absolute top-0 left-0 w-full flex justify-between items-center p-6 z-50">
        <EGLogo />
      </header>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        <div className="bg-white shadow-xl rounded-lg p-8 text-center max-w-xl w-full">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Connect Your Bank
          </h1>
          <p className="text-gray-600 mb-6">
            Securely connect your bank account to track spending, manage
            finances, and gain personalized insights.
          </p>

          {/* Plaid Connect Button */}
          <button
            onClick={handleConnectBank}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-lg hover:scale-105 transition-transform"
          >
            Connect Bank
          </button>

          <p className="text-sm text-gray-400 mt-4">
            Your data is encrypted and secured with industry-leading standards.
          </p>
        </div>
      </section>
    </main>
  );
};

export default ConnectBanksPage;
