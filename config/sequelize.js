
const Sequelize = require('sequelize');
const dbURL =require ('../config/db').connString;
var opts = {
    define: {
			//prevent sequelize from pluralizing table names
				 timestamps: false,
				 freezeTableName: true,
				 underscored: false,
				 paranoid: true

			},
	dialectOptions: 
		{
			ssl:  process.env.DATABASE_URL ? true : false
		}
}
const sequelize = new Sequelize(process.env.DATABASE_URL || dbURL,opts)
sequelize
	.authenticate()
	.then(() => {
		console.log('Connection has been established successfully.');
	})
	.catch(err => {
		console.error('Unable to connect to the database:', err);
	});

	module.exports = { sequelize }