import { NextResponse } from "next/server";
import { client } from "@/plaid/utils/client";
import { createClient } from "@/utils/supabase/server";

/**
 * Exchanges a public token for an access token and item ID and saves them to the database.
 * @param request The incoming request object
 * @returns A JSON response indicating the success or failure of the operation
 */
export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { public_token } = await request.json();

    if (!public_token) {
      return NextResponse.json(
        { error: "Public token is required" },
        { status: 400 }
      );
    }

    // Exchange public token for access token and item ID
    const response = await client.itemPublicTokenExchange({ public_token });

    const { access_token, item_id } = response.data;

    if (!access_token || !item_id) {
      return NextResponse.json(
        { error: "Access token and item ID not found in response" },
        { status: 500 }
      );
    }

    // Connect to Supabase
    const supabase = await createClient();

    // Insert data into the `access_tokens` table
    const { data, error: supabaseError } = await supabase
      .from("access_tokens")
      .insert([{ plaid_token: access_token, item_id }]) // Map to your table schema
      .single();

    if (supabaseError) {
      return NextResponse.json(
        { error: supabaseError.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Access token and item ID saved successfully", data },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error exchanging public token:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}