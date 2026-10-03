const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorHelper");
const passwordhelper = require("../utils/passwordHelper");
const jwthelper = require("../utils/jwthelper");
const userrepository = require("../repository/userrepository");


const signupUser = asyncHandler(async (req, res, next) => {
    const {first_name,last_name,dob,address,place,city,district,state,email,phone,password} = req.body;
    if (
        !first_name ||
        !last_name ||
        !email ||
        !phone ||
        !password
    ) {
        throw new ErrorResponse(
            400,
            "Required fields are missing"
        );
    }
    const existingUser = await userrepository.getuserByemail(email); //check email already exist
    if (existingUser) {
        throw new ErrorResponse(
            409,
            "Email already exists"
        );
    }
    // Hash password
    const formattedpassword = await passwordhelper.hashPassword(password);
    // Create user
    const user = await userrepository.signupuser(first_name,last_name,dob,address,place,city,district,state,email,phone,formattedpassword );
    // Generate JWT
    const token = jwthelper.createjwt(user.id, "customer");
        res.status(201).json({
        message: "Signup successful",
        user: {id: user.id }, token: token});
});


const loginUser = asyncHandler(async (req, res, next) => {
    const { email,password} = req.body;
    if (!email || !password) {
        throw new ErrorResponse(
            400,
            "Email and password are required"
        );
    }
    // Find user
   const user = await userrepository.loginuser(email);
    if (!user) {
        throw new ErrorResponse(
            401,
            "Invalid email or password"
        );
    }
    // Compare password
    const passwordMatch = await passwordhelper.comparePassword(password, user.password);
    if (!passwordMatch) {
        throw new ErrorResponse(
            401,
            "Invalid email or password"
        );
    }
    // Generate JWT
    const token = jwthelper.createjwt(user.id,user.roles);
    res.status(200).json({
        message: "Login successful",
        user: {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            roles:user.roles,
            token: token
        }
    });
});


module.exports = {
    signupUser,
    loginUser
};