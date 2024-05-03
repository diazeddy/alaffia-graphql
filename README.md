# Alaffia GraphQL

Build a Node Graphql Server in Typescript that supports the following queries.

1. User and Facilities
```gql
query user(id: UUID!) {
	id
	firstName
	lastName
	email
	role
	createdAt
	facilities: {
		id
		name
		createdAt
		locations: {
			id
			state
			zip
			address
		}
	}
}
```

2. Users by location
```gql
query usersByLocation(UsersByLocationInput) {
	location {
			id
			state
			zip
			address
			facility {
				id
				name
				createdAt
			}
			users {
				id
				firstName
				lastName
				email
				role
				createdAt
			}
	}
}
```

## Database Design
I used PostgreSQL for database and used TypeORM.
Created 3 tables: User, Facility and Location and implemented relationships between them.

- User
  - id: uuid
  - firstName: string
  - lastName: string
  - email: string
  - role: string
  - createdAt: timestamp

- Facility
  - id: uuid
  - name: string
  - createdAt: timestamp

- Location
  - id: uuid
  - state: string
  - zip: string
  - address: string

User and Facility have many-to-many relation.
Facility and Location have one-to-many relation.

## Environment
- Windows 11
- Node v16.20.2
- Npm 8.19.4

## Tech stacks
- GraphQL
- Express
- Node.js
- Typescript
- PostgreSQL
- TypeORM
- Jest

## Steps to run project
1. Install PostgreSQL. (If you have it, skip this step).
2. Clone project.
```shell
git clone https://github.com/diazeddy/alaffia-graphql.git
```
3. Install node modules
```shell
npm install
```
4. Create .env file
```
DB_DATABASE="Your database name"
DB_USERNAME="Your username"
DB_PASSWORD="Your password"
DB_HOST="Your host address"
DB_PORT="Your port number"

PORT="Port you want to run project"
```
5. Run project
```shell
npm run dev
```

This will host project on localhost:3000.

6. Run test
```shell
npm run test
```