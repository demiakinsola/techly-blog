const Post = require('../model/Post');

//to get all posts
const getPosts = async (req, res) => {
    const posts = await Post.find();
    //if there is no post
    if (!posts) {
        return res.status(400).json({ "message": "No Post found"});
    }
    return res.status(200).json(posts);
}

//to add a new post
const newPost = async (req, res) => {
    const { id, timestamp, title, body } = req.body;
    if (!req.body || !id || !timestamp || !title || !body ) {
        return res.status(400).json({ "message": "All fields required" })
    }
    try {
        const post = await Post.create({
            id: id,
            timestamp: timestamp,
            title: title,
            body: body
        })
        return res.status(200).json(post);
    } catch(err) {
        console.log(err);
    }
} 

    //to edit a post
    const editPost = async (req, res) => {
         const { timestamp, title, body } = req.body;
    if (!req.body || !timestamp || !title || !body ) {
        return res.status(400).json({ "message": "All fields required"});
    }
    try {
            const id = req.params.id;
            const post = await Post.findOne({id});
            //check if the post exists
            if (!post) {
                return res.status(404).json({ "message": "Post not found"});
            }
            //if the post exists
            if (id) post.id = id
            if (timestamp) post.timestamp = timestamp
            if (title) post.title = title
            if (body) post.body = body
            const editedPost = await post.save();
            res.status(200).json(editedPost);
    } catch(err) {
        console.log(err);
    }
    }

    //to delete a post
    const deletePost = async (req, res) => {
        const id = req.params.id;
        const post = await Post.findOne({id});
        //check if the post exists
        if (!post) {
            res.status(404).json({"message": "Post not found"})
        }
        try {
               const deleted = await post.deleteOne({id});
               res.status(200).json(deleted)
        } catch(err) {
            console.log(err);
        }
    }

    //to get a post
    const getAPost = async (req, res) => {
        const post = await Post.findOne({ id: req.params.id })
        //check if post is available
        if (!post) {
            res.status(404).json({ message: "Post not found" });
        }
        res.json(post)
    }


module.exports = { getPosts, newPost, editPost, deletePost, getAPost };