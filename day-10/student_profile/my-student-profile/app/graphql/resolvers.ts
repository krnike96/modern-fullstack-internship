import { prisma } from '@/app/lib/prisma'

type Context = {
    user: { email: string; role: string } | null
}

export const resolvers = {
    Query: {
        students: (_: unknown, __: unknown, context: Context) => {
            if (!context.user) throw new Error('Unauthorized')
            return prisma.student.findMany({ orderBy: { createdAt: 'desc' } })
        },
        student: (_: unknown, { id }: { id: string }, context: Context) => {
            if (!context.user) throw new Error('Unauthorized')
            return prisma.student.findUnique({ where: { id } })
        },
    },
    Mutation: {
        createStudent: (_: unknown, { input }: { input: any }, context: Context) => {
            if (!context.user) throw new Error('Unauthorized')
            return prisma.student.create({ data: input })
        },
        updateStudent: (_: unknown, { id, input }: { id: string; input: any }, context: Context) => {
            if (!context.user) throw new Error('Unauthorized')
            return prisma.student.update({ where: { id }, data: input })
        },
        deleteStudent: (_: unknown, { id }: { id: string }, context: Context) => {
            if (!context.user) throw new Error('Unauthorized')
            return prisma.student.delete({ where: { id } }).then(() => true)
        },
    },
}