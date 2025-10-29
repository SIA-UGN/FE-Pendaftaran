import { NextResponse } from "next/server";

export async function middleware(request) {
  const pathname = request.nextUrl;

  //   protected routes
  const protectedRoutes = ["/dashboard", "/registration", "/payment", "/admin"];
  const authRoutes = ["/login", "/register"];

  const authHeader = request.headers.get("authorization");
  const token =
    authHeader?.replace("Bearer ", "") ||
    request.cookies.get("access_token")?.value;

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthRoute && token) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/check`,
        {
          method: "GET",
          headers: {
            Cookie: request.headers.get("cookie") || "",
            Authorization: token ? `Bearer ${token}` : "",
            Accept: "application/json",
          },
        }
      );

      if (response.ok) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    } catch (error) {
      console.log("Token validation error:", error);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
