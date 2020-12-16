const Sequelize = require('sequelize');    
const { sequelize } = require('../config/sequelize');  
const Admission =  sequelize.define('admission',
	{
		hospitalID: {type: Sequelize.STRING},
		name: {type: Sequelize.STRING},
		phoneNumber: {type: Sequelize.INTEGER},
		checkoutDate: {type: Sequelize.STRING,
			get: function to_char() {
				return moment(this.getDataValue('checkoutDate')).format('DD/MM/YYYY');
			}},
		roomNumber: {type: Sequelize.STRING},
		bedNumber: {type: Sequelize.STRING},
		bedCount: {type: Sequelize.INTEGER},
		bedTag: {type: Sequelize.INTEGER}
	});
module.exports = Admission;