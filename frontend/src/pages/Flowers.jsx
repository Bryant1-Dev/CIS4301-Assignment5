import React from "react";
import FlowersTable from "./../components/flowers.table.component";
import "./../style/flowers.style.css";
const Flowers = props => {
  return (
    <div className="flowers-container">
      <FlowersTable />
    </div>
  );
};

export default Flowers;
