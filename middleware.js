import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server';

export async function middleware(request) {
    const token = request.cookies.get("metaverseinfo-token")?.value;

    console.log("Token:", token);

    if (!token) {
        console.log("No token found");
        return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token, secret);

        console.log("Payload:", payload);

        if (payload.role !== 'admin') {
            console.log("Not an admin");
            return NextResponse.redirect(new URL('/', request.url));
        }

        console.log("Admin verified");
        return NextResponse.next();
    } catch (error) {
        console.error("JWT verification failed:", error);
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

export const config = {
    matcher: ['/admin/:path*', '/inventory/:path*', '/orders/:path*'],
};
