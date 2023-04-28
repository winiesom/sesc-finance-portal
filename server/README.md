
### Description of application

- SESC student portal invoice microservice built with node.js, express, postgres database
- With the implementation of unit testing using Jest library and superTest library for automated testing
  

### PORT NUMBER FOR SERVER

- 8083

## PORT NUMBER FOR DATABASE

- 5432
  
### ENVIRONMENT VARIABLES

- SERVER_PORT = Your server port number
- POSTGRES_HOST = 127.0.0.1 || your postgres port
- POSTGRES_DB =finance
- POSTGRES_DB_TEST = finance_test
- POSTGRES_USER = your postgres user
- POSTGRES_PASSWORD = your postgres password

### PACKAGAE INSTALLATION

- clone the respository from https://github.com/winiesom/sesc-finance-portal into your local machine
- cd sesc-finance-portal
- cd server directory
- Run yarn add all or npm install

### DATABASE SETUP

- Create database finance

## Database Migration

- Run npx sequelize-cli db:migrate  in your terminal at the root of your project
- to create the database tables

## Database Seeding

- Run npx npx sequelize-cli db:seed:all  in your terminal at the root of your project
- to seed data into the invoice table

## Running Automated testing using Jest and superTest

- Run npm test at the root of server director

## Starting application express server

- Run yarn start or npm start in your terminal 
- Server listens on port 8083


### Database Schema

## Invoices

- id: integer
- account_id: string
- type: integer
- amount: integer
- paid: boolean


## API Endpoints


## Create invoice 

- POST : "localhost:8083/invoices/"

## Get invoice 

- Get invoice => GET : "localhost:8083/invoices/"
