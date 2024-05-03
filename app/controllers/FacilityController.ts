import AppDataSource from "../datasource";
import { Facility } from "../entities/Facility";
import { getUserByIds } from "./UserController";
import { getLocationByIds } from "./LocationController";

export const getFacilityByIds = async (ids: string[]) => {
  const facilities = await AppDataSource.createQueryBuilder()
    .select("facility")
    .from(Facility, "facility")
    .where("facility.id in (:...ids)", { ids: ids })
    .getMany();
  return facilities;
}

export const getFacilityById = async (id: string) => {
  const facility = await AppDataSource.createQueryBuilder()
    .select("facility")
    .from(Facility, "facility")
    .leftJoinAndSelect("facility.users", "users")
    .where("facility.id = :id", {id: id})
    .getOne();
  return facility;
}

export const addFacility = async (name: string, userIds: string[], locationIds: string[]) => {
  // get users data by userIds
  const users = await getUserByIds(userIds);

  // get locations data by locationIds
  const locations = await getLocationByIds(locationIds);

  // create new facility
  const newFacility = new Facility();
  newFacility.name = name;
  newFacility.users = users;
  newFacility.locations = locations;
  await AppDataSource.manager.save(newFacility);

  return newFacility;
}
