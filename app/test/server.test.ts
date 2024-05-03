import { startApolloServer } from "../server";
import Schema from "../schema";
import Resolvers from "../resolvers";
import request from 'supertest';
import {
  createTestData,
  getUserQueryData,
  removeTestData,
  getUserByLocationQueryData
} from "./test.helper";
import AppDataSource from "../datasource";

let server: any;
let url: string;
let user: string;
let facility: string;
let location: string;

beforeAll(async () => {
  ({ server, url } = await startApolloServer(Schema, Resolvers));
  ({user, facility, location} = await createTestData());
});

it('query user should work', async () => {
  const response = await request(url).post("/").send(getUserQueryData(user));
  expect(response.body.data?.user?.id).toBe(user);
  expect(response.body.data?.user?.facilities[0].id).toBe(facility);
  expect(response.body.data?.user?.facilities[0]?.locations[0]?.id).toBe(location);
});

it('query userbylocation should work', async () => {
  const response = await request(url).post("/").send(getUserByLocationQueryData(location));
  expect(response.body.data?.usersByLocation?.id).toBe(location);
  expect(response.body.data?.usersByLocation?.facility?.id).toBe(facility);
  expect(response.body.data?.usersByLocation?.users[0]?.id).toBe(user);
});


afterAll(async () => {
  await removeTestData(user, facility, location);
  await AppDataSource.destroy();
  await server?.stop(); 
});