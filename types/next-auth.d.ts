declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      id: string;
      role?: string;
    };
  }

  interface User {
    id: string;
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    /** OpenID token sub */
    sub?: string;
    /** Custom role claim */
    role?: string;
    user?: { id: string; role?: string };
  }
}
