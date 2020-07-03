// AddPromptToCategory: Prompt
// AddUserToCategory: User

async function addPromptToCategory(root, { promptId, categoryId }, { models }) {

    const prompt = await models.prompt.findOne({
      where: {
        id: promptId
      }
    });
  
    if (!prompt) {
      throw new Error("Unable to find prompt at this time.");
    }

    const category = await models.category.findOne({
      where: {
        id: categoryId
      }
    });
  
    if (!category) {
      throw new Error("Unable to find category at this time.");
    }

    try {
        await category.addPrompt(prompt);
    } catch(err) {
        throw new Error(err.message);
    }

    return prompt;
}
  
async function addCategoryToUser(root, { id }, { currentUser, models }) {

    const user = await models.user.findOne({
      where: {
        id: currentUser.userId
      },
      includes: models.category
    });
    
    if (!user) {
        throw new Error("Unable to find user at this time.");
    }
    
    const category = await models.category.findOne({
        where: {
            id
        }
    })

    if (!category) {
        throw new Error("Unable to find category at this time.");
    }

    try {
        await user.addCategory(category);
    } catch(err) {
        throw new Error(err.message);
    }

    return user;
}
  
module.exports = {
    addPromptToCategory,
    addCategoryToUser
}