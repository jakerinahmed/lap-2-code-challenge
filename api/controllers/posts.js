const Post = require('../models/Post');

async function index(req, res) {
    try {
        const posts = await Post.all;
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).send(err);
    }
}
