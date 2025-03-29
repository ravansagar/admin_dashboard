import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // Match all routes except for Next.js internals and static files (images, fonts, etc.)
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    
    // Match API routes
    "/(api|trpc)(.*)",
    "/",
    "/products", 
    "/products/new",
    "/categories",
    "/categories/new",
  ],
};
