SELECT 'CREATE DATABASE "audvice-dev"'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'audvice-dev')\gexec

\connect 'audvice-dev';

SELECT current_database();

CREATE TABLE IF NOT EXISTS "types" (

  "id" varchar(250) NOT NULL,   
  "name" varchar(250) NOT NULL,
  "color" varchar(250) NOT NULL,
  "createdAt" timestamp NOT NULL,
  "updatedAt" timestamp NOT NULL,
   PRIMARY KEY  ("id")

);

CREATE TABLE IF NOT EXISTS "typeEffectiveness" (

  "id" varchar(250) NOT NULL,   
  "sourceId" varchar(250) NOT NULL,
  "targetId" varchar(250) NOT NULL,
  "effectiveness" float NOT NULL,
  "createdAt" timestamp NOT NULL,
  "updatedAt" timestamp NOT NULL,
   PRIMARY KEY  ("id")

);

SELECT tablename
FROM pg_catalog.pg_tables
WHERE schemaname NOT IN ('pg_catalog','information_schema');