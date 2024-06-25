import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === '/auth/login' || path === '/auth/signup';
  const isSellerPath = path.startsWith('/seller/'); 
  const hasCookie = cookies().has('_user');

  if (hasCookie) {
    const userType = cookies().get('_userType')?.value;

    if (userType === 'seller' && !isSellerPath) {
      return NextResponse.redirect(new URL('/seller/dashboard', request.url));
    } else if (userType === 'buyer' && isSellerPath) {
      return NextResponse.redirect(new URL('/user/homepage', request.url));
    }

  } else if (!isPublicPath) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
  return NextResponse.next();
}

export const config = {
    matcher: [
        "/",
        "/auth/signup",
        "/auth/login",
        "/dashboard",
        "/user/homepage",
        "/user/cart",
        "/user/wishlist",
        "/seller/dashboard",
        "/seller/addproduct",
    ],
}