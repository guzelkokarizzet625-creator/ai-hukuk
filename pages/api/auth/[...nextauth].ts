import NextAuth, { type NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../lib/prisma";
import type { Session, DefaultUser } from "next-auth";

type MySession = Session & {
  user: Session["user"] & {
    id: string;
    role?: string;
  };
};

export const authOptions: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, user }: { session: Session; user: DefaultUser & { role?: string } }): Promise<MySession> {
      const s = session as MySession;
      // user.id may be undefined in some flows — assert it exists when you rely on it
      if (user.id) s.user.id = user.id;
      if (user.role) s.user.role = user.role;
      return s;
    }
  }
};

export default NextAuth(authOptions);
