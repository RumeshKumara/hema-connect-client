import { NextResponse } from "next/server";

const roleRouteMap = {
    "/admin": "admin",
    "/donor": "donor",
    "/organization": "organization",
};

export function middleware(request) {
    const { pathname } = request.nextUrl;

    const matchedPrefix = Object.keys(roleRouteMap).find((prefix) =>
        pathname === prefix || pathname.startsWith(`${prefix}/`),
    );

    if (!matchedPrefix) {
        return NextResponse.next();
    }

    // Optional cookie-based guard. Client-side RoleGate still enforces access.
    const requiredRole = roleRouteMap[matchedPrefix];
    const userRole = request.cookies.get("userRole")?.value;

    if (userRole && userRole !== requiredRole) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/donor/:path*", "/organization/:path*"],
};
