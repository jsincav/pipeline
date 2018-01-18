var {client} = require('../db');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport) {

  passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  },
  (req, username, password, done) => {
    console.log("Login process:", username);
    return client.query("SELECT user_id, user_name " +
        "FROM users " +
        "WHERE user_email=$1 AND user_pass=$2", [username, password])
      .then((result)=> {
        return done(null, result);
      })
      .catch((err) => {
        console.log("/login: " + err);
        return done(null, false, req.flash('message', 'Wrong username or password'));
      });
  }));

  passport.serializeUser((user, done)=>{
    console.log("serialize ", user);
    done(null, user.user_id);
  });

  passport.deserializeUser((id, done)=>{
    console.log("deserualize ", id);
    client.query("SELECT user_id, user_name, user_email, user_role FROM users " +
            "WHERE user_id = $1", [id])
    .then((user)=>{
      console.log("deserializeUser ", user);
      done(null, user);
    })
    .catch((err)=>{
      done(new Error(`User with the id ${id} does not exist`));
    })
  });

}

