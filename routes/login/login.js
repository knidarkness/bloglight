const passport = require('passport');
const express = require('express');
const router = express.Router();
const repository = require('../../repository');

router.get('/', (req, res) => {
    "use strict";
    if (req.user){
        res.redirect(`new`)
    }
    res.render('login.hbs', {path_prefix: global.homePath})
});

router.post('/',
    passport.authenticate('local', {failureRedirect: `login`}),
    (req, res) => {
    "use strict";
    res.redirect(global.homePath);
});

module.exports = router;