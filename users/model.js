const db = require('../db/dbconfig')



module.exports = {
  findUser,
  addUser,
  allUsers
}


function allUsers(){
  return db('users')
}


function findUser(filter){
	return  db('users').where(filter);
}


function addUser(user) {
    return db('users')
      .insert(user)
      .then(id =>{
         return {username:user.username, id:id}
    });
}
