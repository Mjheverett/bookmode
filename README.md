<!-- PROJECT LOGO -->
<br />
<p align="center">
   
   <img src="https://raw.githubusercontent.com/Mjheverett/book-club-app/master/client/src/images/bookmode.png" alt="Bookmode Logo">

  <h3 align="center">Bookmode</h3>

  <p align="center">
    A niche app for book enthusiasts!
    <br />
    <a href="#">View Demo</a>
  </p>
  
</p>



<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [How to Get Started](#how-to-get-started)
* [Acknowledgements](#acknowledgements)


<!-- ABOUT THE PROJECT -->
## About The Project

Bookmode is a self-hosted, multiuser site that is privacy conscious and designed for a small to medium group of friends to share books in their collections. 

Here's why:
* Bookmode is a tight-nit community for uses looking to share their favs and be introduced to new books that may not have made on their radar. 
* An app for users that believe in privacy, simplicity, and efficiency.
* Large social media platforms are lame and self-hosting is cool. :smile:


### Built With
This project was built using:
* React
* Express
* Sequelize
* Node.js
* Docker
* Auth0 for user login
* Material UI

<!-- Installation -->
## How to Get Started

### Docker Environment
Bookmode requires the Bookmode and Bookmode-api images to deploy, as well as a Postgres, SQLite, or MySQL database.

* Currently configured to work with Postgres. Generic configuration for use with all Sequlize compatible databases coming soon.

## Deploy

Bookmode can be deployed locally or on a server using npm and a postgres database connection.

* Clone the repository to desired location locally or on a server.
* Install Dependencies inside /, /client, and /service:
```sh
npm install

cd client
npm install

cd service
npm install
```
* Run build on React client component
```sh
cd client
npm run build
```

* Run locally using npm or direct static site path to /client/build

* Follow Dev Environment commands to run client and service...

### Dev Environment

Commands needed to run Bookmode in dev environment:
* Express Backend
```sh
cd service
```
```sh
npm run dev
```

* React Client
```sh
cd client
```
```sh
npm start
```

### Database Environment

Connect to development, testing, production databases:
* Development
```sh
export NODE_ENV=development
```

* Testing
```sh
export NODE_ENV=test
```

* Production
```sh
export NODE_ENV=production
```

Create Postgres database locally:
* Setup a Postgres database either locally or at an accessible address.

Configure /service/config/config.json:
* Setup the desired Postgres connection in the json file to match the NODE_ENV being used.

<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
* [Matthew Everett](https://github.com/Mjheverett)
* [Katy Sage](https://github.com/KatySage)
* [Dylan Cooper](https://github.com/Dcooper15)
* [Harmony Trevena](https://github.com/harmonytrevena)
