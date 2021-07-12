![DB WORLD](/src/img/logo.jpg)

# DB WORLD

Project - IT524048Q Full Stack Web Development

.

## Background

DB WORLD is a film online shop. It is going to deploy this e-shop website on cloud services platform via MongoDB.

In this stage, DB WORLD going to create the major web site with film management through VueJS. All the information in the web site, including the authorization features, are provided by the API. The officail API location will be announced in the lesson and Moodle.

.

## Endpoint (Method)

The endpoints that available from the provided API.

### Film

- /infofilm (GET)

  > Get the information (JSON)

- /imfilm (POST)

  > Create a record to the shop with Authorized Key/token(JSON)

- /film (GET)

  > Retrieve the film information from the database (JSON)

- /list (GET)

  > List ALL film information from the database (JSON)

- /auth (POST)

  > User Login and return an authorized key (JSON)

- /update (PUT)

  > Customer / Staff update user account information with Authorized Key/token (JSON)

.

### User (Customer / Staff)

> _Sample Data_

    Demo Staff
    Username:	staffdemo
    Password:	1234567890qwertyuiop

    Staff
    Username:	205585576s
    Password:	a1234567890

    Customer
    Username:	205585576c
    Password:	a1234567890

.

## References / Sample

### Weather API

- https://openweathermap.org/
- API Key: 1fb6931acd1b21a56fe9045b24068c6e

> _Sample Link_

    https://api.openweathermap.org/data/2.5/weather?q=HongKong&units=metric&appid=1fb6931acd1b21a56fe9045b24068c6e

.

## Tutorial

YouTube Link: -

.

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

---

_Created by [Amy Man](https://msamyman.com "Amy Man Website") | Version 1.0 | Latest Update Date: 2021/07/12_
