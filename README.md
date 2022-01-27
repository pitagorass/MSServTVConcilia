<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://logodownload.org/wp-content/uploads/2014/02/claro-logo-3-1.png" width="320" alt="Claro Logo" /></a>
</p>  

# basic-project

## Description

Nestjs base service with standards

---

## Configuration 

1) Change project name in package.json and package-lock

2) The APLICATION_NAME constant is used to assign the name to the applicationName of the winstonLogger and the serviceName in APM.  "*src/domain/constData.ts*"

3) The SWAGGER_TITLE constant will assign the title of the app in the swagger document and a description by means of the SWAGGER_DESCRIPTION constant.  "*src/domain/constData.ts*"

4) The API_PREFIX constant will assign a prefix for our url.

5) To use winstonlogger just inject it in the class constructor and you will be able to include the message, request and response. Example in location "*src/application/use_case/app.service.ts*" line 13.

5) To add an environment variable is added in the config.ts file and in the .env file.

6) In the sonar-project.js file you can configure the sonarqube, the sonar.exclusions must be updated with the new files.


---

## Tech
The API uses a number of open source projects to work properly:
- [Nestjs] -> is a framework for building efficient, scalable Node.js server-side applications
- [Swagger] -> API Documentation
- [SonarQube] -> is an automatic code review tool to detect bugs, vulnerabilities, and code smells in your code. 

---

### GIT Repository

---

## Installation

```bash
$ npm install
```

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

* #### Example request 
```json
  {
    "valorUno": 23,
    "valorDos": 45
  }
  ```

  * #### Example response 
```json
  {
    "result": 1035,
    "statusCode": 200
  }
  ```
