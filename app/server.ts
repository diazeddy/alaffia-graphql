import { ApolloServer } from "apollo-server-express";
import express from "express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import http from "http";

import AppDataSource from "./datasource";
import { PORT } from "./constants";

export const startApolloServer = async (schema: any, resolvers: any) => {
  // initialize database
  await AppDataSource.initialize();

  // start graphql server
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  }) as any;
  await server.start();
  server.applyMiddleware({ app });
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, resolve)
  );
  console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  return { server, url: `http://localhost:${PORT}${server.graphqlPath}` }
}