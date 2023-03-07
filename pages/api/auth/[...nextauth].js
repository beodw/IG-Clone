import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId:
        '331497761810-6kag4f4k74j1mbv8fhr717lcldrg9efc.apps.googleusercontent.com',
      clientSecret: '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',
    }),
    CredentialsProvider({
      id: 'usernameAndPasswordAuth',
      name: 'Credentials',
      credentials: {
        username: {
          label: 'userName',
          type: 'text',
        },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        const { userName, password } = credentials
        return { name: 'test', sub: '' }
      },
    }),
  ],
  pages: { signIn: '/auth/signin' },
  callbacks: {
    async session({ session, token, user }) {
      // console.log(session.user, user)
      session.user = {
        ...session.user,
        uid: token.sub ?? '1',
        username: session.user.name.replace(' ', '').toLocaleLowerCase(),
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
})
