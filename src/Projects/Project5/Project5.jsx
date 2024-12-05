import Task1 from "./components/Task1";
import Task2 from "./components/Task2";
import Task3 from "./components/Task3";
import "./Project5.css";
import React, { useState } from "react"; 

const Project5 = () => {
  const [taskNumber, setTaskNumber] = useState(0);

  const handleClick = (number) => {
    setTaskNumber(number);
  };

  return (
    <div className="Project5">
      <div className="wrapperProj2">
        <div className="wrapperButtons">
          <div className="blockProj1">
            <button onClick={() => handleClick(1)}>Task 1(Variant D)</button>
          </div>
          <div className="blockProj1">
            <button onClick={() => handleClick(2)}>Task 2(Variant D)</button>
          </div>
          <div className="blockProj1">
            <button onClick={() => handleClick(3)}>Task 3(Variant D)</button>
          </div>
        </div>
        <div className="wrapperTasks">
          {taskNumber === 0 ? null : taskNumber === 1 ? (
            <Task1 />
          ) : taskNumber === 2 ? (
            <Task2 />
          ) : taskNumber === 3 ? (
            <Task3 />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Project5;
