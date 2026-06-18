import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from "next-auth/providers/github";
import mongoose from "mongoose";
import connectDB from '@/db/connectDb';
import User from '@/models/User';
import Payment from '@/models/Payment';

export const authOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        GoogleProvider({
           
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,  
    callbacks: {
        async signIn({ user, account, profile }) {
          
            if (account.provider === "github" || account.provider === "google") {
                await connectDB()
                const currentUser = await User.findOne({ email: user.email })
                
                // If user doesn't exist, create a new one in MongoDB
                if (!currentUser) {
                    await User.create({
                        email: user.email,
                        username: user.email.split("@")[0],
                    })
                }
                return true
            }
            return false // Fallback in case a different provider tries to log in
        },

        async session({ session, token }) {
            await connectDB()                                              
            const dbUser = await User.findOne({ email: session.user.email })
            if (dbUser) {                                                  
                session.user.name = dbUser.username
            }
            return session
        },
    }
}

// Standard Next.js App Router export pattern
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }