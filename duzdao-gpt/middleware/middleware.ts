import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const publicPaths = ['/api/auth/'];

  if (publicPaths.includes(path)) {
    return NextResponse.next();
  }

  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!session && path.startsWith('/api')) {
    return NextResponse.json(
      { error: 'Invalid Token' },
      { status: 401 }
    );
  }
  if (session) {
    req.headers.set('userId', session.sub!);
  }
  return NextResponse.next();
}

// Chỉ áp dụng middleware cho các API routes dưới /api
export const config = {
  matcher: '/api/:path*',
};
