import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
const bcrypt = require('bcryptjs');

import dbConnect from '../../../lib/mongooseConnect'
import { User } from "../../../models/User";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const { username } = credentials;

        try {
          await dbConnect();
          const user = await User.findOne({ username });
          if (user) return user;
        }
        catch (err) {
          console.error(err);
        }

        // Return null if user data could not be retrieved
        return null
      }
    })
  ],
  theme: {
    colorScheme: "light",
  },
  session: {
    maxAge: 1 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const validPassword = bcrypt.compareSync(credentials.password, user.password);
      if (!validPassword) return false;
      user.name = credentials.username;
      account.roles = [...user.roles]
      return user
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async session({ session, user, token }) {
      session.user.email = "";
      //Next field was nulled due to faults with JSON serialization
      session.user.image = null;
      session.user.id = token.sub
      session.user.roles = token.roles
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (account) token.roles = account.roles
      return token
    }
  },
}
export default NextAuth(authOptions)
