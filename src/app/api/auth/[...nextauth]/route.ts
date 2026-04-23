import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const formData = new FormData();
          formData.append("email", credentials.email);
          formData.append("password", credentials.password);

          const res = await fetch("https://learn.smktelkom-mlg.sch.id/toko/api/auth/login", {
            method: "POST",
            body: formData,
          });

          const data = await res.json();

          if (res.ok && data.status && data.user && data.token) {
            return {
              id: data.user.id.toString(),
              name: data.user.nama_user || data.user.name,
              email: data.user.email,
              role: data.user.role,
              token: data.token,
            };
          }
          return null;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.token = token.token as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "klikbelanja-super-secret-key-development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
