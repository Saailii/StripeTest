import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import google from "next-auth/providers/google";

const googleId = process.env.GOOGLE_ID!;
const googleSECRET = process.env.GOOGLE_SECRET!;

const prisma = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    google({
      clientId: googleId,
      clientSecret: googleSECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        // Check if the user already exists
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (!existingUser) {
          await prisma.user.create({
            data: {
              email: user.email!,
              name: user.name!,
              image: user.image!,
              role: "user",
            },
          });
        }
      } catch (error) {
        console.error("Error during sign-in:", error);
        return false; // Fail sign-in on error
      }
      return true; // Proceed with sign-in
    },
    async jwt({ token, user }) {
      // Add role information to token only on initial sign-in

      return token;
    },
    async session({ session, token }) {
      return session;
    },
  },
});
