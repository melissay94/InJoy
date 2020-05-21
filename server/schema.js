const { gql } = require('apollo-server-express');

const typeDefs = gql`

type Query {
  currentUser: User
  user(id: Int!): User
}

type Mutation {
  followUser(id: Int!): User
  
}

# Custom types
type User {
  id: Int!
  username: String!
  email: String!
  password: String!
  name: String,
  profileImage: String,
  currentPrompt: # Prompt
  promptExpiration: String,
  hasPosted: Boolean,
  comments: #[Comment!]!
  followers: [User!]!
  categories: #[Category!]!
  postsCreated: #[Post!]!
  postsLiked: #[Post!]!
}

# Authpayload

`;

module.exports = typeDefs;