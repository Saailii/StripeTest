import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      profile: string;
      image: string;
      name: string;
      role: string | unknown;
    };
  }
  interface User extends DefaultSession {
    role: string;
    email: string;
  }
}
