import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const accept = request.headers.get("accept")?.toLowerCase() ?? "";
  const pathname = request.nextUrl.pathname;

  if (!accept.includes("text/markdown") || pathname.endsWith(".md")) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  const slug = pathname.replace(/^\/docs\/?/, "");
  url.pathname = slug ? `/llm/${slug}` : "/llm";

  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/docs/:path*"],
};
