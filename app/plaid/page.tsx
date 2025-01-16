"use client";

import { useEffect, useState } from "react";
import { usePlaidLink } from "react-plaid-link";

const TestPlaidPage = () => {
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>("access-sandbox-fa6ba2a8-cead-4817-b41d-74b8e5b0b4f5");
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch the link token for initializing Plaid Link
  const fetchLinkToken = async () => {
    try {
      setError(null);
      const response = await fetch("/api/plaid/create-link-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Failed to fetch link token");

      const data = await response.json();
      setLinkToken(data.link_token);
    } catch (err) {
      console.error("Error fetching link token:", err);
      setError("Failed to fetch link token. Please try again.");
    }
  };

  // Fetch accounts and paginated transactions using the access token
  const fetchAccountsAndTransactions = async () => {
    try {
      if (!accessToken) {
        setError("Access token not available. Please try again.");
        return;
      }

      const response = await fetch("/api/plaid/accounts-transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ access_token: accessToken }),
      });

      if (!response.ok)
        throw new Error("Failed to fetch accounts/transactions");

      const data = await response.json();
      console.log("Data:", data); // Debugging log
      setAccounts(data.accounts || []);
      setTransactions(data.transactions || []);
    } catch (err) {
      console.error("Error fetching accounts and transactions:", err);
      setError("Failed to fetch accounts and transactions. Please try again.");
    }
  };

  const { open, ready } = usePlaidLink({
    token: linkToken || "",
    onSuccess: async (publicToken) => {
      try {
        const response = await fetch("/api/plaid/set-access-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ public_token: publicToken }),
        });

        const data = await response.json();
        if (!response.ok || !data.access_token) {
          throw new Error(data.error || "Access token not returned");
        }

        setAccessToken(data.access_token); // Update state with access token
        await fetchAccountsAndTransactions(); // Fetch accounts and transactions
      } catch (err) {
        console.error("Error exchanging public token:", err);
        setError("Failed to exchange public token. Please try again.");
      }
    },
    onExit: (err) => {
      if (err) {
        console.error("Error exiting Plaid Link:", err);
        setError("Exited Plaid Link with an error. Please try again.");
      }
    },
  });

  // Open the Plaid widget automatically when linkToken is set and ready
  useEffect(() => {
    if (linkToken && ready) {
      open();
    }
  }, [linkToken, ready, open]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Plaid Link Test</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <button
        onClick={fetchLinkToken}
        disabled={linkToken !== null} // Prevent multiple fetches
        className={`px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg ${
          linkToken ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Connect
      </button>

      {accounts.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Accounts</h2>
          <ul>
            {accounts.map((account: any, index: number) => (
              <div
                key={index}
                className="mb-4 p-4 border border-gray-300 rounded-md"
              >
                <pre className="bg-gray-100 p-2 rounded-md text-sm">
                  {JSON.stringify(account, null, 2)}
                </pre>
              </div>
            ))}
          </ul>
        </div>
      )}

      {transactions.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Transactions</h2>
          <ul>
            {transactions.map((transaction: any, index: number) => (
              <li key={index} className="mb-2">
                {transaction.name} - {transaction.amount}{" "}
                {transaction.iso_currency_code}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TestPlaidPage;
