import React, { useState } from "react";

const App = () => {
  const [popularItems, setPopularItems] = useState(["Milk", "Bread", "Eggs"]); // Початкові популярні товари
  const [queue, setQueue] = useState([
    ["Milk", "Eggs"],
    ["Juice", "Bread"],
    ["Eggs", "Butter"],
    ["Bread", "Cheese"],
  ]); // Черга покупців
  const [log, setLog] = useState([]); // Журнал операцій

  const maxPopularItems = 3; // Максимальна кількість популярних товарів

  const processQueue = () => {
    const newLog = [];
    const currentItems = [...popularItems]; // Копія списку популярних товарів

    queue.forEach((customer, index) => {
      customer.forEach((item) => {
        if (currentItems.includes(item)) {
          newLog.push(`Customer ${index + 1}: ${item} found in popular items.`);
        } else {
          newLog.push(
            `Customer ${index + 1}: ${item} not found, retrieving from shelf.`
          );
          if (currentItems.length < maxPopularItems) {
            currentItems.push(item);
            newLog.push(`Added ${item} to popular items.`);
          } else {
            const removed = currentItems.shift(); // Видаляємо найстаріший
            currentItems.push(item);
            newLog.push(`Replaced ${removed} with ${item} in popular items.`);
          }
        }
      });
    });

    setPopularItems(currentItems); // Оновлюємо популярні товари
    setLog(newLog); // Оновлюємо лог
    setQueue([]); // Очищуємо чергу
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Store Popular Items Manager</h1>
      <h2>Popular Items:</h2>
      <ul>
        {popularItems.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
      <h2>Queue:</h2>
      {queue.length > 0 ? (
        <ul>
          {queue.map((customer, idx) => (
            <li key={idx}>
              Customer {idx + 1}: {customer.join(", ")}
            </li>
          ))}
        </ul>
      ) : (
        <p>No customers in queue.</p>
      )}
      <button
        onClick={processQueue}
        style={{ marginTop: "20px", padding: "10px" }}
      >
        Process Queue
      </button>
      <h2>Log:</h2>
      <ul>
        {log.map((entry, idx) => (
          <li key={idx}>{entry}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
