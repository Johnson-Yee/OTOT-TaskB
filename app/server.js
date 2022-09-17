require("dotenv").config();

const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const port = 3000;
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());

const restaurantRouter = require("../routes/restaurant");
app.use("/restaurants", restaurantRouter);

app.listen(process.env.PORT || port, () => console.log(`Server Started on port :${port}`));
