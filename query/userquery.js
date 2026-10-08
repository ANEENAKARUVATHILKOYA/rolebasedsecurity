const usersignup = ` 
INSERT INTO users(first_name,last_name,dob,address,place,city,district,state,email,phone,password) 
VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
RETURNING id, roles;
`;

const loginuser = ` 
SELECT id,first_name,last_name,dob,address,place,city,district,state,email,phone,password,roles  FROM users  WHERE email = $1;
`;

const getUserByemail = `
SELECT id, email 
FROM users 
WHERE email = $1;
`;

const updateUserRoles = `
UPDATE users
SET roles = $1
WHERE id = $2
RETURNING id, email, roles;
`;

module.exports = {
    usersignup,
    loginuser,
    getUserByemail,
    updateUserRoles
};