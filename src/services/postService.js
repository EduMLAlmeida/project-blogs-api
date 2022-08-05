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
    getAllPosts: async () => {
        const posts = await db.BlogPost.findAll({
            include: [{
                model: db.User,
                as: 'user',
                attributes: { exclude: ['password'] },
            }, {
                model: db.Category,
                as: 'categories',
            }],
        });
        return posts;
    },
    getPostById: async (id) => {
        const post = await db.BlogPost.findByPk(id, {
            include: [{
                model: db.User,
                as: 'user',
                attributes: { exclude: ['password'] },
            }, {
                model: db.Category,
                as: 'categories',
            }],
        });
        return post;
    },
    validateUser: async (token, postId) => {
        const user = jwtService.validateToken(token);
        const userId = user.data.id;
        const post = await db.BlogPost.findByPk(postId);
        const test = userId === post.dataValues.userId;
        if (!test) {
            return { message: 'Unauthorized user' };
        }
        return {};
    },
    validateUpdateFields: (title, content) => {
        if (!title || !content) {
            return { message: 'Some required fields are missing' };
        }
        return {};
    },
    updatePost: async (id, title, content) => {
        await db.BlogPost.update({ id, title, content }, { where: { id } });
        const updatedpost = await postService.getPostById(id);
        return updatedpost;
    },
    validatePost: async (id) => {
        const post = await postService.getPostById(id);
        if (!post) {
            return { message: 'Post does not exist' };
        }
        return {};
    },
    deletePost: async (id) => {
        await db.PostCategory.destroy({ where: { postId: id } });
        const deletedpost = await db.BlogPost.destroy({ where: { id } });
        return deletedpost;
    },
};
module.exports = postService;
