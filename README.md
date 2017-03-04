# StudyHunt-Backend

## Installation

Make sure you have [yarn](https://yarnpkg.com/en/) installed.

```
npm install tslint typescript -g
```

Copy `.env.example` to `.env`.

## Database

After you launch the DB instance you will need to set up the DB with the table structure.

```
npm install knex -g

knex migrate:latest

knex seed:run
```

## Run

```
yarn start
```

