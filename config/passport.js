const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User model
const User = require('../models/user');

module.exports = function(passport) {
  passport.use('local',
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match user
      User.findOne({
        where: {emailaddress: email},raw: true,  nest: true
      }).then(user => {
        if (!user) {
          return done(null, false, { message: 'Email is not registered' });
        }

        // Match password
        bcrypt.compare(password, user.passcode, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {;
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      });
    })
  );

  passport.serializeUser(function(user, done) {
    var sessionUser ={id:user.id, firstName:user.firstName,lastName:user.lastName};
    done(null, sessionUser);
  });

  passport.deserializeUser(function(sessionUser, done) {
	User.findByPk(sessionUser.id,{raw: true}).then(function(user,err) {
		done(err, user);
	  });
  });
};