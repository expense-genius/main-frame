import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/authContext';

type Account = {
  id: string;
  name: string;
  official_name: string;
  type: string;
  subtype: string;
  current_balance: number;
  available_balance: number;
  institution_id: string;
  institution_name: string;
  currency: string;
};

async function fetchAccounts() {
  try {
    const response = await fetch('api/fetch-accounts', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) throw new Error('Failed to fetch accounts');

    const accounts = await response.json();
    return accounts;
  } catch (err) {
    console.error('Error fetching accounts:', err);
    return null;
  }
}

const Accounts: React.FC = () => {
  const { user } = useAuth();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [groupedAccounts, setGroupedAccounts] = useState<
    Record<string, { institution_name: string; total_balance: number; accounts: Account[] }>
  >({});
  const [expandedInstitutions, setExpandedInstitutions] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (user) {
      fetchAccounts().then((accounts) => {
        if (!accounts) return;
        setAccounts(accounts);

        const grouped: Record<string, { institution_name: string; total_balance: number; accounts: Account[] }> = {};

        accounts.forEach((account: Account) => {
          if (!grouped[account.institution_id]) {
            grouped[account.institution_id] = {
              institution_name: account.institution_name,
              total_balance: 0,
              accounts: [],
            };
          }
          grouped[account.institution_id].accounts.push(account);
          grouped[account.institution_id].total_balance += account.available_balance;
        });

        setGroupedAccounts(grouped);
      });
    }
  }, [user]);

  const toggleDropdown = (institutionId: string) => {
    setExpandedInstitutions((prev) => ({
      ...prev,
      [institutionId]: !prev[institutionId],
    }));
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      {Object.entries(groupedAccounts).map(([institutionId, institutionData]) => (
        <div key={institutionId} className="border rounded-lg p-4 mb-4 shadow-md bg-white">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleDropdown(institutionId)}
          >
            <h2 className="text-lg font-semibold">{institutionData.institution_name}</h2>
            <span className="text-green-600 font-bold">
              Total: ${institutionData.total_balance.toFixed(2)}
            </span>
          </div>

          {expandedInstitutions[institutionId] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              className="mt-2 border-t pt-2"
            >
              {institutionData.accounts.map((account) => (
                <div key={account.id} className="flex justify-between items-center p-2 border-b last:border-b-0">
                  <span className="font-medium">{account.name}</span>
                  <span className="text-blue-500">${account.available_balance.toFixed(2)}</span>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accounts;
