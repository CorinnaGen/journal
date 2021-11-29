# Journal - feature extension

This is a feature extension of the project "Journal" made by Emme Fayez. 

Now journal is private! You have auth/auth.

Plus a new feature: a mood tracker!

It shows the mood changes based on the entries in colors that go from bright green(Happy) to black(Depressed).

It informs the user of the mood they felt for more than 5 days in total.

Display a different notification if the user felt for more than 3 days in a row a certain emotion!


# Installation

## Dependencies

Run `npm install` or `yarn` in the project folder to install dependencies
related to Express (the server). `cd client` and run `npm install` or `yarn`
install dependencies related to React (the client).

## Database Setup

Edit `.env` file in project directory with:
 `DB_NAME=journal`
 `DB_PASS=YOUR_PASSWORD` 
 change this last one for your mySQL password. Then run
`npm run migrate` to set up database tables.

Run `USE journal` `SHOW TABLES` `DESCRIBE TABLE_NAME` to take a look at each table.

## Servers

- Run `npm start` in project directory to start the Express server on port 5000
- `cd client` and run `yarn start` to start client server in development mode
  with hot reloading in port 3000.
- You can test your client app in `http://localhost:3000`
- You can test your API in `http://localhost:5000`

# Documentation

## MySQL database table layout

![Schema](databaseschema.png)

`https://drive.google.com/file/d/1B4yORPezRqou2AG1R4QKQWPum3KLjKHK/view?usp=sharing`

## Link to API Endroutes

`https://docs.google.com/document/d/1JU-gtpgApKgXMSa7QEwGMQKLkZ1rUR8leq_RoEgCd9U/edit?usp=sharing`

## Journal entries API endroutes

![Journal entries](/readme/journal_api.png)

## Safetyplan API endroutes

![Safetyplan](/readme/safetyplan_api.png)

## SP Identifiers entries API endroutes

![Identifiers](/readme/identifiers_api.png)

## SP Resources API endroutes

![Resources](/readme/resources_api.png)

# Credits

_This is a student project that was created at [CodeOp](http://codeop.tech), a
full stack development bootcamp in Barcelona._
