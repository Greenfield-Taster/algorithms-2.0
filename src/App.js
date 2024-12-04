import React from "react";
import { Link } from "react-router-dom";
import "./App.css"

const App = () => {
  return (
    <div className="App">
      <div className="wrapper">
        <div className="blocks">
          <Link to="/project1" className="link">
            <div className="block">Project 1</div>
          </Link>
          <Link to="/project2" className="link">
            <div className="block">Project 2</div>
          </Link>
          <Link to="/project3" className="link">
            <div className="block">Project 3</div>
          </Link>
          <Link to="/project4" className="link">
            <div className="block">Project 4</div>
          </Link>
          <Link to="/project5" className="link">
            <div className="block">Project 5</div>
          </Link>
          <Link to="/project6" className="link">
            <div className="block">Project 6</div>
          </Link>
          <Link to="/project7" className="link">
            <div className="block">Project 7</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default App;
