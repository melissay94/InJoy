// AddPromptToCategory: Prompt
// AddUserToCategory: User

async function addPromptToCategory(root, { id }, { currentUser, models }) {

    const prompt = await models.prompt.findOne({
      where: {
        id
      },
      includes: models.user
    });
  
    if (!prompt) {
      throw new Error("Unable to add prompt at this time.");
    }
}
  
async function addUserToCategory(root, { id }, { currentUser, models }) {

    const user = await models.user.findOne({
      where: {
        id
      },
      includes: models.user
    });
  
    if (!user) {
      throw new Error("Unable to add user at this time.");
    }
}
  
module.exports = {
    addPromptToCategory,
    addUserToCategory
}