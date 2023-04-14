SELECT 'CREATE DATABASE audvice'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'audvice')\gexec

CREATE TABLE IF NOT EXISTS 'Type' (

  'id' int(11) NOT NULL auto_increment,   
  'name' varchar(250) NOT NULL 
  'color' varchar(250) NOT NULL
   PRIMARY KEY  (`id`)

);