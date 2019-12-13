import React, { useState, useEffect } from "react";
import axios from "axios";
const SightingsTable = props => {
  const [sightings, setSightings] = useState([]);
  const [errorMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [person, setPerson] = useState("");
  const [location, setLocation] = useState("");
  const [sighted, setSighted] = useState("");

  const onSubmit = event => {
    event.preventDefault();
    console.log("name is: " + name);
    console.log("person is: " + person);
    console.log("location is: " + location);
    console.log("sighted is: " + sighted);

    let newSighting = {
      name,
      person,
      location,
      sighted
    };
    let data = { newSighting };
    axios.post("/sightings/insert", data).then(response => {
      if (response.data.success) {
        console.log(response.data.message);
      } else {
        console.log(response.data.message);
      }
      setName("");
      setPerson("");
      setLocation("");
      setSighted("");
    });
  };

  const parse = data => {
    return data.sightings.map((sighting, index) => {
      return (
        <>
          <tr key={index}>
            <td>{sighting.NAME}</td>
            <td>{sighting.PERSON}</td>
            <td>{sighting.LOCATION}</td>
            <td>{sighting.SIGHTED}</td>
          </tr>
        </>
      );
    });
  };

  useEffect(() => {
    axios.get("/sightings/list").then(response => {
      const { success } = response.data;
      if (success) {
        console.log("result: " + response.data.result);
        setSightings(parse(response.data.result));
        setErrMsg("");
      } else {
        setErrMsg(response.data.message);
      }
      setLoading(false);
    });
  }, []);
  return (
    <>
      {loading && <p>Loading...</p>}
      {errorMsg && <p>{errorMsg}</p>}
      {sightings && (
        <>
          <div className="table-wrapper-scroll-y my-custom-scrollbar">
            <table className="table table-bordered table-striped mb-0">
              <tr>
                <th>Name</th>
                <th>Person</th>
                <th>Location</th>
                <th>Sighted</th>
              </tr>
              {sightings}
            </table>
          </div>
        </>
      )}
      {sightings && (
        <>
          <h1>Row to Insert</h1>
          <p>Note: Refresh the page to see changes</p>
          <p>Note: Changes will be at the bottom of the table</p>
          <form onSubmit={onSubmit}>
            <span>{`Name: `}</span>
            <input
              type="text"
              name="genus"
              onChange={e => setName(e.target.value)}
            />
            <br />
            <span>{`Person: `}</span>
            <input
              type="text"
              name="genus"
              onChange={e => setPerson(e.target.value)}
            />
            <br />
            <span>{`Location: `}</span>
            <input
              type="text"
              name="genus"
              onChange={e => setLocation(e.target.value)}
            />
            <br />
            <span>{`Sighted: `}</span>
            <input
              type="text"
              name="genus"
              onChange={e => setSighted(e.target.value)}
            />
            <br />
            <button type="submit">Insert Row!</button>
          </form>
        </>
      )}
    </>
  );
};

export default SightingsTable;
