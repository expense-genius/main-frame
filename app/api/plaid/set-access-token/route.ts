import { NextResponse } from "next/server";
import { client } from "@/plaid/utils/client";

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

    const response = await client.itemPublicTokenExchange({ public_token });

    const { access_token, item_id } = response.data;

    // TODO: Save access_token and item_id to the database

    return NextResponse.json(
      { message: "Access token and item ID saved" },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error exchanging public token:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
