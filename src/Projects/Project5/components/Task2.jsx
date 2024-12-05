import React, { useState } from "react";

const ChessKnights = () => {
  const [knight1, setKnight1] = useState({ x: "", y: "" });
  const [knight2, setKnight2] = useState({ x: "", y: "" });
  const [result, setResult] = useState("");

  const moves = [
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
  ];

  const isValid = (x, y) => x >= 1 && x <= 8 && y >= 1 && y <= 8;

  const bfs = (start) => {
    const queue = [[start.x, start.y, 0]]; // [x, y, steps]
    const visited = new Set();
    visited.add(`${start.x},${start.y}`);

    const distances = new Map();

    while (queue.length > 0) {
      const [x, y, steps] = queue.shift();
      distances.set(`${x},${y}`, steps);

      for (const [dx, dy] of moves) {
        const nx = x + dx;
        const ny = y + dy;

        if (isValid(nx, ny) && !visited.has(`${nx},${ny}`)) {
          visited.add(`${nx},${ny}`);
          queue.push([nx, ny, steps + 1]);
        }
      }
    }
    return distances;
  };

  const findMeetingPoint = () => {
    const k1 = { x: parseInt(knight1.x), y: parseInt(knight1.y) };
    const k2 = { x: parseInt(knight2.x), y: parseInt(knight2.y) };

    // Validate input
    if (
      !isValid(k1.x, k1.y) ||
      !isValid(k2.x, k2.y) ||
      isNaN(k1.x) ||
      isNaN(k1.y) ||
      isNaN(k2.x) ||
      isNaN(k2.y)
    ) {
      setResult("Введите корректные координаты (от 1 до 8).");
      return;
    }

    // Perform BFS for both knights
    const distances1 = bfs(k1);
    const distances2 = bfs(k2);

    // Find the meeting point with the minimum steps
    let minSteps = Infinity;
    let meetingCell = null;

    for (const [cell, steps1] of distances1.entries()) {
      if (distances2.has(cell)) {
        const steps2 = distances2.get(cell);
        const maxSteps = Math.max(steps1, steps2);
        if (maxSteps < minSteps) {
          minSteps = maxSteps;
          meetingCell = cell;
        }
      }
    }

    // Display the result
    if (meetingCell) {
      const [x, y] = meetingCell.split(",").map(Number);
      setResult(
        `Кони встретятся на клетке (${x}, ${y}) через ${minSteps} ходов.`
      );
    } else {
      setResult("Кони никогда не смогут встретиться.");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Шахматные кони: минимальное количество ходов для встречи</h1>
      <div>
        <label>
          Координаты первого коня (x, y):
          <input
            type="number"
            placeholder="x"
            value={knight1.x}
            onChange={(e) => setKnight1({ ...knight1, x: e.target.value })}
            min="1"
            max="8"
          />
          <input
            type="number"
            placeholder="y"
            value={knight1.y}
            onChange={(e) => setKnight1({ ...knight1, y: e.target.value })}
            min="1"
            max="8"
          />
        </label>
      </div>
      <div>
        <label>
          Координаты второго коня (x, y):
          <input
            type="number"
            placeholder="x"
            value={knight2.x}
            onChange={(e) => setKnight2({ ...knight2, x: e.target.value })}
            min="1"
            max="8"
          />
          <input
            type="number"
            placeholder="y"
            value={knight2.y}
            onChange={(e) => setKnight2({ ...knight2, y: e.target.value })}
            min="1"
            max="8"
          />
        </label>
      </div>
      <button onClick={findMeetingPoint} style={{ marginTop: "10px" }}>
        Найти точку встречи
      </button>
      {result && <p style={{ marginTop: "20px" }}>{result}</p>}
    </div>
  );
};

export default ChessKnights;
