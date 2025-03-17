import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const user_gmail = req.cookies.get("user_gmail")?.value;
    const currentPath = req.nextUrl.pathname
  
    if (!user_gmail && ["/dashboard", "/Profile","/how-to-buy","/status","/mytoken","/buytoken"].includes(currentPath)) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  
    return NextResponse.next();
  }


export const getCookie = (name: string) => {
  if (typeof window === "undefined") return; // Prevent SSR issues
  const cookies = document.cookie.split("; ").find(row => row.startsWith(name + "="));
  return cookies ? cookies.split("=")[1] : null;
};