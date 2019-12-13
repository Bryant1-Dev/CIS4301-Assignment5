import React from "react";
import SightingsTable from "./../components/sightings.table.component";
import "./../style/flowers.style.css";
const Sightings = props => {
  return (
    <div className="flowers-container">
      <SightingsTable />
    </div>
  );
};

export default Sightings;
