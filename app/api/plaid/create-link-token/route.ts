import { NextResponse } from "next/server";
import { plaidClient } from "@/plaid/utils/client";
import {
  PLAID_CLIENT_NAME,
  PLAID_CLIENT_ID,
  PLAID_PRODUCTS,
  PLAID_COUNTRY_CODES,
} from "@/plaid/config";
import { Products, CountryCode } from "plaid";

/**
 * Creates a configuration object for the Plaid Link token creation endpoint.
 * @returns A Plaid Link token that can be used to initialize the Plaid Link widget.
 */
export async function GET(): Promise<NextResponse> {
  try {
    // Validate and cast Plaid products
    const validProducts = PLAID_PRODUCTS.filter((product) =>
      Object.values(Products).includes(product as Products)
    ) as Products[];

    // Validate and cast Plaid country codes
    const validCountryCodes = PLAID_COUNTRY_CODES.filter((code) =>
      Object.values(CountryCode).includes(code as CountryCode)
    ) as CountryCode[];

    const configs = {
      user: {
        client_user_id: PLAID_CLIENT_ID,
      },
      client_name: PLAID_CLIENT_NAME,
      products: validProducts,
      country_codes: validCountryCodes,
      language: "en",
    };

    // Create a link token using the Plaid client
    const response = await plaidClient.linkTokenCreate(configs);

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    console.log("Error creating link token:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
