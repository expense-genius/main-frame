import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

/**
 * Signs in a user with their email and password.
 * @param req The incoming req object
 * @returns A JSON response indicating the success or failure of the operation
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
	const { email, password } = await req.json();
	const supabase = await createClient();

	const { data, error } = await supabase.auth.signInWithPassword({ email, password });

	if (error) {
		return NextResponse.json({ error: error.message }, { status: 401 });
	}

	// Return the session to the client
	return NextResponse.json({ message: 'Success', session: data.session });
}
