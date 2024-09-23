import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";

const onlyAdmin = ["/admin"] 
export default function withAuth(middleware: NextMiddleware, requireAuth: string[] = []) {
    return async (req: NextRequest, next: NextFetchEvent) => {
        const pathname = req.nextUrl.pathname
        if(requireAuth.includes(pathname)) {
            const token = await getToken({
                req,
                secret: process.env.NEXTAUTH_SECRET
            })
            console.log(token?.role)
            if(!token) {
                const url = new URL('/auth/login', req.url)
                url.searchParams.set('callbackUrl', encodeURI(req.url))
                return NextResponse.redirect(url)
            }
            if(token.role !== "admin") {
                return NextResponse.redirect(new URL('/', req.url))
            }
        }
        return middleware(req, next)
    }
}