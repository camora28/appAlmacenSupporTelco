const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');

passport.use('local.signup', new LocalStrategy( {
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    console.log(req.body);
    const {fullname} = req.body;
    const newUser = {
        username,
        password,
        fullname
    };
    pool.query('INSERT INTO users SET ?', [newUser]);
}));

// passport.serializeUser((usr, done) => {

// });