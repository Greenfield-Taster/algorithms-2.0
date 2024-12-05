import React, { useState } from "react";
 
const dictionary = [
  "cat",
  "bat",
  "bit",
  "bot",
  "bog",
  "dog",
  "log",
  "lot",
  "dot",
  "cot",
];

const WordTransformer = () => {
  const [wordA, setWordA] = useState("");
  const [wordB, setWordB] = useState("");
  const [steps, setSteps] = useState([]);
  const [error, setError] = useState("");
 
  const isOneLetterDifference = (word1, word2) => {
    if (word1.length !== word2.length) return false;
    let diffCount = 0;
    for (let i = 0; i < word1.length; i++) {
      if (word1[i] !== word2[i]) {
        diffCount++;
      }
      if (diffCount > 1) return false;
    }
    return diffCount === 1;
  };
 
  const findTransformationPath = (start, end) => {
    if (!dictionary.includes(start) || !dictionary.includes(end)) {
      setError("Both words must exist in the dictionary.");
      return [];
    }

    const queue = [[start]];
    const visited = new Set([start]);

    while (queue.length > 0) {
      const path = queue.shift();
      const currentWord = path[path.length - 1];

      if (currentWord === end) {
        setError("");
        return path; 
      }
 
      for (const word of dictionary) {
        if (!visited.has(word) && isOneLetterDifference(currentWord, word)) {
          visited.add(word);
          queue.push([...path, word]);
        }
      }
    }

    setError("No transformation path found.");
    return [];
  };

  const handleSubmit = () => {
    if (wordA && wordB) {
      const path = findTransformationPath(wordA, wordB);
      setSteps(path);
    }
  };

  return (
    <div>
      <h1>Word Transformation Game</h1>
      <div>
        <input
          type="text"
          placeholder="Enter word A"
          value={wordA}
          onChange={(e) => setWordA(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter word B"
          value={wordB}
          onChange={(e) => setWordB(e.target.value)}
        />
        <button onClick={handleSubmit}>Find Transformation</button>
      </div>

      {error && <div style={{ color: "red" }}>{error}</div>}

      {steps.length > 0 && (
        <div>
          <h3>Transformation Path:</h3>
          <ol>
            {steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default WordTransformer;
