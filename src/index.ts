import "reflect-metadata"
import { ApolloServer } from "apollo-server-express"
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core"
import express from "express"
import http from "http"
import { buildSchema } from "type-graphql"
import HelloResolver from "./resolver/hello"
import db from "./database"
import BookRepository from "./database/book"

async function startApolloServer() {
    const app = express()
    const httpServer = http.createServer(app)

    const schema = await buildSchema({
        resolvers: [HelloResolver, BookRepository],
    })

    const server = new ApolloServer({
        schema,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    })

    await db.connect()
    await server.start()
    server.applyMiddleware({
        app,
        path: "/",
    })

    // Modified server startup
    await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve))
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
}

startApolloServer()
