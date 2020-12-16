const express = require('express');
const router = express.Router();
const userController  = require('../controllers/userController');  
const passport = require('passport');
const { forwardAuthenticated } = require('../config/auth');

//Login
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

router.get('/getusers',  userController.listAllUsers);
router.post('/login',userController.validateuser);

// Register Page
router.get('/register',  (req, res) => res.render('register'));
router.post('/register',userController.createuser);
router.post('/update',userController.updateuser);


// Logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
  });

module.exports = router;    