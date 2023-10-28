const { Appointment, User } = require("../models/schema");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const {
    encryptPassword,
    comparePassword,
    sendJwtToken,
} = require("../middleware/middleware");

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    try {
        const data = await User.findOne({ email: email });
        if (!data) {
            res
                .status(200)
                .send({ token: "", login: false, msg: "Credentials are wrong" });
        }
        const result = await comparePassword(password, data.password);
        if (result) {
            const token = sendJwtToken(data._id, data.name);
            if (data.verified) {
                res.status(200).send({
                    token: token,
                    login: true,
                    msg: "logged in successfully",
                    first_name: data.first_name,
                    last_name: data.last_name,
                    id: data._id,
                    dob: data.dob,
                    gender: data.gender,
                    contact: data.contact,
                    verified: data.verified,
                    role: data.role
                });
            } else {
                res.status(200).send({
                    login: true,
                    verified: data.verified,
                });
            }
        } else {
            res
                .status(200)
                .send({ token: "", login: false, msg: "Credentials are wrong" });
        }
    } catch (err) {
        res.status(200).send({ token: "", login: false, msg: "User don't exist" });
    }
};
const generateVerificationToken = () => {
    return crypto.randomBytes(32).toString("hex");
};
const verifyEmailToken = async (req, res) => {
    const token = req.body.token;
    if (!token) {
        // Handle the case where there's no token
        return res.status(400).json({ message: "Verification token is missing." });
    }

    try {
        // Find the user with the matching verification token
        const user = await User.findOne({ verificationToken: token });

        if (!user) {
            return res
                .status(404)
                .json({ message: "User not found or already verified." });
        }

        // Update the user's email verification status
        user.verified = true;

        // Remove the verification token (optional)
        user.verificationToken = undefined;

        await user.save(); // Save the updated user record

        res.status(200).json({ message: "Email verified successfully." });
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: "An error occurred during email verification." });
    }
};

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "anshikthind@gmail.com",
        pass: "pnff bbip tzwr kinx",
    },
});
const sendVerificationEmail = (email, token) => {
    // Verification link
    const verificationLink = `${process.env.weburl}/verify-email?token=${token}`;
    // Email options
    const mailOptions = {
        from: "anshikthind@gmail.com", // Sender's email
        to: email, // Recipient's email
        subject: "Email Verification",
        text: `Please click the following link to verify your email: ${verificationLink}`,
    };
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Email verification error: " + error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
};
const signupUser = async (req, res) => {
    console.log("hit");
    let {
        first_name,
        last_name,
        email,
        password,
        contact,
        role,
        dob,
        gender,
        address,
    } = req.body;
    password = await encryptPassword(password);
    const verificationToken = generateVerificationToken();
    try {
        const user = await User.create({
            verificationToken: verificationToken,
            email: email,
            password: password,
            first_name: first_name,
            last_name: last_name,
            address: address,
            gender: gender,
            dob: dob,
            role: role,
            contact: contact,
            verified: false,
        });
        if (user) {
            sendVerificationEmail(email, verificationToken);
            res.json({ signup: true });
        } else {
            res.send({ signup: false });
        }
    } catch (error) {
        res.send({ signup: false });
    }
};

const createUserAppointment = async (req, res) => {
    // console.log(req.user);
    // console.log("Appointment create");
    // console.log(req.body);
    const { first_name, last_name, gender, dob, contact, date, time } = req.body;
    const appointmentDetails = await Appointment.create({
        userId: req.user,
        first_name: first_name,
        last_name: last_name,
        gender: gender,
        dob: dob,
        contact: contact,
        date: date,
        time: time,
        check: 0,
    });
    if (appointmentDetails) {
        res.send({ appointmentRegistered: true });
    } else {
        res.send({ appointmentRegistered: false });
    }
};
const getUserAppointment = async (req, res) => {
    const allappointments = await Appointment.find({
        userId: req.user,
    });
    // console.log("Appointment got");
    res.send(allappointments);
    // try {
    //     const oneTaskDetails = await Appointment.findOne({ _id: id });
    // } catch (error) {
    //     res.send("task not found").status(400);
    // }
};

const updateUserAppointment = async (req, res) => {
    console.log("Appointment update");
    // res.send({ yed: 'k' })
    // return;
    const { first_name, last_name, gender, dob, contact, date, time, _id } =
        req.body;
    console.log(req.body);
    const data = await Appointment.findOneAndUpdate(
        { _id: _id },
        {
            userId: req.user,
            first_name: first_name,
            last_name: last_name,
            gender: gender,
            dob: dob,
            contact: contact,
            date: date,
            time: time,
        },
        {
            new: true,
            runValidators: true,
        },
    );
    if (data) {
        res.send(data);
    } else {
        res.send({ yed: "k" });
    }
};
const sendAllAppointments = async (req, res) => {
    const data = await Appointment.find({ check: 0 });
    if (data) {
        res.send(data);
    } else {
        res.send({ data: null });
    }
};
const acceptDoctorByUser = async (req, res) => {
    const userId = req.user;
    const { doctorId, _id } = req.body;
    const data = await Appointment.findById(_id);
    const user = await User.findById(userId);
    data.check = 1;
    data.save();
    let doctor = data.doctorIds.filter((e) => e.doctorId == doctorId);
    doctor = doctor[0];

    const mailOptions = {
        from: "anshikthind@gmail.com", // Sender's email
        to: user.email, // Recipient's email
        subject: "Your Appointment Details",
        text: ` Your Appointment time is ${doctor.first_name} ${doctor.last_name}  ${doctor.time} ${doctor.date}`,
    };
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Email verification error: " + error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
    res.send('done')
};
const acceptUserAppointment = async (req, res) => {
    const { _id, time, date } = req.body;
    const appointmentId = _id;
    const doctorId = req.user;
    // console.log(doc)
    const doctorData = await User.findById(doctorId);
    const data = await Appointment.findById(appointmentId);
    console.log(doctorData);
    console.log(doctorId);
    console.log(data);
    console.log(date);
    console.log(time);
    // res.send('hi')
    // return
    console.log(data);
    if (data) {
        if (data.check == 0) {
            data.doctorIds.push({
                doctorId: doctorId,
                first_name: doctorData.first_name,
                last_name: doctorData.last_name,
                time: time,
                date: date,
            });
            data.save();

            res.send(data);
        }
    } else {
        res.send({ data: null });
    }
};
const deleteUserAppointment = async (req, res) => {
    const data = await Appointment.findOneAndDelete({ _id: req.body._id });
    res.send(data);
};
module.exports = {
    signupUser,
    loginUser,
    createUserAppointment,
    getUserAppointment,
    deleteUserAppointment,
    updateUserAppointment,
    verifyEmailToken,
    sendAllAppointments,
    acceptUserAppointment,
    acceptDoctorByUser,
};
