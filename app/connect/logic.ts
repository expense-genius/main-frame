/**
 * Creates a public token for initializing the Plaid Link widget.
 * @param setError The function to set the error state
 * @returns The public token to initialize Plaid Link
 */
export const fetchLinkToken = async () => {
  try {
    const response = await fetch("api/plaid/create-link-token", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) throw new Error("Failed to fetch link token");

    const { link_token } = await response.json();
    return link_token;
  } catch (err) {
    console.error("Error fetching link token:", err);
    return null;
  }
};

/**
 * Calls the set-access-token API route to exchange a public token for
 * an access token and item id and sets it in the database.
 * @param public_token The public token to exchange for an access token
 */
export const exchangeAndSetPublicToken = async (public_token: string) => {
  try {
    const response = await fetch("/api/plaid/save-and-sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ public_token }),
    });

    if (!response.ok) throw new Error("Failed to exchange public token");
  } catch (err) {
    console.error("Error exchanging public token:", err);
  }
};
