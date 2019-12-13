const express = require("express");
const bodyParser = require("body-parser");

//const db = require("./database/database");
const flowers = require("./routes/flowers");
const sightings = require("./routes/sightings");

const app = express();
app.set("trust proxy", true);

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); //allows us to deal with form data and json data

const PORT = process.env.PORT || 5000;

//Routes
app.use("/flowers", flowers);
app.use("/sightings", sightings);

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}...`));
