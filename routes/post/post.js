const express = require('express');
const router = express.Router();

router.get('/:post_id', async (req, res) => {
    "use strict";
    const repository = require('../../repository');
    const post = await repository.Post.findOne({
        where: {
            id: req.params.post_id,
        }
    });
    const comments = await post.getComments();
    if (post === null) {
        res.redirect(`${global.homePath}`);
    } else {
        res.render('post.hbs', {post: post, comments: comments, path_prefix: global.homePath})
    }

});

router.post('/:post_id', async (req, res) => {
    "use strict";
    const repository = require('../../repository');
    const post = await repository.Post.findOne({
        where: {
            id: req.params.post_id,
        }
    });
    const comment = await repository.Comment.create({
        author: req.body.author,
        author_mail: req.body.author_email,
        content: req.body.content,
    });
    if (post === null) {
        res.redirect('/');
    } else {
        post.addComment(comment).then(res.redirect(`${global.homePath}post/${req.params.post_id}`));
    }
});

module.exports = router;