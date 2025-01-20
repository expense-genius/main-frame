"use client";

import { useState, useEffect, use } from "react";
import { useAuth } from "@/contexts/authContext";
import { RedirectHandler, BasicButton } from "@/components/common";
import { fetchAccounts, fetchTransactions } from "./logic";
import { Transaction } from "plaid";

interface Account {
  account_id: string;
  name: string;
  type: string;
  available_balance?: number | null;
  current_balance?: number | null;
  currency: string;
}

export default function DashboardPage() {
  const { user, signOut, signingOut } = useAuth();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    if (user && !signingOut && !isLoggingOut) {
      setLoading(true);
      console.log("Fetching accounts and transactions...");

      Promise.all([fetchAccounts(), fetchTransactions()])
        .then(([accountsData, transactionsData]) => {
          setAccounts(accountsData || []);
          setTransactions(transactionsData || []);
        })
        .catch((error) => {
          console.error("Error fetching accounts or transactions:", error);
        })
        .finally(() => setLoading(false));
    }
  }, [user, signingOut, isLoggingOut]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await signOut();
  };

  if (!user && !isLoggingOut) {
    return (
      <RedirectHandler
        redirectTo="/sign-in"
        redirectPageName="the sign-in page"
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <BasicButton
            name="Log Out"
            onClick={handleLogout}
            color="red"
            additionalClassName="text-white"
          />
        </div>

        <div className="mt-8 bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Your Accounts</h2>
          {loading ? (
            <p>Loading accounts...</p>
          ) : accounts.length > 0 ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-3 border">Account Name</th>
                  <th className="p-3 border">Type</th>
                  <th className="p-3 border">Balance</th>
                  <th className="p-3 border">Currency</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((account) => (
                  <tr key={account.account_id} className="hover:bg-gray-100">
                    <td className="p-3 border">{account.name}</td>
                    <td className="p-3 border">{account.type}</td>
                    <td className="p-3 border">
                      {account.available_balance || account.current_balance}
                    </td>
                    <td className="p-3 border">{account.currency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No accounts found.</p>
          )}
        </div>
        <div className="mt-8 bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Your Transactions</h2>
          {loading ? (
            <p>Loading transactions...</p>
          ) : transactions.length > 0 ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-3 border">Transaction Name</th>
                  <th className="p-3 border">Amount</th>
                  <th className="p-3 border">Merchant Name</th>
                  <th className="p-3 border">Payment Channel</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr
                    key={transaction.transaction_id}
                    className="hover:bg-gray-100"
                  >
                    <td className="p-3 border">{transaction.name}</td>
                    <td className="p-3 border">
                      ${transaction.amount.toFixed(2)}
                    </td>
                    <td className="p-3 border">
                      {transaction.merchant_name || transaction.name}
                    </td>
                    <td className="p-3 border">
                      {transaction.payment_channel}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No transactions found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
