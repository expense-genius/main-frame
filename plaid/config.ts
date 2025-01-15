import { Products } from "plaid";

export const PLAID_CLIENT_NAME = process.env.PLAID_CLIENT_NAME || "";
export const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID || "";
export const PLAID_SECRET = process.env.PLAID_SECRET || "";
export const PLAID_ENV = process.env.PLAID_ENV || "sandbox";
export const PLAID_PRODUCTS = (
  process.env.PLAID_PRODUCTS || Products.Transactions
).split(",");
export const PLAID_COUNTRY_CODES = (
  process.env.PLAID_COUNTRY_CODES || "US"
).split(",");
