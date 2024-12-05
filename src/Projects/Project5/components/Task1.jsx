import React, { useState } from "react";

const gcd = (a, b) => {
  while (b) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
};

const GraphCoprimePairs = () => {
  const vertices = [5, 10, 7, 14, 13, 21];
  const edges = [
    [0, 1], // (5, 10)
    [1, 2], // (10, 7)
    [2, 3], // (7, 14)
    [3, 4], // (14, 13)
    [4, 5], // (13, 21)
  ];

  const areCoprime = (v1, v2) => {
    return gcd(vertices[v1], vertices[v2]) === 1;
  };

  const countCoprimePairs = () => {
    let coprimeCount = 0;
    edges.forEach(([v1, v2]) => {
      if (areCoprime(v1, v2)) {
        coprimeCount++;
      }
    });
    return coprimeCount;
  };

  return (
    <div>
      <h2>Graph Coprime Pairs</h2>
      <div>
        <h3>Vertices: {vertices.join(", ")}</h3>
        <h3>Edges: {edges.map(([v1, v2]) => `(${v1}, ${v2})`).join(", ")}</h3>
        <h3>Number of Coprime Pairs: {countCoprimePairs()}</h3>
      </div>
    </div>
  );
};

export default GraphCoprimePairs;
