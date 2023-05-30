import axios from 'axios';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { findUser } from '../../../lib/findUser';
import bcrypt from 'bcrypt';

export default NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const { identifier, password } = credentials;
        console.log("from nextauth printing credentials:\n", credentials)
        console.log("Sending to findUser with identifier:\n", identifier)
        const user = await findUser(identifier);
        console.log("from nextauth printing user info:\n", user)
        if (user && (await bcrypt.compare(password, user.password))) {
          return { email: user.email, name: user.name, username: user.username };
        } else {
          throw new Error('Invalid credentials');
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  events: {
    // Disable broadcasting the getSession event
    getSession: false,
  },
});