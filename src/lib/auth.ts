import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const googleEnabled = !!(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET);

function createGoogleProvider() {
  try {
    const Google = require("next-auth/providers/google").default;
    return Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    });
  } catch {
    console.warn("Google OAuth credentials invalid — skipping Google provider");
    return null;
  }
}

const providers: any[] = [
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
];

if (googleEnabled) {
  const gp = createGoogleProvider();
  if (gp) providers.push(gp);
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
  pages: {
    signIn: "/dashboard/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const allowedEmail = (process.env.DASHBOARD_USERNAME || "moeedkamraan1123@gmail.com").toLowerCase();
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
