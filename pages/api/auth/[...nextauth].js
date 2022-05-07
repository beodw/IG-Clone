import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId:
        '331497761810-6kag4f4k74j1mbv8fhr717lcldrg9efc.apps.googleusercontent.com',
      clientSecret: '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',
    }),
    // ...add more providers here
  ],
  pages: { signIn: '/auth/signin' },
  callbacks: {
    async session({ session, token, user }) {
      session.user = {
        ...session.user,
        uid: token.sub,
        username: session.user.name.replace(' ', '').toLocaleLowerCase(),
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
})
