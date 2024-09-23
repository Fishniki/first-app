import { signIn, signInWithGoogle } from "@/utils/db/service";
import { compare } from "bcrypt";
import NextAuth, { NextAuthOptions } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import GoogleAuthProvider from "next-auth/providers/google";

const authOptions : NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleAuthProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
          }),
        CredentialsProvider({
            type: 'credentials',
            name: 'Credentials',
            credentials: {
                email: {label: 'Email', type: 'email'},
                password: {label: 'Password', type: 'password'}
            },
            async authorize(credentials: any) {
                const {email, password} = credentials as {
                    email : string,
                    password: string
                }
                
                //signIn method from utils/srvice/signIn
                const user: any = await signIn({email})

                if(user) {
                    //password confirm 
                    const passwordConfirm = await compare(password, user.password)
                    if(passwordConfirm) {
                        return user
                    }
                    return null;
                }else{
                    return null
                }
            }
        })
    ],
    callbacks: {
        async jwt({token, account, profile, user}: any) {
            if(account?.provider === "credentials") {
                token.email = user.email
                token.role = user.role
            }
            if(account?.provider === "google") {
                const data = {
                    fullname: user.name,
                    email: user.email,
                    image: user.image,
                    type: "google",
                }

                await signInWithGoogle(data, (result: {status: boolean, message: string, data: any}) => {

                    if (result.status) {
                        token.fullname = result.data.fullname,
                        token.email = result.data.email,
                        token.image = result.data.image,
                        token.type = result.data.type,
                        token.role = result.data.role
                    }
                })

            }
            return token
        },
        async session({session, token}: any){
            if("fullname" in token) {
                session.user.fullname = token.fullname
            }
            if("email" in token) {
                session.user.email = token.email
            }
            if("role" in token) {
                session.user.role = token.role
            }
            if("image" in token) {
                session.user.image = token.image
                console.log(token.image)
            }
            return session
        }
    },
    pages: {
        signIn: "/auth/login"
    }
}

export default NextAuth(authOptions)

