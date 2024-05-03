import { addUser, getUserById } from "./controllers/UserController";
import { addLocation, getLocationById } from "./controllers/LocationController";
import { addFacility, getFacilityById } from "./controllers/FacilityController";
import { GraphQLError } from "graphql";

const Resolvers = {
  Query: {
    user: async (_: any, args: any) => {
      try {
        const user = await getUserById(args.id);
        if (!user) {
          throw new Error("Couldn't find user");
        }
        return user;
      } catch (error) {
        throw new GraphQLError(error?.toString() ?? "", { extensions: { code: "BAD_REQUEST" }});
      }
    },

    usersByLocation: async (_: any, args: any) => {
      try {
        const location = await getLocationById(args.id);
        if (!location) {
          throw new Error("Couldn't find location");
        }
        const facility = await getFacilityById(location?.facility.id ?? "");
        if (!facility) {
          throw new Error("Couldn't find facility");
        }
        return {
          ...location,
          users: facility?.users
        }
      }
      catch (error) {
        throw new GraphQLError(error?.toString() ?? "", { extensions: { code: "BAD_REQUEST" }});
      }
    }
  },

  Mutation: {
    addUser: async (_: any, args: any) => {
      try {
        const user = await addUser(args.firstName, args.lastName, args.email, args.role, args.facilities);
        return user;
      }
      catch (error) {
        throw new GraphQLError(error?.toString() ?? "", { extensions: { code: "BAD_REQUEST" }});
      }
    },
    addFacility: async (_: any, args: any) => {
      try {
        const facility = await addFacility(args.name, args.users, args.locations);
        return facility;
      }
      catch (error) {
        throw new GraphQLError(error?.toString() ?? "", { extensions: { code: "BAD_REQUEST" }});
      }
    },
    addLocation: async (_: any, args: any) => {
      try {
        const location = await addLocation(args.state, args.zip, args.address, args.facility);
        return location;
      } catch (error) {
        throw new GraphQLError(error?.toString() ?? "", { extensions: { code: "BAD_REQUEST" }});
      }
    }
  }
}

export default Resolvers;