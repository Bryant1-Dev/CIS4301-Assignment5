import React from "react";
import "./../style/home.style.css";
const Home = props => {
  return (
    <>
      {/*<!-- Full Page Image Header with Vertically Centered Content -->*/}
      <header className="masthead">
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-12 text-center">
              <h1 className="font-weight-light">Bryant Wilkins</h1>
              <h1 className="font-weight-light">CIS 4301: Assignment 5</h1>
              <p className="lead">
                User the Navigation Bar to interact with the Flowers and
                Sightings tables respectively.
              </p>
              <p className="lead">
                Refresh the page to show updates (or insertions) into the
                tables.
              </p>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Home;
