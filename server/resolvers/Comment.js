// user
// post

async function user(comment) {
    const user = await comment.getUser();
  
    return user ? user : null;
  }
  
  async function post(comment) {
    const post = await comment.getPost();
  
    return post ? post : null;
  }
  
module.exports = {
    user,
    post
}