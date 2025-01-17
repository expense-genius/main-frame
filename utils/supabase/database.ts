import { createClient } from "@/utils/supabase/server";

/**
 * Store the Plaid item in the database
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
  const supabase = await createClient();

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
