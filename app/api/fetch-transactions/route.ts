import { NextRequest, NextResponse } from "next/server";
import { fetchTransactions } from "@/utils/supabase/database";

export async function GET(request: NextRequest) {
  const response = await fetchTransactions();
  return NextResponse.json(response);
}
