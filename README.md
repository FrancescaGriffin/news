# News API

## Project Summary

This project mimics the building of a real-world Back End service, such as Reddit, which provides information to the front-end architecture. The database hosts a number of topics, articles, and their respective comments. Users have the ability to add comments, increase and decrease votes on articles and delete their own comments.


## Links

Heroku currently hosts this project; the link below will take you to a list of all the available endpoints in JSON format.

[Hosted Version](https://firstnews.herokuapp.com/api)

If you would like to view the Front End to this project created with React, the link links below will take you to the repository and the hosted version.

[Front-End Repository](https://github.com/FrancescaGriffin/nc-news)

[Hosted Version](https://the-everyday-journalist.netlify.app)


## Prerequisite

`Node.js` v.16 and `PostgreSQL` v.14 or greater are recommended to ensure the project runs as intended. 


## Setup and Installation

If you would like to run this project on your local machine, please clone the repository below:

`https://github.com/FrancescaGriffin/news.git`

And then install all the required dependencies stored in package.json:

Run `npm install`

Before proceeding, two files need to be created in the root folder and can be done so with these commands:

`touch .env.test`

`touch .env.development`

Next add database config to the .env files:

.env.development: `PGDATABASE = nc_news`

.env.test: `PGDATABASE = nc_news_test`

Once this is completed, we can then create the test and development databases with the following commands:

`npm run setup-dbs`

`npm run seed`


## Testing the endpoints and Localhost 

This project has been developed from the found up using TDD (Jest). Please enter the command below to see the full extent of the tests:

`npm test`

If you would like to use the API on your localhost enter the following command:

`npm run start`


Details on how to install node can be found [here](https://nodejs.org/en/).





