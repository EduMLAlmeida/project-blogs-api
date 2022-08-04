const postService = require('../services/postService');

const postController = {
    createPost: async (req, res) => {
        const { title, content, categoryIds } = req.body;
        const { authorization } = req.headers;
        const fieldsValidation = postService.validateFields(title, content, categoryIds);
        if (fieldsValidation.message) {
            return res.status(400).json({ message: fieldsValidation.message });
        }
        const categoryIdsValidation = await postService.validateCategoryIds(categoryIds);
        if (categoryIdsValidation.message) {
            return res.status(400).json({ message: categoryIdsValidation.message });
        }
        const post = await postService.createPost(title, content, categoryIds, authorization);
        return res.status(201).json(post);
    },
    getAllPosts: async (req, res) => {
        const posts = await postService.getAllPosts();
        return res.status(200).json(posts);
    },
    getPostById: async (req, res) => {
        const { id } = req.params;
        const post = await postService.getPostById(id);
        if (!post) return res.status(404).json({ message: 'Post does not exist' });
        return res.status(200).json(post);
    },
    updatePostById: async (req, res) => {
        const { id } = req.params;
        const { title, content } = req.body;
        const { authorization } = req.headers;
        const userValidation = await postService.validateUser(authorization, id);
        if (userValidation.message) {
            return res.status(401).json({ message: userValidation.message });
        }
        const fieldsValidation = postService.validateUpdateFields(title, content);
        if (fieldsValidation.message) {
            return res.status(400).json({ message: fieldsValidation.message });
        }
        const updatedpost = await postService.updatePost(id, title, content);
        return res.status(200).json(updatedpost);
    },
};

module.exports = postController;
