const express = require('express');
const {
    sendAllAppointments,
    signupUser,
    loginUser,
    createUserAppointment,
    getUserAppointment,
    deleteUserAppointment,
    updateUserAppointment,
    verifyEmailToken,
    acceptUserAppointment,
    acceptDoctorByUser
} = require("../controllers/functions");
const routerUser = express.Router();
const routerAppointment = express.Router();
// login / signup / verifyemail
routerUser.route("/login").post(loginUser);
routerUser.route("/signup").post(signupUser);
routerUser.route("/verifyemail").post(verifyEmailToken);
// routerAppointment 
routerAppointment.route("/getAppointments").post(getUserAppointment);
routerAppointment.route("/createAppointment").post(createUserAppointment);
routerAppointment.route("/deleteAppointment").post(deleteUserAppointment);
routerAppointment.route("/updateAppointment").patch(updateUserAppointment);
routerAppointment.route("/getallappointments").post(sendAllAppointments);
routerAppointment.route("/acceptuserappointments").post(acceptUserAppointment);
routerAppointment.route("/acceptdoctorbyuser").post(acceptDoctorByUser);


module.exports = { routerUser, routerAppointment };
