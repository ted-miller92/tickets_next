import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import clientPromise from "./mongodb";
import bcrypt from "bcrypt";

export const nextauthOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {
                    label: "email",
                    type: "text",
                  },
                password: {
                    label: "password",
                    type: "password",
                },
            },

            async authorize(credentials: any) {
                const client = await clientPromise;
                const collection = client.db("users").collection("users");

                const email = credentials?.email.toLowerCase();

                const user = await collection.findOne({email: email});
                if (!user) {
                    throw new Error("User does not exist");
                }

                // password validation
                const passwordValid = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                );

                if (!passwordValid){
                    throw new Error("Invalid credentials");
                }

                return{
                    id: user._id.toString(),
                    ...user
                };
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
}