### Description of application

- This backend api is built with NodeJs, express framework, and postgresql
- The application is used to create, register and manage students' courses

### PORT NUMBER FOR SERVER
- 8000

## PORT NUMBER FOR DATABASE
-  5432
  
### ENVIRONMENT VARIABLES
- SERVER_PORT = 8000
- POSTGRES_HOST = 127.0.0.1 || your postgres port
- POSTGRES_DB = your DB name
- POSTGRES_USER = your postgres user
- POSTGRES_PASSWORD = your postgres password

### PACKAGAE INSTALLATION
- clone the respository from https://github.com/omerenma/nodeapitest into your local machine
- cd nodeapitest
- Run yarn add all or npm install

### DATABASE SETUP
- CREATE DATABASE nodeapitest

## Database Migration
- Run db-migrate up in your terminal at the root of your project

## Starting application express server
- Run yarn start or npm start in your terminal 
- Server listens on port 8000


### Database Schema

## Users
- id integer
- name string
- email string
- password string


## API Endpoints
#### Users
- Create  => POST : "localhost:8000/api/users/register"
- - Login  => POST : "localhost:8000/api/users/signin"
