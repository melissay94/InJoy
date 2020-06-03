const express = require('express');
const cors = require('cors');
const { ApolloServer, gql} = require('apollo-server-express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Define schema path
const typeDefs = require('./schema');
// Define models path
const models = require('./models');
// Define query resolvers path
const Query = require('./resolvers/Query');
// Define Mutation resolvers path
const UserMutation = require('./resolvers/UserMutation');
const PostMutation = require('./resolvers/PostMutation');
// Define custom resolvers paths
const User = require('./resolvers/User');
const Post = require('./resolvers/Post');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());

// Authentication logic
const authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null || token == "") {
    return next();
  }

  jwt.verify(token, process.env.APP_SECRET, (err, user) => {
    if (err) {
      res.sendStatus(403);
    }

    req.user = user;
    next();
  });
}

app.use(authenticate);

// Add resolvers object
const resolvers = {
  Query,
  Mutation: {
    ...UserMutation,
    ...PostMutation
  },
  User,
  Post
};

// Declare server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return {
      currentUser: req.user,
      models
    }
  }
});

server.applyMiddleware({ app });

models.sequelize.authenticate();
models.sequelize.sync();

app.listen({ port }, () => console.log(`We're all mad here on port ${port}:${server.graphqlPath}`));
