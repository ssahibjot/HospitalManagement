const express = require("express");
const { routerAppointment, routerUser } = require("./routes/tasks");
const cors = require("cors");
const { connect } = require("./db/connect.js");
const { verifyToken } = require("./middleware/middleware");
const app = express();
require("dotenv").config();
app.use(cors());
app.use(express.json({}));
app.use(express.urlencoded({ extended: true }));
// app.get('/', (req, res) => {
//     console.log('hit')
// })
app.use("/api", routerUser);
app.use("/auth", verifyToken, routerAppointment);
const start = async () => {
    try {
        const db_url = process.env.mongod_url;
        const port = process.env.PORT || 8080;
        // await connect(db_url);
        connect(db_url);
        app.listen(port, () =>
            console.log(`server up n running on ${port} and connected to db....`)
        );
    } catch (error) {
        console.log(error);
        console.log("server did not started because of error in db connection...");
    }
};
start();
