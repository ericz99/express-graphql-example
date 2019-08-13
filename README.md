# Express-Graphql-Example (NOT FINISHED)

Sample real world example of using express + graphql, and how to interact with the api.

## Motivation

I seen a lot of good tutorial / guide on how to use these technology and it made me want to contribute to these tutorial / guide as well. So that is one of the reason why I decided to build a real world example on how to use these technology. I'm also hoping to spread my knowledge to others as well because I feel like doing this allows me, to learn more from my mistake and etc.

## Table of contents

<!--ts-->

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Examples](#example-of-queries-mutations--subscriptions)
- [Features](#features)
- [Built-with](#built-with)

  <!--te-->

### Installation

Express-Graphql-Example requires the following...

- [Node.js (LTS Version)](http://nodejs.org/)
- [YarnPKG](https://yarnpkg.com/lang/en/docs/install/#windows-stable)
- [MongoDB](https://www.mongodb.com/download-center/community)

Quick start:

```bash

# To install
git clone https://github.com/ericz99/express-graphql-example.git or download zip

# Install dependencies
yarn install

# To start server
yarn run dev

# Server runs on http://localhost:8080/graphql

```

## Usage

```bash

# Graphql endpoint
Graphql endpoint run on http://localhost:8080/graphql

# See at below for example queries & mutation
Before you start querying, I have added role permission, so some queries or mutations requires an "ADMIN" permission level.

```

## Configuration

```bash

# Be sure to change .env.example -> .env | MUST FILL ALL

MONGO_URI=xxx
PORT=8080
SESS_SECRET=ssh!secret!

REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=secret

SECRET_KEY=1231221412

```

## Example of queries, mutations & subscriptions

```

# Query yourself
query {
    me {
        userID
        email
        key {
            key
            expiredIn
        }
    }
}

# Query other user
query {
    getOneUser(userID: 1) {
        userID
        email
    }
}


# Mutation create user
mutation {
    saveUser(email: 'test@gmail.com', password: 'testpwd') {
        userID
        email
    }
}

# Keep track of realtime data with subscription
subscription {
    keyGenerated {
        key
        expiredIn
    }
}

```

## Features

- Authentication / Authorization
- Subscription
- Caching
- Custom Directives
- and more...

## Todo

- [x] Fix subscription handling
- [ ] clean some server code
- [ ] add membership section code
- [ ] reduce code by putting in its owner middlewares
- [ ] fix user & admin route from clashing between mutations
- [ ] add access_token for admin
- [ ] add caching for production ready
- [ ] add few more custom directives for keys & memberships
- [ ] implement monitoring & loggin metrics
- [ ] add proper integration testing

## Built With

- [Node.js (LTS Version)](http://nodejs.org/) - Backend framework used
- [Graphql](https://graphql.org/) - API Framework used
- [ApolloGrahpql](https://www.apollographql.com/) - API Framework that works on top of graphql
- [MongoDB](https://www.mongodb.com/download-center/community) - NOSQL Database used

## Bugs?

Feel free to make an issue about any particular errors.

## App Info

### Author

Eric Zhang

### Version

1.0.0

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
