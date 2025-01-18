import { AccountBase, Item } from "plaid";
import { supabase } from "@/utils/supabase/supabaseClient";

/**
 * Fetches the user ID of the authenticated user using the Supabase client
 * @returns The user ID of the authenticated user
 */
export const getUserId = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user?.id) {
    throw new Error("User not found");
  }
  return data.user.id;
};

/**
 * Stores the Plaid item in the database
 * @param accessToken The access token for the Plaid item
 * @param itemId The item ID for the Plaid item
 * @param institutionId The institution ID for the Plaid item
 * @param institutionName The institution name for the Plaid item
 */
export const storePlaidItem = async (
  accessToken: string,
  itemId: string,
  institutionId: string,
  institutionName: string | null
) => {
  const userId = await getUserId();
  return supabase.from("plaid_items").insert([
    {
      user_id: userId,
      access_token: accessToken,
      item_id: itemId,
      institution_id: institutionId,
      institution_name: institutionName,
    },
  ]);
};

/**
 * Stores the Plaid accounts in the database
 * @param accounts The accounts associated with the Plaid item
 * @param item The Plaid item
 * @returns
 */
export const storePlaidAccounts = async (
  accounts: AccountBase[],
  item: Item
) => {
  // Fetch the authenticated user
  const userId = await getUserId();

  // Cast the item to any to access the institution name
  const Item = item as any;

  // Map accounts to the insert payload
  const insertData = accounts.map((account) => ({
    user_id: userId,
    item_id: item.item_id,
    account_id: account.account_id,
    available_balance: account.balances.available,
    current_balance: account.balances.current,
    currency: account.balances.iso_currency_code,
    name: account.name,
    official_name: account.official_name,
    type: account.type,
    subtype: account.subtype,
    institution_id: Item.institution_id,
    institution_name: Item.institution_name || "",
  }));

  // Perform batch insert
  const { data: insertResult, error: insertError } = await supabase
    .from("accounts")
    .insert(insertData);

  if (insertError) {
    throw new Error(`Error inserting accounts: ${insertError.message}`);
  }

  return { message: "Successfully stored accounts", data: insertResult };
};
