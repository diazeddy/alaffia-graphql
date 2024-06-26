import AppDataSource from "../datasource";
import { Location } from "../entities/Location";
import { getFacilityById } from "./FacilityController";

export const getLocationById = async (id: string) => {
  const location = await AppDataSource.createQueryBuilder()
    .select("location")
    .from(Location, "location")
    .leftJoinAndSelect("location.facility", "facility")
    .where("location.id = :id", { id: id })
    .getOne();
  return location;
}

export const getLocationByIds = async (ids: string[]) => {
  const locations = await AppDataSource.createQueryBuilder()
    .select("location")
    .from(Location, "location")
    .where("location.id in (:...ids)", { ids: ids })
    .getMany();
  return locations;
}

export const addLocation = async (state: string, zip: string, address: string, facilityId: string) => {
  // get facility data by facilityId
  const facility = await getFacilityById(facilityId);

  // create new location
  const newLocation = new Location();
  newLocation.state = state;
  newLocation.zip = zip;
  newLocation.address = address;
  newLocation.facility = facility!;
  await AppDataSource.manager.save(newLocation);

  return newLocation;
}