import { NextRequest, NextResponse } from "next/server";
import { fetchAccounts } from "@/utils/supabase/database";

export async function GET(request: NextRequest) {
  const response = await fetchAccounts();
  return NextResponse.json(response);
}
