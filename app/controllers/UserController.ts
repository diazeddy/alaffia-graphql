import AppDataSource from "../datasource";
import { User } from "../entities/User";
import { getFacilityByIds } from "./FacilityController";

export const getUserById = async (id: string) => {
  const user = await AppDataSource.createQueryBuilder()
      .select("user")       
      .from(User, "user")
      .leftJoinAndSelect("user.facilities", "facilities")
      .leftJoinAndSelect("facilities.locations", "locations")
      .where("user.id = :id", { id: id })
      .getOne();
      
  return user;
}

export const getUserByIds = async (ids: string[]) => {
  const users = await AppDataSource.createQueryBuilder()
    .select("user")
    .from(User, "user")
    .where("user.id in (:...ids)", { ids: ids })
    .getMany();
  return users;
}

export const addUser = async (
  firstName: string,
  lastName: string,
  email: string,
  role: string,
  facilityIds: string[]
) => {
  // get facilities information by facilitiIds
  const facilities = await getFacilityByIds(facilityIds);

  // create new user
  const newUser = new User();
  newUser.firstName = firstName;
  newUser.lastName = lastName;
  newUser.email = email;
  newUser.role = role;
  newUser.facilities = facilities;
  await AppDataSource.manager.save(newUser);

  return await getUserById(newUser.id);
}