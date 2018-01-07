# MyTweet Aurelia Client
This project is a client side single page application built using Aurelia and Typescript that communticates to the server side [MyTweet2](https://github.com/KevFan/myTweet2-ent-web) application through the API provided by the server application. The aim of this application is to provide the same functionality as the server rendered views of the server application, but achieved using the client side API calls to the server and provide client side rendering of views, allowing for a better user experiene.

## Features
* Provides all the same features of the server rendered application with the addition of:
  * Admin 
    * Can delete all or specific tweets from global timeline view
    * Can search and filter user listing
  * User may delete tweet from any view if owned by current user
  * Both admin + user
    * Seach and filter through tweets in global timeline view

## Pre-requisites

To get started, you'll need to have the following requirements installed:

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/en/)
* [JSPM](https://www.npmjs.com/package/jspm)
* npm (Installed with Node.js)
* [Aurelia Cli](http://aurelia.io/docs/build-systems/aurelia-cli#machine-setup)

## Getting started
To setup the project locally:
* Host the server application as intructed in the server application [readme](https://github.com/KevFan/myTweet2-ent-web)
* Install project dependencies:

```
# Ensure Aurelia cli is installed
git clone <this repo>
cd mytweet2-aurelia-client-ts
npm install 
jspm install
```

* Change the `src/services/fixtures.ts` base url to `baseUrl = 'http://localhost:4000';` to point to the locally hosted server (currently pointed to remote server)
* For Google Maps to render correctly, you would also need to provide a Google Map API key into `src/main.ts`:
```
apiKey: 'YOUR_JAVASCRIPT_GOOGLE_MAP_API_KEY'
```

Finally start the project with `au run --watch` to host the project locally which can then be viewed on <http://localhost:9000/>

## User Instructions:
After hosting the project locally, users can signup or login using the preloaded accounts provided by the server database seeding: 
```
User Accounts:

email: homer@simpson.com
password: secret

email: marge@simpson.com
password: secret

email: bart@simpson.com
password: secret
```
There is also a preloaded admin accounts that can delete users and tweets 
```
Admin Account:

email: admin@simpson.com
password: secret

email: granpa@simpson.com
password: secret
```

Alternatively, for the deployed version, you can visit http://kevfans3.s3-website-eu-west-1.amazonaws.com/. The above default accounts can also be used to log in the deployed version if they have not been deleted.

## List of Software + Technologies Used
* [Node.js](https://nodejs.org/en/) - JavaScript runtime
* [Aurelia](http://aurelia.io/) - JavaScript Client Framework
* [WebStorm](https://www.jetbrains.com/webstorm/) - JavaScript IDE

## Improvements
* Allow add location to tweets by adding marker to map and getting latitude and longitude of marker

## Authors:
Kevin Fan ([KevFan](https://github.com/KevFan))

## Version/Date:
7th January 2018
