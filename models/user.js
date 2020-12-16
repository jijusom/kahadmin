const Sequelize = require('sequelize');    
const { sequelize } = require('../config/sequelize');  
const User =  sequelize.define('users',
	{
		firstName: {type: Sequelize.STRING},
		lastName: {type: Sequelize.STRING},
		emailaddress: {type: Sequelize.STRING},
		passcode: {type: Sequelize.STRING},
		active: {type: Sequelize.STRING},
		userrole:{type: Sequelize.INTEGER}
	});

module.exports = User;	
	
