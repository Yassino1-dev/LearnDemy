//const { request, response } = require('express');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//const user = require('../models/User');
const bcrypt = require('bcrypt');
const User = require('../models/User');

router.post('/', (req, res, next) => {
  console.log(req.body);
  // 409 means conflict
  // 422 means unprocess about entity
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      // By default, if no user found, user = []
      if (user.length >= 1) {
        return res.status(409).json({
          message: 'Mail exists'
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              
              email: req.body.email,
              password: hash
            });
            user
              .save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: 'User created'
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(422).json({
        error: err
      });
    });
});

module.exports = router;