# Express-Graphql-Example

Real world example of how to build an maintainable server & api design. This example will consist of good design pattern to follow, flow of how the application structure should be used, and most importantly how to implement these features in this example repo. Please read comments of the code to understand why I use it and etc.

## Motivation

I seen a lot of good tutorial / guide on how to use these technology and it made me want to contribute to these tutorial / guide as well. So that is one of the reason why I decided to build a real world example of how to use these technology. I'm also hoping to spread my knowledge to others as well because I feel like doing this allows me, to learn more from my mistake and etc.

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
yarn run server

# To run test
yarn run test

# Server runs on http://localhost:8080

```

## Configuration

```bash

# Be sure to change .env.example -> .env | MUST FILL ALL

MONGO_URI=xxx
PORT=8080
SESS_SECRET=ssh!secret!
REDIS_PASSWORD=secret

```

## Example of queries, mutations & subscriptions

```

# Query yourself
query
    me {
        userID
        email
        key {
            key
            expiredIn
        }
    }

# Query other user
query
    getOneUser(userID: 1) {
        userID
        email
    }


# Mutation create user
mutation
    saveUser(email: 'test@gmail.com', password: 'testpwd') {
        userID
        email
    }

# Keep track of realtime data with subscription
subscription
    keyGenerated {
        key
        expiredIn
    }

```

## Features

- Authentication / Authorization
- Subscription
- Caching
- Pagination
- Deployment
- and more...

## Built With

- [Node.js (LTS Version)](http://nodejs.org/) - Backend framework used
- [Graphql](https://graphql.org/) - API Framework used
- [ApolloGrahpql](https://www.apollographql.com/) - API Framework that works on top of graphql
- [MongoDB](https://www.mongodb.com/download-center/community) NOSQL Database used

## Bugs?

Feel free to make an issue about any particular errors.

## App Info

### Author

Eric Zhang

### Version

1.0.0

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
