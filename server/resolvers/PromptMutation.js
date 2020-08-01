// CreatePrompt: Prompt
// EditPrompt: Prompt
// DeletePrompt: Boolean
// CreatePost: Post


// Prompt mutations
async function createPrompt(root, { title, image, tips, categoryId }, { currentUser, models }) {
 // tbd// Post mutations

    const user = await models.user.findOne({
      where: {
        id: currentUser.userId
      }
    });
  
    if (!user) {
      throw new Error("Could not get current user information");
    }
  
    const category = await models.category.findOne({
      where: {
        id: categoryId
      }
    });
  
    if (!category) {
      throw new Error(`Could not find category for given category id`);
    }

  
    const newPrompt = await models.prompt.create({
      title, 
      image,
      tips,
      categoryId: category.id,
      userId: user.id
    });
  
    if (!newPrompt) {
      throw new Error(`Could not create new prompt by ${user.username}`);
    }
  
    return newPrompt;
  
}

async function editPrompt(root, { id, title, image, tips, categoryId }, { currentUser, models }) {
 // only if no posts attached
    const prompt = await models.prompt.findOne({
        where: {
        id 
        }
    });

    if (!prompt) {
        throw new Error("Could not retrieve prompt to update.");
    }

    if (prompt.userId != currentUser.userId) {
        throw new Error("Unable to edit prompt, not posted by current user.");
    }

    if (prompt.posts && prompt.posts.length > 0) {
        throw new Error("Cannot edit prompt that already has associated posts.")
    }

    const updatedComment = await prompt.update({
        title: title,
        image: image,
        tips: tips,
        categoryId: categoryId
    });

    if (updatedComment) {
        return updatedComment;
    } else {
        throw new Error("Could not update comment");
    }
}

async function deletePrompt(root, { id }, { currentUser, models }) {
// only if no posts attached   
    const prompt = models.prompt.findOne({
        where: {
        id
        }
    });

    if (!prompt) {
        throw new Error("Issue finding prompt to delete.");
    }

    if (prompt.userId != currentUser.id) {
        throw new Error("Unable to delete prompt, not posted by current user.");
    }

    if (prompt.posts && prompt.posts.length > 0) {
        throw new Error("Cannot delete prompt that already has associated posts.")
    }
    
    const promptDeleted = await models.prompt.destroy({
        where: {
          id
        }
    });

    return promptDeleted > 0; 
}
  
  module.exports = {
    createPrompt,
    editPrompt,
    deletePrompt
  }