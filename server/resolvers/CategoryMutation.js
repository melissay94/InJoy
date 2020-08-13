// AddCategoryToUser: User
// RemoveCategoryFromUser: User
async function addCategoryToUser(root, { categoryId }, { currentUser, models }) {

    const user = await models.user.findOne({
      where: {
        id: currentUser.userId
      },
      includes: models.category
    });

    console.log(user);
    
    if (!user) {
        throw new Error("Unable to find user at this time.");
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
        await user.addCategory(category);
    } catch(err) {
        throw new Error(err.message);
    }

    return user;
}

async function removeCategoryFromUser(root, { categoryId }, { currentUser, models }) {

    const user = await models.user.findOne({
      where: {
        id: currentUser.userId
      }
    });

    const category = await models.category.findOne({
      where: {
        id: categoryId
      }
    })

    if (user && category) {
      return await category.removeUsers(user);
    }

   throw new Error("Was unable to remove category from user")
}
  
module.exports = {
    addCategoryToUser,
    removeCategoryFromUser
}
