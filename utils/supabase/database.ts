import { AccountBase, Item, TransactionsSyncRequest, Transaction } from "plaid";
import { createClient } from "@/utils/supabase/server";
import { plaidClient } from "../plaid/client";

export interface UpdatedItem extends Item {
  institution_name: string;
}

/**
 * Fetches the user ID of the authenticated user using the Supabase client.
 * @returns The user ID of the authenticated user.
 */
export const getUserId = async (): Promise<string> => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user?.id) {
    throw new Error("User not found");
  }

  return data.user.id;
};

/**
 * Stores the Plaid item in the database.
 * @param accessToken The access token for the Plaid item.
 * @param item The Plaid item details.
 * @returns A success message.
 */
export const storePlaidItem = async (
  accessToken: string,
  item: UpdatedItem
): Promise<{ message: string }> => {
  const supabase = await createClient();
  const userId = await getUserId();

  const { error } = await supabase.from("items").insert([
    {
      user_id: userId,
      access_token: accessToken,
      item_id: item.item_id,
      institution_id: item.institution_id,
      institution_name: item.institution_name || "Unknown Institution",
    },
  ]);

  if (error) {
    throw new Error(`Error storing Plaid item: ${error.message}`);
  }

  return { message: "Successfully stored Plaid item" };
};

/**
 * Stores the Plaid accounts in the database.
 * @param accounts The accounts associated with the Plaid item.
 * @param item The Plaid item details.
 * @returns A success message.
 */
export const storePlaidAccounts = async (
  accounts: AccountBase[],
  item: UpdatedItem
): Promise<{ message: string }> => {
  const supabase = await createClient();
  const userId = await getUserId();

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
    institution_id: item.institution_id,
    institution_name: item.institution_name || "Unknown Institution",
  }));

  const { error } = await supabase
    .from("accounts")
    .upsert(insertData, { onConflict: "account_id" });

  if (error) {
    throw new Error(`Error inserting accounts: ${error.message}`);
  }

  return { message: "Successfully stored accounts" };
};

/**
 * Fetches and stores accounts associated with a Plaid item.
 * @param accessToken The access token for the Plaid item.
 * @returns A success message.
 */
export const fetchAndStoreAccounts = async (
  accessToken: string
): Promise<{ message: string }> => {
  try {
    const response = await plaidClient.accountsGet({
      access_token: accessToken,
    });
    const { accounts, item } = response.data;

    const updatedItem = item as UpdatedItem;
    return await storePlaidAccounts(accounts, updatedItem);
  } catch (error) {
    console.error("Error fetching accounts:", error);
    throw new Error("Failed to fetch accounts");
  }
};

/**
 * Syncs transactions for a Plaid item using the cursor for incremental updates.
 * @param accessToken The access token for the Plaid item.
 * @param itemId The item ID for the Plaid item.
 * @returns A success message.
 */
export const syncTransactions = async (
  accessToken: string,
  itemId: string
): Promise<{ message: string }> => {
  const supabase = await createClient();

  let cursor = await supabase
    .from("items")
    .select("cursor")
    .eq("item_id", itemId)
    .single()
    .then((res) => res.data?.cursor || null);

  let added: Transaction[] = [];
  let modified: Transaction[] = [];
  let removed: string[] = [];
  let hasMore = true;

  try {
    while (hasMore) {
      const response = await plaidClient.transactionsSync({
        access_token: accessToken,
        cursor,
      });
      const data = response.data;

      added = added.concat(data.added);
      modified = modified.concat(data.modified);
      removed = removed.concat(data.removed.map((t) => t.transaction_id));

      hasMore = data.has_more;
      cursor = data.next_cursor;
    }

    await applyTransactionUpdates(itemId, added, modified, removed, cursor);

    return { message: "Transactions synced successfully" };
  } catch (error) {
    console.error("Error syncing transactions:", error);
    throw new Error("Failed to sync transactions");
  }
};


