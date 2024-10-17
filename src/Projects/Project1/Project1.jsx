import "./Project1.css";
import React, { useState } from "react";
import {Task1} from './Tasks/Task1'
import {Task2} from './Tasks/Task2'
import { processStudentData } from "./Tasks/Task3";

function Project1() {
  const list = new Task1();

  const handleActionsList = () => {
    list.addToStart(1);
    list.addToStart(2);
    list.addAfter(1, 3);
    list.search(3);
    list.delete(2);
    list.displayFromStart();
    list.displayFromEnd();
  };

  const heap = new Task2();

  const handleActionsHeap = () => {
    heap.insert(10);
    heap.insert(5);
    heap.insert(20);
    heap.insert(1);
    heap.display();

    heap.remove();
    heap.display();

    const arr = [3, 9, 2, 1, 7, 8];
    heap.buildHeap(arr);
    heap.display();

    heap.heapSort();
  };

 const studentDebts = [
   {
     name: "Іван Іванов",
     faculty: "ФІТ",
     subject: "Математика",
     date: "2024-09-10",
     status: "борг",
   },
   {
     name: "Петро Петренко",
     faculty: "ФІТ",
     subject: "Фізика",
     date: "2024-09-12",
     status: "борг",
   },
   {
     name: "Марія Коваль",
     faculty: "Біологія",
     subject: "Хімія",
     date: "2024-09-15",
     status: "борг",
   },
   {
     name: "Олена Коваль",
     faculty: "Біологія",
     subject: "Біологія",
     date: "2024-09-18",
     status: "борг",
   },
 ];

  const handleSort = () => {
    const sortedFaculties = processStudentData(studentDebts);
    console.log("Відсортовані факультети:", sortedFaculties);
  };

  return (
    <div className="Project1">
      <div className="wrapperProj1">
        <div className="blockProj1">
          <button onClick={handleActionsList}>Двозв'язний список</button>
        </div>
        <div className="blockProj1">
          <button onClick={handleActionsHeap}>Купа</button>
        </div>
        <div className="blockProj1">
          <button onClick={handleSort}>
            Пірамідальне сортування (варіант 5)
          </button>
        </div>
      </div>
    </div>
  );
}

export default Project1;
