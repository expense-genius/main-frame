import { NextRequest, NextResponse } from "next/server";
import { plaidClient } from "@/utils/plaid/client";
import { storePlaidAccounts } from "@/utils/supabase/database";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { accessToken } = await request.json();

    if (!accessToken) {
      return NextResponse.json(
        { error: "Access token is required" },
        { status: 400 }
      );
    }

    // Fetch accounts using access token
    const response = await plaidClient.accountsGet({
      access_token: accessToken,
    });

    const { accounts, item } = response.data;

    // Store accounts in the database
    const storeResponse = await storePlaidAccounts(accounts, item);

    return NextResponse.json(
      { message: storeResponse.message },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error fetching accounts:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
