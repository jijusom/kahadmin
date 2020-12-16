const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

//Login Page
router.get('/', forwardAuthenticated,(req,res)=> res.render('login'));
//router.get('/home',  ensureAuthenticated, (req,res)=>res.redirect('home'))

//router.get('/db', (req,res)=> res.send('I am connected'));

module.exports = router;