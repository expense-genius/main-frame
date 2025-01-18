import { AccountBase, Item } from "plaid";
import { supabase } from "@/utils/supabase/supabaseClient";

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
  return supabase.auth.getUser().then(({ data, error }) => {
    if (error || data?.user?.id == null) {
      throw new Error("User not found");
    }

    return supabase.from("plaid_items").insert([
      {
        user_id: data.user.id,
        access_token: accessToken,
        item_id: itemId,
        institution_id: institutionId,
        institution_name: institutionName,
      },
    ]);
  });
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
  const Item = item as any;
  const id = "824c90eb-8acb-4322-8374-84a3d4bd3623";

  // Fetch the authenticated user
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user?.id || id) {
    throw new Error("User not found");
  }

  // Map accounts to the insert payload
  const insertData = accounts.map((account) => ({
    user_id: data.user.id,
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
