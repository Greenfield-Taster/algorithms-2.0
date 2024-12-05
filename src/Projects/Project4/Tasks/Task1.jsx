import React, { useState } from "react";

const App = () => {
  const [speeds, setSpeeds] = useState("");
  const [groups, setGroups] = useState("");
  const [result, setResult] = useState(null);
 
  const generatePermutations = (array) => {
    if (array.length === 1) return [array];
    const permutations = [];
    for (let i = 0; i < array.length; i++) {
      const rest = array.slice(0, i).concat(array.slice(i + 1));
      const restPermutations = generatePermutations(rest);
      restPermutations.forEach((perm) => {
        permutations.push([array[i], ...perm]);
      });
    }
    return permutations;
  };
 
  const canFormGroups = (permutation, groupCount) => {
    let currentGroupSpeed = permutation[0];
    let currentGroupSize = 1;
    let formedGroups = 1;

    for (let i = 1; i < permutation.length; i++) {
      if (permutation[i] <= currentGroupSpeed) { 
        currentGroupSize++;
      } else { 
        formedGroups++;
        if (formedGroups > groupCount) return false;
        currentGroupSpeed = permutation[i];
        currentGroupSize = 1;
      }
    }

    return formedGroups === groupCount;
  };

const calculateOrders = () => {
  const speedArray = speeds.split(",").map(Number);
  const groupCount = parseInt(groups, 10);

  if (speedArray.length === 0 || groupCount <= 0) {
    alert("Введіть коректні дані!");
    return;
  }
 
  if (groupCount === 1) {
    const factorial = (n) => (n <= 1 ? 1 : n * factorial(n - 1));
    setResult(factorial(speedArray.length));
    return;
  }

  const permutations = generatePermutations(speedArray);
  const validOrders = permutations.filter((perm) =>
    canFormGroups(perm, groupCount)
  );

  setResult(validOrders.length);
};

  return (
    <div>
      <h1>Розбиття роботів на групи</h1>
      <label>
        Швидкості роботів (через кому):
        <input
          type="text"
          value={speeds}
          onChange={(e) => setSpeeds(e.target.value)}
        />
      </label>
      <br />
      <label>
        Кількість груп:
        <input
          type="number"
          value={groups}
          onChange={(e) => setGroups(e.target.value)}
        />
      </label>
      <br />
      <button onClick={calculateOrders}>Розрахувати</button>
      <h2>Кількість можливих стартових порядків: {result}</h2>
    </div>
  );
};

export default App;
