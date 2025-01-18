import { NextResponse } from "next/server";
import { plaidClient } from "@/plaid/utils/client";
import { storePlaidItem } from "@/utils/supabase/database";
import { ItemGetRequest } from "plaid";

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

    // Exchange the public token for an access token
    const exchangeResponse = await plaidClient.itemPublicTokenExchange({
      public_token,
    });

    const { access_token: accessToken } = exchangeResponse.data;

    // Create the Plaid request for item details
    const itemRequest: ItemGetRequest = {
      access_token: accessToken,
    };

    // Fetch the item information from Plaid
    const itemResponse = await plaidClient.itemGet(itemRequest);

    // Any since Plaid API type definitions don't include the institution_name field
    const { item } = itemResponse.data as any;

    if (!item) {
      return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }

    // Save the item details in the database
    await storePlaidItem(
      accessToken,
      item.item_id,
      item.institution_id || "",
      item.institution_name || ""
    );

    return NextResponse.json(
      { message: "Successfully saved Plaid Item!" },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error exchanging public token:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
