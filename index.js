const bcrypt = require('bcrypt');
const path = require('path');
const hbs = require('hbs');
const express = require('express');
const passport = require('passport');
const auth = require('./security');
const bodyParser = require('body-parser');
const app = express();

const models = require('./repository');

const home = require('./routes/home/home.js');
const new_post = require('./routes/new_post/new_post.js');
const post = require('./routes/post/post.js');
const login = require('./routes/login/login');

let partials = './theme/partials';
let assets = './theme/public';
let views = './theme/views';


const setTheme = (themePath) => {
    partials = path.join(themePath, '/partials');
    assets = path.join(themePath, '/public');
    views = path.join(themePath, '/views');
};

const createBlog = async (homePath, credentials) => {
    if (!credentials){
        credentials = {
            username: "test@test.com",
            password: "password"
        }
    }
    homePath = homePath === null ? '/' : homePath + '/';
    global.homePath = homePath;
    hbs.registerPartials(partials);
    app.set('view engine', 'hbs');

    app.use(express.static(assets));
    app.set('views', views);

    app.use(bodyParser.urlencoded({extended: false}));

    passport.use(auth.getAuthStrategy('username', 'password'));
    passport.serializeUser(auth.serializeUser);
    passport.deserializeUser(auth.deserializeUser);

    app.use(require('cookie-parser')());
    app.use(require('express-session')({
        secret: 'keyboard cat',
        resave: true,
        saveUninitialized: true
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    app.use('/', home);
    app.use('/post', post);
    app.use('/new', new_post);
    app.use('/login', login);

    const a = await models.sequelize.sync().then(async () => {
        await bcrypt.hash(credentials.password, 10, (err, hash) => {
            models.User.destroy({where: {}, truncate: true}).then(() => {models.User.create({username: credentials.username, password: hash});});
        });
        return app;
    });
    return a;
};
module.exports = {
    setTheme: setTheme,
    createBlog: createBlog,
    bla : () => {
        console.log('bla');
    }
};