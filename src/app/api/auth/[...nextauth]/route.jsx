import { User } from "@/app/(models)/user";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
// import User from "@/app/(models)/user";

export const handler = NextAuth({
  providers : [
    Credentials({
      name : "credentials",
      credentials : {},
      async authorize(credentials) {
        const { email, password } = credentials
        console.log(email, password)

        try {
          const user = await User.findOne({email})
          // console.log(user)
          if (!user) return null;
          if (password !== user.password) return null;
          return user;
        } catch (error) {
          console.log(error, "Error in auth")
        }
      }
    })
  ],
  session : {
    strategy : "jwt"
  },
  secret : process.env.NEXTAUTH_SECRET,
  pages : {
    signIn : "/auth/signin"
  },
  callbacks : {
    async session({ session, user, token }) {
      const sessionUser = await User.findOne({ email : session.user.email })
      if (sessionUser) {
        session.user.id = sessionUser._id.toString(),
        session.user.username = sessionUser.username
        session.user.image = sessionUser.avatar
        return session;
      }
    }
  }
})


export { handler as GET, handler as POST  }
