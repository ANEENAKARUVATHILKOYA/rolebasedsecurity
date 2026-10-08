const asyncHandler = require("../middleware/asyncHandler");

const ErrorResponse = require("../utils/errorHelper");

const passwordhelper = require("../utils/passwordHelper");

const jwthelper = require("../utils/jwthelper");

const userrepository = require("../repository/userrepository");


const signupUser = asyncHandler(async (req, res, next) => {

    const {
        first_name,last_name,dob,address,place,city,district,state,email,phone,password } = req.body;
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
    const existingUser = await userrepository.getuserByemail(email);

    if (existingUser) {
        throw new ErrorResponse(
            409,
            "Email already exists"
        );
    }
    const formattedpassword =
        await passwordhelper.hashPassword(password);

    const user = await userrepository.signupuser(
        first_name,last_name,dob,address,place,city,district,state,email,phone,formattedpassword
    );

    const token = jwthelper.createjwt(
        user.id,
        user.roles
    );


    res.status(201).json({
        message: "Signup successful",

        user: {
            id: user.id,
            roles: user.roles
        },

        token: token
    });

});


const loginUser = asyncHandler(async (req, res, next) => {

    const { email, password } = req.body;

    if (!email || !password) {
        throw new ErrorResponse(
            400,
            "Email and password are required"
        );
    }

    const user = await userrepository.loginuser(email);


    if (!user) {
        throw new ErrorResponse(
            401,
            "Invalid email or password"
        );
    }

    const passwordMatch =
        await passwordhelper.comparePassword(
            password,
            user.password
        );

    if (!passwordMatch) {
        throw new ErrorResponse(
            401,
            "Invalid email or password"
        );
    }
    const token = jwthelper.createjwt(
        user.id,
        user.roles
    );

    res.status(200).json({
       message: "Login successful",

        user: {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            roles: user.roles
        },

        token: token
    });

});


const updateUserRoles = asyncHandler(async (req, res, next) => {

    const userId = req.params.id;

    const { roles } = req.body;

    if (!Array.isArray(roles) || roles.length === 0) {

        throw new ErrorResponse(
            400,
            "Roles must be a non-empty array"
        );
    }

    const validRoles = ["admin", "customer"];

    const invalidRoles = roles.filter(
        role => !validRoles.includes(role)
    );
    if (invalidRoles.length > 0) {

        throw new ErrorResponse(
            400,
            `Invalid roles: ${invalidRoles.join(", ")}`
        );
    }


    const uniqueRoles = [...new Set(roles)];
    const user = await userrepository.updateUserRoles(
        userId,
        uniqueRoles
    );


    if (!user) {
        throw new ErrorResponse(
            404,
            "User not found"
        );

    }


    res.status(200).json({
        message: "User roles updated successfully",
        user: {
            id: user.id,
            email: user.email,
            roles: user.roles
        }

    });

});


module.exports = {
    signupUser,
    loginUser,
    updateUserRoles
};