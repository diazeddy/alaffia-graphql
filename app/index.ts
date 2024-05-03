import Schema from "./schema";
import Resolvers from "./resolvers";
import { startApolloServer } from "./server";

startApolloServer(Schema, Resolvers);