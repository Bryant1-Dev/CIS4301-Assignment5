import React, { useState, useEffect } from "react";
import axios from "axios";
const FlowersTable = props => {
  const [flowers, setFlowers] = useState([]);
  const [errorMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [clickedRow, setClickedRow] = useState(null);
  const [species, setSpecies] = useState("");
  const [genus, setGenus] = useState("");
  const [comname, setComname] = useState("");
  const [sightings, setSightings] = useState([]);

  const onClick = event => {
    console.log(event.currentTarget);
    let flower = event.currentTarget.getAttribute("data-item");
    console.log(flower);
    flower = JSON.parse(flower);
    setClickedRow(flower);
    setComname(flower.comname);
  };

  const showSightings = () => {
    console.log("comname is: " + comname);
    let data = { comname };
    axios.post(`/sightings/query`, data).then(response => {
      if (response.data.success) {
        console.log(response.data.result);
        setSightings(parseSightings(response.data.result));
      } else {
        console.log(response.data.message);
      }
    });
  };
  const onSubmit = event => {
    event.preventDefault();
    console.log("comname is: " + comname);
    console.log("genus is: " + genus);
    console.log("species is: " + species);

    let newFlower = {
      comname,
      genus,
      species
    };
    let data = { newFlower };
    axios.post("/flowers/update", data).then(response => {
      if (response.data.success) {
        console.log(response.data.message);
        setClickedRow(null);
      } else {
        console.log(response.data.message);
      }
      setComname("");
      setGenus("");
      setSpecies("");
    });
  };

  const parse = data => {
    return data.flowers.map((flower, index) => {
      let data = {
        comname: flower.COMNAME,
        genus: flower.GENUS,
        species: flower.SPECIES
      };
      return (
        <>
          <tr
            key={index}
            data-item={JSON.stringify(data)}
            onClick={e => onClick(e)}
          >
            <td>{flower.COMNAME}</td>
            <td>{flower.GENUS}</td>
            <td>{flower.SPECIES}</td>
          </tr>
        </>
      );
    });
  };

  const parseSightings = data => {
    return data.sightings.map((sighting, index) => {
      return (
        <>
          <tr
            key={index}
            data-item={JSON.stringify(sighting)}
            onClick={e => onClick(e)}
          >
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
    axios.get("/flowers/query").then(response => {
      const { success } = response.data;
      if (success) {
        console.log("result: " + response.data.result);
        setFlowers(parse(response.data.result));
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
      {flowers && (
        <>
        <h1>Please Click A Row</h1>
        <div className="table-wrapper-scroll-y my-custom-scrollbar">
          <table className="table table-bordered table-striped mb-0">
            <tr>
              <th>Common Name</th>
              <th>Genus</th>
              <th>Species</th>
            </tr>
            {flowers}
          </table>
        </div>
        </>
      )}
      {clickedRow && (
        <>
          <button onClick={showSightings}>Display Sightings!</button>
          <h1>Current Row to Update</h1>
          <span>{`Common Name: ${clickedRow.comname}`}</span>
          <form onSubmit={onSubmit}>
            <span>{`Genus: `}</span>
            <input
              type="text"
              name="genus"
              placeholder={clickedRow.genus}
              onChange={e => setGenus(e.target.value)}
            />
            <span>{`   Species: `}</span>
            <input
              type="text"
              name="species"
              placeholder={clickedRow.species}
              onChange={e => setSpecies(e.target.value)}
            />
            <br />
            <button type="submit">Update Row!</button>
          </form>
        </>
      )}
      {clickedRow && sightings && (
        <div className="">
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
      )}
    </>
  );
};

export default FlowersTable;
