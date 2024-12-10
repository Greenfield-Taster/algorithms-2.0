import React, { useState } from "react";
 
const solveInequalities = (n, inequalities) => {
  let distances = Array(n).fill(Infinity);
  distances[0] = 0;

  for (let i = 0; i < n - 1; i++) {
    for (let [xi, xj, q] of inequalities) {
      if (distances[xi] !== Infinity && distances[xj] > distances[xi] + q) {
        distances[xj] = distances[xi] + q;
      }
    }
  }
 
  for (let [xi, xj, q] of inequalities) {
    if (distances[xi] !== Infinity && distances[xj] > distances[xi] + q) {
      return "Система має цикли, розв'язку немає";
    }
  }

  return distances;
};

const Task1 = () => {
  const [n, setN] = useState(3);  
  const [m, setM] = useState(3);  
  const [inequalities, setInequalities] = useState([
    [0, 1, 2],
    [1, 2, 1],
    [0, 2, 3],
  ]);
  const [result, setResult] = useState(null);

  const handleChange = (e, idx, type) => {
    const value = e.target.value;
    setInequalities((prev) => {
      const newInequalities = [...prev];
      newInequalities[idx][type] = Number(value);
      return newInequalities;
    });
  };

  const handleSolve = () => {
    const solution = solveInequalities(n, inequalities);
    setResult(solution);
  };

  return (
    <div>
      <h1>Розв'язання системи різницевих обмежень</h1>

      <div>
        <label>
          Кількість невідомих (n):
          <input
            type="number"
            value={n}
            onChange={(e) => setN(Number(e.target.value))}
          />
        </label>
      </div>

      <div>
        <label>
          Кількість нерівностей (m):
          <input
            type="number"
            value={m}
            onChange={(e) => setM(Number(e.target.value))}
          />
        </label>
      </div>

      <div>
        <h3>Введіть нерівності (xi - xj ≤ q):</h3>
        {Array.from({ length: m }).map((_, idx) => (
          <div key={idx}>
            <label>
              xi:
              <input
                type="number"
                value={inequalities[idx][0]}
                onChange={(e) => handleChange(e, idx, 0)}
              />
            </label>
            <label>
              xj:
              <input
                type="number"
                value={inequalities[idx][1]}
                onChange={(e) => handleChange(e, idx, 1)}
              />
            </label>
            <label>
              q:
              <input
                type="number"
                value={inequalities[idx][2]}
                onChange={(e) => handleChange(e, idx, 2)}
              />
            </label>
          </div>
        ))}
      </div>

      <button onClick={handleSolve}>Розв'язати</button>

      {result && (
        <div>
          <h3>Результат:</h3>
          {typeof result === "string" ? (
            <p>{result}</p>
          ) : (
            <pre>{JSON.stringify(result, null, 2)}</pre>
          )}
        </div>
      )}
    </div>
  );
};

export default Task1;
