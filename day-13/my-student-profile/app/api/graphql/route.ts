import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { ApolloServer } from '@apollo/server'
import { NextRequest } from 'next/server'
import { typeDefs } from '@/app/graphql/schema'
import { resolvers } from '@/app/graphql/resolvers'
import { verifyJWT } from '@/app/lib/auth'

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = startServerAndCreateNextHandler<NextRequest>(server as any, {
  context: async (req) => {
    const token = req.cookies.get('token')?.value
    let user = null
    if (token) {
      user = verifyJWT(token)
    }
    return { user }
  },
})

export { handler as GET, handler as POST }