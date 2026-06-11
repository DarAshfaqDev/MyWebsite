import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

const googleEnabled = !!(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET);

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
    ...(googleEnabled
      ? [
          Google({
            clientId: process.env.AUTH_GOOGLE_ID!,
            clientSecret: process.env.AUTH_GOOGLE_SECRET!,
          }),
        ]
      : []),
  ],
  pages: {
    signIn: "/dashboard/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const allowedEmail = (process.env.DASHBOARD_USERNAME || "").toLowerCase();
        return !!user.email && user.email.toLowerCase() === allowedEmail;
      }
      return true;
    },
    authorized({ auth: session }) {
      return !!session?.user;
    },
  },
  session: {
    strategy: "jwt",
  },
});
