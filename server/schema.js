const { gql } = require('apollo-server-express');

const typeDefs = gql`

type Query {
  currentUser: User
  user(id: Int!): User
  posts: [Post!]!
  post(id: Int!): Post
}

type Mutation {
  followUser(id: Int!): User
  signUp(username: String!, email: String!, password: String!, name: String, profileImage: String): AuthPayload
  login(email: String!, password: String!): AuthPayload
  editCurrentUser(username: String, email: String, password: String, name: String, profileImage: String): AuthPayload
  deleteCurrentUser: Boolean
  editPost(id:Int!, title: String, description: String): Post
  deletePost(id: Int!): Boolean
  addCommentToPost(id: Int!, comment: Comment!): Comment
  addLikeToPost(id: Int!): Boolean
  removeLikeFromPost(id: Int!): Boolean
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
  postsCreated: [Post!]!
  postsLiked: [Post!]!
}

# Authpayload
type AuthPayload{
  user: User
  token: String
}

type Post {
  id: Int!
  title: String!
  prompt: Prompt!
  user: User!
  image: String
  description: String
}

`;

module.exports = typeDefs;