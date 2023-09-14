import NextAuth from "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: UserType & DefaultSession["user"];
    }

    interface User { 
        selectedDb?: string
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        selectedDb?: string
    }
}