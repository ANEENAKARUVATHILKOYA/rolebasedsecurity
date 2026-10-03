const pool = require("../db.js");
const userquery = require("../query/userquery");

const signupuser = (first_name,last_name, dob, address, place, city,district,state, email,phone, password) => {
  return new Promise((resolve, reject) => {
    pool.query(userquery.usersignup,[first_name,last_name,dob,address,place,city,district,state,email,phone,password], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.rows[0]);
        }});
  });
};


const getuserByemail = (email)=>{
    return new Promise((resolve, reject)=>{
        pool.query(userquery.getUserByemail,[email], (error,results)=>{
            if(error){
                reject(error)
            }else{
               resolve(results.rows[0] || null)
            }
        })
    })
}


const loginuser = (email) => {

    return new Promise((resolve, reject) => {
        pool.query( userquery.loginuser, [email], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results.rows[0] || null);
                }
            });
    });
};

module.exports = {
  signupuser,
  loginuser,
  getuserByemail
};