import NextAuth from "next-auth";
import { authOptions } from "@/lib/Auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
