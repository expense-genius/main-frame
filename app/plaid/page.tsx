"use client";

import { useEffect, useState } from "react";
import { usePlaidLink } from "react-plaid-link";

const TestPlaidPage = () => {
  const [data, setData] = useState<any>(null);
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [accounts, setAccounts] = useState<any[]>([]);

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

  // Fetch accounts data from the server
  const fetchAccounts = async () => {
    try {
      setError(null);
      const response = await fetch("/api/plaid/get-accounts", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Failed to fetch accounts data");

      const data = await response.json();
      setAccounts(data.accounts || []);
      setData(data);
    } catch (err) {
      console.error("Error fetching accounts data:", err);
      setError("Failed to fetch accounts data. Please try again.");
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
        if (!response.ok) {
          throw new Error(data.error || "Failed to save access token.");
        }

        console.log("Access token saved successfully.");
        fetchAccounts(); // Fetch accounts after saving the access token
      } catch (err) {
        console.error("Error saving access token:", err);
        setError("Failed to save access token. Please try again.");
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

  // Fetch accounts on load
  useEffect(() => {
    fetchAccounts();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Plaid Link and Accounts</h1>
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

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Accounts</h2>
        {accounts.length === 0 ? (
          <p>No accounts available. Connect your account to get started.</p>
        ) : (
          <ul className="space-y-4">
            <div>{accounts.length}</div>
            {accounts.map((account) => (
              <li
                key={account.account_id}
                className="p-4 border rounded-lg shadow"
              >
                <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
                  {JSON.stringify(account, null, 2)}
                </pre>
              </li>
            ))}
          </ul>
        )}
        {data && (
          <pre className="bg-gray-100 p-4 rounded-lg mt-4 overflow-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
};

export default TestPlaidPage;
