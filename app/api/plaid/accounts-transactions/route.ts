import { NextResponse } from "next/server";
import { client } from "@/plaid/utils/client";

export async function POST(request: Request) {
  try {
    const { access_token } = await request.json();

    if (!access_token) {
      return NextResponse.json({ error: "Access token is required" }, { status: 400 });
    }

    // Fetch accounts
    const accountsResponse = await client.accountsGet({ access_token });

    // Fetch transactions with pagination
    const transactionsRequest = {
      access_token,
      start_date: "2024-01-01", // Adjust to desired date range
      end_date: "2024-02-01",
    };

    const initialResponse = await client.transactionsGet(transactionsRequest);
    let transactions = initialResponse.data.transactions;
    const totalTransactions = initialResponse.data.total_transactions;

    // while (transactions.length < totalTransactions) {
    //   const paginatedRequest = {
    //     ...transactionsRequest,
    //     options: {
    //       offset: transactions.length,
    //     },
    //   };
    //   const paginatedResponse = await client.transactionsGet(paginatedRequest);
    //   transactions = transactions.concat(paginatedResponse.data.transactions);
    // }

    return NextResponse.json({
      accounts: accountsResponse.data.accounts,
      transactions,
    });
  } catch (error) {
    console.error("Error fetching accounts/transactions:", error);
    return NextResponse.json(
      { error: "Error fetching accounts/transactions" },
      { status: 500 }
    );
  }
}
