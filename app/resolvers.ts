import AppDataSource from "./datasource";
import { User } from "./entities/User";
import { Facility } from "./entities/Facility";
import { Location } from "./entities/Location";

const Resolvers = {
  Query: {
    user: async (_: any, args: any) => {
      const user = await AppDataSource.createQueryBuilder()
        .select("user")       
        .from(User, "user")
        .leftJoinAndSelect("user.facilities", "facilities")
        .leftJoinAndSelect("facilities.locations", "locations")
        .where("user.id = :id", { id: args.id })
        .getOne();
      return user;
    },

    usersByLocation: async (_: any, args: any) => {
      const location = await AppDataSource.createQueryBuilder()
        .select("location")
        .from(Location, "location")
        .leftJoinAndSelect("location.facility", "facility")
        .where("location.id = :id", { id: args.id })
        .getOne();
      const facility = await AppDataSource.createQueryBuilder()
        .select("facility")
        .from(Facility, "facility")
        .leftJoinAndSelect("facility.users", "users")
        .where("facility.id = :id", { id: location?.facility.id })
        .getOne();
      console.log(facility  )
      return {
        ...location,
        users: facility?.users
      }      
    }
  }
}

export default Resolvers;