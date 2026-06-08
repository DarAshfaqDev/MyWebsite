import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = process.env.DASHBOARD_USERNAME || "admin";
        const password = process.env.DASHBOARD_PASSWORD || "admin123";

        if (
          credentials?.email === email &&
          credentials?.password === password
        ) {
          return { id: "1", name: email };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/dashboard/login",
  },
  callbacks: {
    authorized({ auth: session }) {
      return !!session?.user;
    },
  },
  session: {
    strategy: "jwt",
  },
});
