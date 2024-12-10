//Алгоритм Флойда-Воршелла - призначений для пошуку найкоротшого шляху між всіма парами вершин.
import React, { useState, useEffect } from "react";
import { buildGraph, dijkstra } from "./task2Class";
import data from "./data.json";

function ShortestPaths() {
  const [graph, setGraph] = useState({});
  const [shortestPaths, setShortestPaths] = useState([]);

  useEffect(() => {
    const builtGraph = buildGraph(data.connections);
    setGraph(builtGraph);
    findAllShortestPaths(builtGraph);
  }, []);

  const findAllShortestPaths = (graph) => {
    const paths = [];
    const cities = data.cities;

    for (let i = 0; i < cities.length; i++) {
      for (let j = 0; j < cities.length; j++) {
        if (i !== j) {
          const { path, distance } = dijkstra(
            graph,
            cities[i].id,
            cities[j].id
          );
          paths.push({
            from: cities[i].name,
            to: cities[j].name,
            path,
            distance,
          });
        }
      }
    }
    setShortestPaths(paths);
  };

  return (
    <div>
      <h1>All Shortest Paths</h1>
      <table>
        <thead>
          <tr>
            <th>Start cities</th>
            <th>End cities</th>
            <th>Path</th>
            <th>Distance (KM)</th>
          </tr>
        </thead>
        <tbody>
          {shortestPaths.map((result, index) => (
            <tr key={index}>
              <td>{result.from}</td>
              <td>{result.to}</td>
              <td>
                Path:{" "}
                {result.path
                  .map(
                    (id) =>
                      data.cities.find((cities) => cities.id === parseInt(id))
                        .name
                  )
                  .join(" → ")}
              </td>
              <td>{result.distance.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ShortestPaths;
