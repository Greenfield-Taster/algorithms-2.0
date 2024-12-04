import Task1 from "./Tasks/Task1";
import Task2 from "./Tasks/Task2";
import "./Project2.css";
import React, { useState } from "react";

const Project2 = () => {
  const [taskNumber, setTaskNumber] = useState(0);

  const handleClick = (number) => {
    setTaskNumber(number);
  };

  return (
    <div className="Project2">
      <div className="wrapperProj2">
        <div className="wrapperButtons">
          <div className="blockProj1">
            <button onClick={() => handleClick(1)}>Task 1(Variant D)</button>
          </div>
          <div className="blockProj1">
            <button onClick={() => handleClick(2)}>Task 2(Variant D)</button>
          </div>
        </div>
        <div className="wrapperTasks">
          {taskNumber === 0 ? null : taskNumber === 1 ? (
            <Task1 />
          ) : taskNumber === 2 ? (
            <Task2 />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Project2;
