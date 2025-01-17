import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { client } from "@/plaid/utils/client";

/**
 * Fetches accounts data using access tokens stored in the database.
 */
export async function GET(): Promise<NextResponse> {
  try {
    const supabase = await createClient();
    const { data: tokens, error } = await supabase
      .from("access_tokens")
      .select();

    if (error) {
      return NextResponse.json(
        { error: "Failed to fetch access tokens from database" },
        { status: 500 }
      );
    }

    if (!tokens || tokens.length === 0) {
      return NextResponse.json({ accounts: [] }, { status: 200 });
    }

    const accountsPromises = tokens.map(async (token) => {
      const response = await client.accountsGet({
        access_token: token.plaid_token,
      });
      return response.data;
    });

    const accountsArray = await Promise.all(accountsPromises);
    const accounts = accountsArray.flat();

    return NextResponse.json({ accounts });
  } catch (error) {
    console.error("Error fetching accounts data:", error);
    return NextResponse.json(
      { error: "Failed to fetch accounts data" },
      { status: 500 }
    );
  }
}
