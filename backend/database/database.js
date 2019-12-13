const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const dbPath = path.resolve(__dirname, "flowers2019.db");
// open the database
/*const connect = async () => {
  return new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, err => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Connected to the flowers2019 database.");
  });
};*/
let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the flowers2019 database.");
});

module.exports = {
  db
};
//example query
/*db.serialize(() => {
  db.each(
    `SELECT PlaylistId as id,
                    Name as name
             FROM playlists`,
    (err, row) => {
      if (err) {
        console.error(err.message);
      }
      console.log(row.id + "\t" + row.name);
    }
  );
});*/

// close the database connection
/*db.close(err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Close the database connection.");
});*/
