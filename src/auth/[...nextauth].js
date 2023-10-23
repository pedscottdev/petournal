import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,s
    })
  ],

  async session({session, token}) {
    session.user.tag = session.user.name.split(" ").join("").toLocateLowerCase();

    session.user.uid = token.sub;
    return session;
  }
});
