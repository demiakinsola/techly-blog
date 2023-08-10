const express = require('express');
const router = express.Router();
const { getPosts, newPost, editPost, deletePost, getAPost } = require('../controller/postController');

router.route('/')
        .get(getPosts)
        .post(newPost)


router.route("/:id").get(getAPost).put(editPost).delete(deletePost);

module.exports = router;