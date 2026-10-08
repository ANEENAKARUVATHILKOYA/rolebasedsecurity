const express = require("express");

const router = express.Router();

const {
    signupUser,
    loginUser,
    updateUserRoles
} = require("../controller/usercontroller");

const jwtHandler = require("../middleware/jwtHandler");

const roleHandler = require("../middleware/roleHandler");


router.post("/signup", signupUser);


router.post("/login", loginUser);


router.put(
    "/users/:id/roles",
    jwtHandler,
    roleHandler("admin"),
    updateUserRoles
);


module.exports = router;