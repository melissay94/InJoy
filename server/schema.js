const { gql } = require('apollo-server-express');

const typeDefs = gql`

type Query {
  currentUser: User
  user(id: Int!): User
  posts: [Post!]!
  post(id: Int!): Post
  prompt(id: Int!): Prompt
  prompts: [Prompt!]!
  category(id: Int!): Category
  categories: [Category!]!
}

type Mutation {
  followUser(id: Int!): User
  signup(username: String!, email: String!, password: String!, name: String, profileImage: String): AuthPayload
  login(email: String!, password: String!): AuthPayload
  editCurrentUser(username: String, email: String, name: String, profileImage: String): AuthPayload
  editCurrentUserPassword(password: String, newPassword: String): AuthPayload
  deleteCurrentUser: Boolean
  editPost(id:Int!, title: String, description: String): Post
  deletePost(id: Int!): Boolean
  createComment(postId: Int!, comment: String!, userId: Int!): Comment
  addLikeToPost(id: Int!): Boolean
  removeLikeFromPost(id: Int!): Boolean
  editComment(id: Int!, comment: String): Comment
  deleteComment(id: Int!): Boolean
  createPrompt(categoryId: Int!, title: String!, image: String, tips: String): Prompt
  editPrompt(id: Int!, title: String, image: String, tips: String): Prompt
  deletePrompt(id: Int!): Boolean
  createPost(title: String!, image: String, description: String): Post
  addCategoryToUser(categoryId: Int!): User
  addPromptToCategory(promptId: Int!, categoryId: Int!): Prompt
}

# Custom types
type User {
  id: Int!
  username: String!
  email: String!
  password: String!
  name: String
  profileImage: String
  currentPrompt: Prompt
  promptExpiration: String
  hasPosted: Boolean
  comments: [Comment!]!
  following: [User!]!
  categories: [Category!]!
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
  comments: [Comment!]!
  likes: [User!]!
}

type Prompt {
  id: Int!
  title: String!
  image: String
  tips: String
  category: Category!
  posts: [Post!]!
  user: User!
}

type Comment {
  id: Int!
  comment: String!
  user: User!
  post: Post!
}

type Category {
  id: Int!
  name: String!
  prompts: [Prompt!]!
  posts: [Post!]!
  users: [User!]!
}


`;

module.exports = typeDefs;