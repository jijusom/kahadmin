const passport = require('passport');
const bcrypt = require('bcryptjs');
require('../config/passport')(passport);
const User = require('../models/user');
exports.validateuser = (req, res,next) => {
		const {email,password} = req.body;
		let errors =[];
		if(!email || !password )
			{
				errors.push ({msg:'Please fill all fields'});
			};

		if(errors.length>0){
				res.render('login',{errors,email})

			} 
			else
			{
					passport.authenticate('local', {
					successRedirect : '/home', // redirect to the secure profile section
					failureRedirect : '/', // redirect back to the login page if there is an error
					failureFlash : true // allow flash messages
				})(req,res,next);   
			};
};

exports.createuser = (req, res,next) => {
	
  const { firstName,lastName, emailaddress, passcode, password2 } = req.body;
  let errors = [];
  if (!firstName || !lastName  || !emailaddress || !passcode || !password2) 
  {
    errors.push('Please enter all fields' );
  }

  if (passcode != password2) 
  {
    errors.push('Passwords do not match' );
  }

  if (passcode.length < 6) 
  {
    errors.push('Password must be at least 6 characters' );
  }

  if (errors.length > 0) 
	  {
		console.log(errors[0]);
		res.send({message: errors[0],success:'false'});
	  } 
  else 
	{
		User.findOne( {where:{ emailaddress: emailaddress }}).then(user => 
		{
			  if (user)
			  {
				res.send({ message: 'User name already exists',success:'false' });
			  } 
			  else 
			  {
				const newUser = new User(
				{
				  firstName,
				  lastName,
				  emailaddress,
				  passcode
				});
				bcrypt.genSalt(10, (err, salt) => 
				{
				  bcrypt.hash(newUser.passcode, salt, (err, hash) => 
					{
					if (err) throw err;
					newUser.passcode = hash;
					newUser
					  .save()
					  .then(user => 
						{	  
							res.send({message: 'User is registered',success:'true'});
						})
					  .catch(err => 
					  {
							console.log(err);
							res.send({message: err,success:'false'});
					  }  );
				  });
				});
			  }
		});
	}
};


exports.updateuser = (req, res,next) => {
	
  const { id,passcode, password2 } = req.body;
  
  console.log ("ID =" + req.params.id);
  let errors = [];
  if (!passcode || !password2) 
  {
    errors.push('Please enter all fields' );
  }

  if (passcode != password2) 
  {
    errors.push('Passwords do not match' );
  }

  if (passcode.length < 6) 
  {
    errors.push('Password must be at least 6 characters' );
  }

  if (errors.length > 0) 
	  {
		console.log(errors[0]);
		res.send({message: errors[0],success:'false'});
		
	  } 
  else 
	{
		User.findByPk(id).then(user => 
		{
			  if (user)
			  {
				  console.log(user.emailaddress);
				bcrypt.genSalt(10, (err, salt) => 
				{
				  bcrypt.hash(passcode, salt, (err, hash) => 
					{
					if (err) throw err;
					//user.passcode = hash;
					console.log(hash);
					 user.update(
									{passcode:hash}, 
									{where: {id: id }}
								) 
					  .then (user => 
						{	  
							res.send({message: 'Password updated',success:'true'});
						})
					  .catch(err => 
					  {
							console.log(err);
							res.send({message: err,success:'false'});
					  }  );
				  });
				});
			  }
			  else
			  {
				  res.send({message: 'User not found',success:'false'});
			  };
		});
	}
};

exports.listAllUsers = async (req, res) => {
    		User.findAll({where:{ userrole: 1 }},{ 
				attributes: [ 'firstName','lastName','emailaddress','active'],
					raw: true,  nest: true
			}).then(userdetails => {
				res.send(userdetails);
		});
	};