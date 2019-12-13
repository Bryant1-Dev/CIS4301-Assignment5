/* Query - Allow the user to select from a list of flowers. Using the selected flower, display the 10 most recent sightings of the selected flower.
Information should include the date, location, and who sighted the flower.
• Update - Allow a user to select and update flower information.
• Insert - Allow a user to insert a new sighting of a flower */

const express = require("express");
const router = express.Router();

//User-defined modules
const db = require("./../database/database").db;

/*
 *Route: "sightings/query"
 *Description: display the 10 most recent sightings of a selected flower.
 *Information should include the date, location, and who sighted the flower.
 */

router.post("/query", (req, res) => {
  //Note: SIGHTING.NAME is a foreign key into FLOWER.COMNAME

  //Sightings: name, person, location, sighted
  //Primary key: name

  const result = {
    sightings: []
  };

  let commonName = req.body.comname;
  console.log(commonName);
  let data = {
    $comname: commonName
  };

  let sql = `SELECT * FROM sightings s WHERE s.name = $comname`;

  db.all(sql, data, (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.send({
        success: false,
        message: `Sqlite Query Sightings error: ${err.message}`
      });
    }
    if (!rows) {
      return res.send({
        success: false,
        message: `There was are no entries in the Sightings table with the name of: ${commonName}`
      });
    }

    rows.forEach(row => {
      //console.log(row);
      if (result.sightings.length < 10) {
        result.sightings.push(row);
      }
    });

    res.send({
      success: true,
      result,
      messsage:
        "Successfully retrieved data from Sightings table by the name of: ${commonName}"
    });
  });
});

/*
 *Route: "/sightings/insert"
 *Description: Insert - Allow a user to insert a new sighting of a flower
 */

router.post("/insert", (req, res) => {
  //Incoming data: an object containing name, person, location, and sighted attributes

  const { newSighting } = req.body;
  let data = {
    $name: newSighting.name,
    $person: newSighting.person,
    $location: newSighting.location,
    $sighted: newSighting.sighted
  };

  let sql = `INSERT INTO sightings(name, person, location, sighted) VALUES($name, $person, $location , $sighted)`;

  db.run(sql, data, err => {
    if (err) {
      console.error(err.message);
      return res.send({
        success: false,
        message: `Sqlite Insert Sightings error: ${err.message}`
      });
    }

    //console.log(`Row(s) updated: ${this.changes}`);
    //console.log(`Row was added to the table: ${this.lastID}`);
    res.send({
      success: true,
      message: `Successfully inserted an entry into the "Sigtings" table with the name of: ${newSighting.name}`
    });
  });
});

/*
 *Route: "sightings/list"
 *Description:  Retrieve a list of all sightings
 */

router.get("/list", (req, res) => {
  //Note: SIGHTINGS.NAME is a primary key

  //Flowers: name, person, location, sighted
  //Primary key: name

  const result = {
    sightings: []
  };

  let sql = `SELECT * FROM sightings`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.send({
        success: false,
        message: `Sqlite List Sightings error: ${err.message}`
      });
    }
    if (!rows) {
      return res.send({
        success: false,
        message: `There are no entries in the Sightings table`
      });
    }

    rows.forEach(row => {
      //console.log(row);
      result.sightings.push(row);
    });

    res.send({
      success: true,
      result,
      messsage: "Successfully retrieved data from Flowers table"
    });
  });
});
module.exports = router;
