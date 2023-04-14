SELECT 'CREATE DATABASE "audvice-dev"'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'audvice-dev')\gexec


CREATE TABLE IF NOT EXISTS "Type" (

  "id" varchar(250) NOT NULL,   
  "name" varchar(250) NOT NULL,
  "color" varchar(250) NOT NULL,
   PRIMARY KEY  ("id")

);