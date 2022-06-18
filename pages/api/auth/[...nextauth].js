import NextAuth from "next-auth"
import { getToken } from "next-auth/jwt"
import CredentialsProvider from "next-auth/providers/credentials"
import clientPromise from "./lib/mongodb"
const bcrypt = require('bcryptjs');

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
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
          const connection = await clientPromise;
          const users = await connection.db().collection('users');
          const user = await users.findOne({ username });
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
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const validPassword = bcrypt.compareSync(credentials.password, user.password);
      if (!validPassword) return false;
      return user
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async session({ session, user, token }) {
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token
    }
  },
})
