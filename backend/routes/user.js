const express = require('express')
const router = express.Router()
const User = require('../database/models/user')
const passport = require('../passport')
const jwt = require('jsonwebtoken')



// router.post('/login',
//   function (req, res, next) {
//       next()
//   },
//   passport.authenticate('local'),
//   (req, res) => {
//       var userInfo = {
//           email: req.user.email
//       };
//       res.send(userInfo);
//   }
// )


router.post('/login', function (req, res, next) {
  passport.authenticate('local', {session: false}, (err, user, info) => {
      console.log("user123",user)
      if (err || !user) {
          return res.status(400).json({
              message: info ? info.message : 'Login failed',
              user   : user
          });
      }

      req.login(user, {session: false}, (err) => {
          if (err) {
              res.send(err);
          }

          const token = jwt.sign(user.toJSON(), 'your_jwt_secret');
          return res.json({user, token});
      });
  })
  (req, res);

});


router.post('/', (req, res) => {
  const { email, password } = req.body

  User.findOne({ email }, (err, user) => {
    if (err) {
      console.log('User.js post error: ', err)
    } else if (user) {
      res.json({
        error: `Sorry, already a user with the email: ${email}`
      })
    }else {
      const newUser = new User({
        email,
        password,
      })

      newUser.save((err, savedUser) => {
        if (err) return res.json(err)
        res.json(savedUser)
      })
    }
  })
})


module.exports = router