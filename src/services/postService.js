const db = require('../database/models');
const jwtService = require('./jwtService');

const postService = {
    validateFields: (title, content, categoryIds) => {
        if (!title || !content || !categoryIds || categoryIds.length === 0) {
            return { message: 'Some required fields are missing' };
        }
        return {};
    },
    validateCategoryIds: async (queryIds) => {
        const dbIdsData = await db.Category.findAll({
            attributes: { exclude: ['name'] },
        });
        const dbIds = dbIdsData.map((Category) => Category.dataValues.id);
        const testArray = queryIds.map((queryId) => dbIds.includes(queryId));
        const test = testArray.every((result) => result);
        if (!test) {
            return { message: '"categoryIds" not found' };
        }
        return {};
    },
    createPostCategories: async (postId, categoryIds) => {
        await categoryIds.forEach(
            async (categoryId) => {
                await db.PostCategory.create({ postId, categoryId });
            },
        );
    },
    createPost: async (title, content, categoryIds, token) => {
        const user = jwtService.validateToken(token);
        const userId = user.data.id;
        const postData = await db.BlogPost.create({
            title,
            content,
            userId,
            published: Date.now(),
            updated: Date.now(),
        });
        await postService.createPostCategories(postData.null, categoryIds);
        return {
            id: postData.null,
            title: postData.dataValues.title,
            content: postData.dataValues.content,
            userId,
            updated: postData.dataValues.updated,
            published: postData.dataValues.published,
        };
    },
};

module.exports = postService;
