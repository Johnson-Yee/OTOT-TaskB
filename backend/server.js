const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const app = express();
const port = 3000;
mongoose.connect(
    "mongodb+srv://johnsonyee:johnsonyee@cluster0.rzsxbti.mongodb.net/restaurants",
    { useNewUrlParser: true }
);

const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to Database"));
app.use(express.json());

const restaurantRouter = require("./routes/restaurant");
app.use("/restaurants", restaurantRouter);
app.use(cors()); // config cors so that front-end can use
app.options("*", cors());
app.listen(process.env.PORT || port, () => console.log(`Server Started on port :${port}`));

module.exports = app;