const express = require('express');
const router = express.Router();
const admissionController  = require('../controllers/admissionController');  
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

//Display  Home page with Data
router.get('/',ensureAuthenticated,admissionController.showDischargeData);
//Save data
router.post('/savedata',ensureAuthenticated,admissionController.admitPerson);
//update Bed/Room
router.post('/updatedata',ensureAuthenticated,admissionController.updateRoomBed);
module.exports = router; 