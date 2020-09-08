// posts
// users
// prompts

async function posts(category) {
    const posts = await category.getPosts();
  
    return posts ? posts : null;
  }
  
  async function users(category) {
    const users = await category.getUsers();
  
    return users ? users : null;
  }

  async function prompts(category) {
    const prompts = await category.getPrompts();
  
    return prompts ? prompts : null;
  }

module.exports = {
    posts,
    users,
    prompts
}