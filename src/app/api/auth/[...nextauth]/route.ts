import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";
// Removed authOptions as it is now in @/lib/auth

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
