import { NextResponse } from 'next/server'

export default function middleware (request){
  let verify = request.cookies.get("accessToken")?.value;

  if (!verify){
    return NextResponse.redirect(new URL('/login',request.url))
  }
  
}

export const config = {
  matcher: [
    '/',
    '/about/:path*',
    '/dashboard/:path*',
    '/pets/:path*',
    '/group/:path*',
    '/chat/:path*',
    '/settings',
    '/follower/:path*',
    '/profile/:path*',
  ],
}