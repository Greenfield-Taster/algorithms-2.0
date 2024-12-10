function dijkstra(graph, startId, endId) {
  const distances = {};
  const prev = {};
  let cities = Object.keys(graph); // Замінили const на let
  const visited = new Set();

  cities.forEach((city) => {
    distances[city] = Infinity;
    prev[city] = null;
  });

  distances[startId] = 0;

  while (cities.length > 0) {
    const city = cities.reduce((minCity, city) =>
      distances[city] < distances[minCity] ? city : minCity
    );

    if (city === endId) break;

    cities = cities.filter((c) => c !== city); // Модифікуємо cities
    visited.add(city);

    graph[city].forEach((neighbor) => {
      if (visited.has(neighbor.to)) return;
      const alt = distances[city] + neighbor.distance;
      if (alt < distances[neighbor.to]) {
        distances[neighbor.to] = alt;
        prev[neighbor.to] = city;
      }
    });
  }

  const path = [];
  let u = endId;
  while (prev[u]) {
    path.unshift(u);
    u = prev[u];
  }
  if (distances[endId] === Infinity) return { path: [], distance: Infinity };

  path.unshift(startId);
  return { path, distance: distances[endId] };
}

function buildGraph(connections) {
  const graph = {};

  connections.forEach(({ from, to, distance, oneWay }) => {
    if (!graph[from]) graph[from] = [];
    graph[from].push({ to, distance });

    // Якщо дорога двостороння, додаємо і у зворотному напрямку
    if (!oneWay) {
      if (!graph[to]) graph[to] = [];
      graph[to].push({ to: from, distance });
    }
  });

  return graph;
}

export { dijkstra, buildGraph };
