const express = require('express');
const router = express.Router();
const repository = require('../../repository');

router.get('/',
    require('connect-ensure-login').ensureLoggedIn(`login`),
    (req, res) => {
    "use strict";
    res.render('new_post.hbs', {path_prefix: global.homePath})
});

router.post('/',
    require('connect-ensure-login').ensureLoggedIn(`login`),
    (req, res) => {
    "use strict";
    repository.Post.create({
        title: req.body.title,
        description: req.body.preview,
        content: req.body.content,
    }).then(() => {
        res.redirect(global.homePath);
    });
});

module.exports = router;