// posts
// category

async function posts(prompt) {
    const posts = await prompt.getPosts();
  
    return posts ? posts : null;
  }
  
async function category(prompt) {
    const category = await prompt.getCategory();

    return category ? category : null;
}

async function user(prompt){
  const user = await prompt.getUser();

  return user ? user : null;
}

module.exports = {
    posts,
    category,
    user
}
