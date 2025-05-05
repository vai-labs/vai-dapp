import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import { SiweMessage } from "siwe";

export const authOptions = {
  session: { strategy: "jwt" as const },
  providers: [
    CredentialsProvider({
      name: "Ethereum",
      credentials: {
        message: { label: "Message", type: "text" },
        signature: { label: "Signature", type: "text" },
      },
      async authorize(credentials) {
        try {
          // 1) take the raw SIWE message string (no JSON.parse!)
          const message = credentials?.message || "";
          const signature = credentials?.signature || "";
          const siwe = new SiweMessage(message);

          // 2) match your NEXTAUTH_URL host
          const nextAuthUrl = new URL(process.env.NEXTAUTH_URL!);

          // 3) verify signature + domain + nonce
          const { data, success } = await siwe.verify({
            domain: nextAuthUrl.host,
            signature,
          });

          if (success && data.address) {
            return { id: data.address };
          }
          return null;
        } catch (err) {
          console.error("SIWE authorize error:", err);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
