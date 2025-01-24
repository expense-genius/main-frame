export async function fetchAccounts() {
  // Fetch the accounts from the database
  try {
    const response = await fetch("api/fetch-accounts", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) throw new Error("Failed to fetch accounts");

    const accounts = await response.json();
    return accounts;
  } catch (err) {
    console.error("Error fetching accounts:", err);
    return null;
  }
}

export async function fetchTransactions() {
  // Fetch the transactions from the database
  try {
    const response = await fetch("api/fetch-transactions", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) throw new Error("Failed to fetch transactions");

    const transactions = await response.json();
    return transactions;
  } catch (err) {
    console.error("Error fetching transactions:", err);
    return null;
  }
}
