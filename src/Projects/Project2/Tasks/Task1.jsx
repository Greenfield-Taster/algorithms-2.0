import React, { useState } from "react";

const HashTable = () => {
  const [hashTable, setHashTable] = useState([]);
  const [emailMap, setEmailMap] = useState({});
  const [searchResult, setSearchResult] = useState(null);

  const hashFunction = (key, size) => {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash + key.charCodeAt(i)) % size;
    }
    return hash;
  };

  const doubleHashing = (key, size, attempt) => {
    const primaryHash = hashFunction(key, size);
    const secondaryHash = 1 + (key.length % (size - 1));
    return (primaryHash + attempt * secondaryHash) % size;
  };

  const buildHashTable = (data, size) => {
    const table = new Array(size).fill(null);
    const map = {};
    data.forEach(([email, company]) => {
      let index = hashFunction(email, size);
      let attempt = 0;

      while (table[index] !== null) {
        attempt++;
        index = doubleHashing(email, size, attempt);
      }

      table[index] = { email, company };
      map[email] = index;
    });
    setHashTable(table);
    setEmailMap(map);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target.result;
      const lines = text
        .split("\n")
        .filter(Boolean)
        .map((line) => line.split(",").map((item) => item.trim()));
      buildHashTable(lines, 31);  
    };

    reader.readAsText(file);
  };

  const handleSearch = (email) => {
    const index = emailMap[email];
    if (index !== undefined && hashTable[index]?.email === email) {
      setSearchResult(hashTable[index].company);
    } else {
      setSearchResult("Not Found");
    }
  };

  return (
    <div>
      <h1>Hash Table Implementation</h1>
      <input type="file" accept=".txt" onChange={handleFileUpload} />
      <input
        type="text"
        placeholder="Search by email"
        onBlur={(e) => handleSearch(e.target.value)}
      />
      <div>
        <h2>Search Result:</h2>
        <p>{searchResult}</p>
      </div>
      <h2>Hash Table:</h2>
      <table>
        <thead>
          <tr>
            <th>Index</th>
            <th>Email</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          {hashTable
            .map((entry, index) => ({ ...entry, index }))
            .filter((entry) => entry.email)  
            .map((entry) => (
              <tr key={entry.index}>
                <td>{entry.index}</td>
                <td>{entry.email}</td>
                <td>{entry.company}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default HashTable;
