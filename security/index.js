const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const repository = require('../repository');

const getAuthStrategy = (usernameField, passwordField) => {
    return new LocalStrategy({
            usernameField: usernameField,
            passwordField: passwordField,
            session: true
        },
        function(username, password, done) {
            repository.User.findOne({where: {
                username: username
            }}).then(result => {
                if (!result){
                    console.log('No such user');
                    return done(null, false, { message: 'Incorrect username.' });
                }
                bcrypt.compare(password, result.password, function(err, res) {
                    if(res) {
                        console.log('Logged in');
                        return done(null, {'username': username});
                    } else {
                        console.log('Bad pass');
                        return done(null, false, { message: 'Incorrect password.' });
                    }
                });
            });
        }
    );
};

const serializeUser = (user, cb) =>  {
    cb(null, user.username);
};

const deserializeUser = (username, cb) => {
    repository.User.findOne({where: {username: username}}).then((user) => {
        if (!user) { return cb('User not found'); }
        cb(null, username);
    });
};

module.exports = {
    getAuthStrategy: getAuthStrategy,
    serializeUser: serializeUser,
    deserializeUser: deserializeUser
};