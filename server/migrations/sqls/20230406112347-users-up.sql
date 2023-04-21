CREATE TABLE users (
    id serial primary key,
    name VARCHAR(225) NOT NULL,
    email VARCHAR(225) NOT NULL,
    role VARCHAR(500) NOT NULL,
    password VARCHAR(500) NOT NULL,
    issent int DEFAULT 0 NOT NULL
    )