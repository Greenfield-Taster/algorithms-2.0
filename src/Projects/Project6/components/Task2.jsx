import React, { useState, useEffect } from "react";
import { buildGraph, dijkstra } from "./task2Class";
import data from "./data.json";

function Task2() {
  const [result, setResult] = useState({ path: [], distance: 0 });

  useEffect(() => {
    const graph = buildGraph(data.connections);
    const startId = data.cities.find((city) => city.name === "Запоріжжя").id;
    const endId = data.cities.find((city) => city.name === "Львів").id;

    const shortestPath = dijkstra(graph, startId, endId);
    setResult(shortestPath);
  }, []);

  return (
    <div>
      <h1>Shortest Path from Запоріжжя to Львів</h1>
      {result.path.length === 0 ? (
        <p>No path found.</p>
      ) : (
        <>
          <p>
            Path:{" "}
            {result.path
              .map(
                (id) =>
                  data.cities.find((street) => street.id === parseInt(id)).name
              )
              .join(" → ")}
          </p>
          <p>Total Distance: {result.distance} km</p>
        </>
      )}
    </div>
  );
}

export default Task2;
