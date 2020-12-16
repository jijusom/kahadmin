const admission = require('../models/admission');
const  Sequelize = require('sequelize');
const Admission = require('../models/admission');
const Op = Sequelize.Op;
var dupcheck=false;
exports.admitPerson = async (req, res) => {
	 const {hospitalID,name,phoneNumber,checkoutDate,roomNumber,bedNumber,bedTag,bedCount,modflag} = req.body;
		 if(!hospitalID || !name || !phoneNumber || !checkoutDate || !roomNumber || !bedNumber || !bedTag || !bedCount)
			{
				res.send({message:'Please fill all fields',hospitalID,name,phoneNumber,checkoutDate,roomNumber,bedNumber,bedTag,bedCount})
			} 
		else
		{		
				try 
					{
						var date = new Date();
						var startdate =date.toISOString().replace(/T/, ' ').replace(/\..+/, '') ;
						console.log(checkoutDate);
						admission.findOne( {
							where: {
									hospitalID:hospitalID,
									checkoutDate:{[Op.gte]:startdate}
								}
							
						}
						).then( function (data)
						{
							if (data==null)
							{
								dupcheck = false;
								console.log("I am null");
							}
							else
							{
								dupcheck = true;
							};
							console.log("dupcheck - " + dupcheck);
							if(dupcheck && modflag === 1)
							{
								res.send({ message: 'Duplicate Hospital ID ',success:'false'});
							}
						else
							{
								
								admission.findOne(
									{
									where: {
										roomNumber: roomNumber,
										bedNumber:bedNumber,
										checkoutDate:{[Op.gte]:startdate}
									}
								}).then(function(result){
									//update
									if (result){
										console.log(checkoutDate);
										result.update({hospitalID:hospitalID,
														name: name,
														phoneNumber: phoneNumber,
														checkoutDate :checkoutDate,
														bedNumber:bedNumber,
														bedTag: bedTag});
										res.send({ message: 'Data updated successfully',success:'true' });
									}
									else {
										admission.create(
											{
												hospitalID:hospitalID,
												name: name,
												phoneNumber: phoneNumber,
												checkoutDate :checkoutDate,
												roomNumber: roomNumber,
												bedNumber: bedNumber,
												bedTag: bedTag,
												bedCount:bedCount
											}
										);
										res.send({ message: 'Data saved successfully',success:'true'});
									};
								});
							}
						});
					}
				catch(error) 
					{
						console.error(error);
						res.send({ message: error,success:'false'});
					}	
				};
};

exports.showDischargeData = async (req, res) => {
			var date = new Date();
			var startdate=date.toLocaleDateString();
			console.log('startdate' + ' - ' + date.toLocaleDateString());
    		admission.findAll({ 
				where: {
						checkoutDate:{
							[Op.gte]:startdate,
							},
						},
				order:[
						['checkoutDate','ASC']
					],
				attributes: [ 'hospitalID','roomNumber','bedNumber', 'name', 'phoneNumber', 
							[Sequelize.fn('to_char',  Sequelize.col('checkoutDate'),'dd/mm/yyyy'), 'checkoutDate'],
							'bedTag','bedCount'],
					raw: true,  nest: true
			}).then(admission => {
	
				var username =req.session.passport.user.firstName + ' ' + req.session.passport.user.lastName;
				res.render('home',{name:username,data:admission});
		});
	};

	exports.updateRoomBed = async (req,res) =>{
		const {hospitalID,name,phoneNumber,checkoutDate,roomNumber,bedNumber,bedTag,bedCount,
			newroomNumber,newbedNumber} = req.body;
			console.log('I am in update');
			if(!hospitalID || !name || !phoneNumber || !checkoutDate || !roomNumber || !bedNumber || !bedTag || !bedCount
				|| !newroomNumber||!newbedNumber)
			{
			   res.send({message:'Please fill all fields',hospitalID,name,phoneNumber,checkoutDate,roomNumber,bedNumber,bedTag,bedCount})
		   } 
		   else
		   {		try 
					   {
						   var date = new Date();
						   var startdate=date.toLocaleDateString();
						  // console.log('startdate' + ' - ' + date.toLocaleDateString());

						   //var startdate =date.toISOString().replace(/T/, ' ').replace(/\..+/, '') ;
						   var olddate =  date.setDate(date.getDate() - 1);
						   olddate=date.toLocaleDateString();
						   console.log('oldcheckoutdate '+ ' - ' + olddate);
						   admission.findOne(
							   {
							   where: {
								   roomNumber: roomNumber,
								   bedNumber:bedNumber,
								   checkoutDate:{[Op.gte]:startdate}
							   }
						   }).then(function(result){
							   //update							   
								   
								   result.update({ checkoutDate :olddate});
								});
								   //res.send({ message: 'Data updated successfully',success:'true' });
								//Insert Record with new data
								   admission.create(
									   {
										   hospitalID:hospitalID,
										   name: name,
										   phoneNumber: phoneNumber,
										   checkoutDate :checkoutDate,
										   roomNumber: newroomNumber,
										   bedNumber: newbedNumber,
										   bedTag: bedTag,
										   bedCount:bedCount
									   }
								   );
								   res.send({ message: 'Data saved successfully',success:'true'});
						   
					   }
				   catch(error) 
					   {
						   console.error(error)
					   }	
				   };

	};