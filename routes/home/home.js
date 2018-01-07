const express = require('express');
const router = express.Router();
const repository = require('../../repository');

router.get('/', (req, res) => {
    "use strict";
    repository.Post.findAll().then((posts) => {
        console.log(posts.length);
        posts.reverse();
        res.render('home.hbs', {posts: posts, path_prefix: global.homePath})
    });
});

module.exports = router;