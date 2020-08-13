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
  signup(username: String!, email: String!, password: String!, name: String, profileImage: String): AuthPayload
  login(email: String!, password: String!): AuthPayload
  followUser(id: Int!): User
  unfollowUser(id: Int!): User
  editCurrentUser(username: String, email: String, name: String, profileImage: String): AuthPayload
  editCurrentUserPassword(password: String, newPassword: String): AuthPayload
  deleteCurrentUser: Boolean
  addCategoryToUser(categoryId: Int!): User
  removeCategoryFromUser(categoryId: Int!): User
  createPrompt(categoryId: Int!, title: String!, image: String, tips: String, categoryId: Int): Prompt
  editPrompt(id: Int!, title: String, image: String, tips: String): Prompt
  deletePrompt(id: Int!): Boolean
  createPost(promptId: Int!): Post
  publishPost(title: String!, description: String, image: String): Post
  editPost(id:Int!, title: String, description: String): Post
  deletePost(id: Int!): Boolean
  addLikeToPost(id: Int!): Boolean
  removeLikeFromPost(id: Int!): Boolean
  createComment(postId: Int!, comment: String!): Comment
  editComment(id: Int!, comment: String): Comment
  deleteComment(id: Int!): Boolean
}

# Custom types
type User {
  id: Int!
  username: String!
  email: String!
  password: String!
  name: String
  profileImage: String
  comments: [Comment!]!
  following: [User!]!
  categories: [Category!]!
  posts: [Post!]!
  postsLiked: [Post!]!
  prompts: [Prompt!]!
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
  hasPosted: Boolean
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
