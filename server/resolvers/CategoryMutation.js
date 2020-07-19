// AddCategoryToUser: User
// RemoveCategoryFromUser: User
async function addCategoryToUser(root, { id }, { currentUser, models }) {

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
            id
        }
    });

    console.log(category);

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
    addCategoryToUser
}
