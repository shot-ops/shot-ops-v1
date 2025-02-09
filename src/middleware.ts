import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "./app/utils/supabase/server";

export async function middleware(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.redirect(new URL("/", req.url));
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
