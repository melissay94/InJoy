const express = require('express');
const cors = require('cors');
const { ApolloServer, gql} = require('apollo-server-express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Define schema path
const schema = require('./schema');
// Define models path
const models = require('./models');
// Define query resolvers path
// Define Mutation resolvers path

// Define custom resolvers paths

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());

// Authentication logic

// Add resolvers object
const resolvers = {};

// Declare server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return {
      models
    }
  }
});
server.applyMiddleware({ app });

models.sequelize.authenticate();
models.sequelize.sync();

app.listen({ port }, () => console.log(`We're all mad here on port ${port}:${server.graphqlPath}`));
