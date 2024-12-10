import React, { useState } from "react";

const Project7 = () => {
  const capacities = [
    [0, 20, 30, 0, 0], // factory → warehouse1, factory → warehouse2
    [0, 0, 0, 15, 5], // warehouse1 → shop1, warehouse1 → shop2
    [0, 0, 0, 10, 25], // warehouse2 → shop1, warehouse2 → shop2
    [0, 0, 0, 0, 0], // shop1 - магазин, немає виходу
    [0, 0, 0, 0, 0], // shop2 - магазин, немає виходу
  ];

  const [maxFlow, setMaxFlow] = useState(0);
  const [flowDetails, setFlowDetails] = useState([]);

  const findAugmentingPath = (graph, source, sink, parent) => {
    let visited = Array(graph.length).fill(false);
    let queue = [source];
    visited[source] = true;

    while (queue.length) {
      let u = queue.shift();

      for (let v = 0; v < graph.length; v++) {
        if (!visited[v] && graph[u][v] > 0) {
          queue.push(v);
          visited[v] = true;
          parent[v] = u;

          if (v === sink) {
            return true;
          }
        }
      }
    }
    return false;
  };

  // Алгоритм Форда-Фалкерсона
  const fordFulkerson = () => {
    let graph = JSON.parse(JSON.stringify(capacities)); 
    let parent = Array(graph.length).fill(-1);
    let maxFlow = 0;
    let flowDetails = [];

    while (findAugmentingPath(graph, 0, 4, parent)) {
      let pathFlow = Infinity;
      let s = 4;
      while (s !== 0) {
        let u = parent[s];
        pathFlow = Math.min(pathFlow, graph[u][s]);
        s = u;
      }

      let v = 4;
      while (v !== 0) {
        let u = parent[v];
        graph[u][v] -= pathFlow;
        graph[v][u] += pathFlow;
        flowDetails.push(
          `Path: ${
            ["factory", "warehouse1", "warehouse2", "shop1", "shop2"][u]
          } → ${
            ["factory", "warehouse1", "warehouse2", "shop1", "shop2"][v]
          } | Flow: ${pathFlow}`
        );
        v = u;
      }

      maxFlow += pathFlow;
    }

    setMaxFlow(maxFlow);
    setFlowDetails(flowDetails);
  };

  return (
    <div>
      <h1>Ford-Fulkerson Algorithm for Max Flow</h1>
      <button onClick={fordFulkerson}>Calculate Max Flow</button>
      <h2>Max Flow: {maxFlow}</h2>
      <h3>Flow Details:</h3>
      <ul>
        {flowDetails.map((detail, index) => (
          <li key={index}>{detail}</li>
        ))}
      </ul>
    </div>
  );
};

export default Project7;
