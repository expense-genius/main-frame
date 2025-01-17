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
