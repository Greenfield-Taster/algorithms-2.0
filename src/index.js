import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Project1 from "./Projects/Project1/Project1";
import Project2 from "./Projects/Project2/Project2";
import Project3 from "./Projects/Project3/Project3";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/project1" element={<Project1 />} />
        <Route path="/project2" element={<Project2 />} />
        <Route path="/project3" element={<Project3 />} />
        {/*<Route path="/project4" element={<Project4 />} /> 
        <Route path="/project5" element={<Project5 />} /> 
        <Route path="/project6" element={<Project6 />} /> 
        <Route path="/project7" element={<Project7 />} />  */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
