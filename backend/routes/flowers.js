/* Query - Allow the user to select from a list of flowers. Using the selected flower, display the 10 most recent sightings of the selected flower.
Information should include the date, location, and who sighted the flower.
• Update - Allow a user to select and update flower information.
• Insert - Allow a user to insert a new sighting of a flower */

const express = require("express");
const router = express.Router();

//User-defined modules
const db = require("./../database/database").db;

/*
 *Route: "flowers/query"
 *Description:  Retrieve a list of all flowers
 */

router.get("/query", (req, res) => {
  //Note: FLOWERS.COMNAME is a primary key

  //Flowerss: comname, genus, species
  //Primary key: comname

  const result = {
    flowers: []
  };

  let sql = `SELECT * FROM flowers`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.send({
        success: false,
        message: `Sqlite Query Flowers error: ${err.message}`
      });
    }
    if (!rows) {
      return res.send({
        success: false,
        message: `There are no entries in the Flowers table`
      });
    }

    rows.forEach(row => {
      //console.log(row);
      result.flowers.push(row);
    });

    res.send({
      success: true,
      result,
      messsage: "Successfully retrieved data from Flowers table"
    });
  });
});

/*
 *Route: "flowers/update"
 *Description: Update - Allow a user to select and update flower information
 */

router.post("/update", (req, res) => {
  //Note: comname is the primary key for the Flowers table

  //Incoming data: an object containing comname, genus, and species attributes
  //Primary key: commname
  //Potential values to update: genus, species

  let newFlower = req.body.newFlower;
  console.log(newFlower.comname);
  let data = {
    $comname: newFlower.comname,
    $genus: newFlower.genus,
    $species: newFlower.species
  };
  let sql = `UPDATE flowers
            SET genus = $genus, species = $species
            WHERE comname = $comname`;

  db.run(sql, data, function(err) {
    if (err) {
      console.error(err.message);
      return res.send({
        success: false,
        message: `Sqlite Update Flowers error: ${err.message}`
      });
    }
    console.log(`Row(s) updated: ${this.changes}`);
    if (this.changes === 0) {
      //No rows were updated
      return res.send({
        success: false,
        message: `There was no entry in the Flowers table with the common name of: ${newFlower.comname}`
      });
    }
    return res.send({
      success: true,
      message: `Successfully updated an entry in the "Flowers" table with the common name of: ${newFlower.comname}`
    });
  });
});

module.exports = router;
