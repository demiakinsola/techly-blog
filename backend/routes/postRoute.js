const express = require('express');
const router = express.Router();
const { getPosts, newPost, editPost, deletePost, getAPost } = require('../controller/postController');
const roles_list = require('../config/roles_list');
const verifyUsers = require('../middleware/verifyUsers');

router.route('/post')
        .get(getPosts)
        .post(newPost);



router.route('/edit/:id').put(editPost);
router.route('/delete/:id').delete(deletePost);

module.exports = router;