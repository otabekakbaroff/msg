const router = require('express').Router();
const Users = require('./users_model')
const bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken');


function generateToken(user){
	const payload = {
		username:user,
	}
	const secret = process.env.JWT_SECRET;

	const options = {
		expiresIn:'8h'
	}
	return jwt.sign(payload,secret,options);
}


router.post('/register', (req, res) => {
    const usersInfo = req.body;
    usersInfo.password = bcrypt.hashSync(usersInfo.password, 12);
    Users.addUser(usersInfo).then(user=>{
      const token=generateToken(user);
            res.status(201).json({ 
                user,
                token
            });
        }).catch(err=>{
            console.log(err);
            res.status(500).json({error_message:'Post Failed'})
        })  
});

router.post("/login", (req, res) => {
    let { username, password } = req.body;
    Users.findUser({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password,user.password)){
        const token=generateToken(user);
          res.status(200).json({
              user,
              token
          });
        }
        else{
            res.status(401).json({error_message: 'Invalid Credentials'})
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({error_message:'Invalid Credentials'});
      });
});

  
module.exports = router;
