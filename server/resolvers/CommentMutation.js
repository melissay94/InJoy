// EditComment: Comment
// DeleteComment: Boolean

// Comment mutations
async function editComment(root, { id, title, description }, { currentUser, models }) {
    const comment = await models.comment.findOne({
        where: {
        id
        }
    });

    if (!comment) {
        throw new Error("Could not retrieve comment to update.");
    }

    if (comment.userId != currentUser.userId) {
        throw new Error("Unable to edit comment, not posted by current user.");
    }

    const updatedComment = await comment.update({
        comment: comment || post.comment
    });

    if (updatedComment) {
        return updatedComment;
    } else {
        throw new Error("Could not update comment");
    }
}

async function deleteComment(root, { id }, { models }) {

    const comment = models.comment.findOne({
        where: {
        id
        }
    });

    if (!comment) {
        throw new Error("Issue finding comment to delete.");
    }

    const commentDeleted = await comment.destroy({
        where: {
        id: comment.id
        }
    });

    return commentDeleted > 0;
}

module.exports = {
    editComment,
    deleteComment
}