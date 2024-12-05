import React, { useState } from "react";

const WordWrap = () => {
  const [text, setText] = useState("");
  const [maxLineLength, setMaxLineLength] = useState(20);
  const [result, setResult] = useState([]);

  const wrapText = () => {
    const words = text.split(" ");
    const lines = [];

    const calculateCost = (line) => {
      const spaces = maxLineLength - line.length;
      return spaces * spaces * spaces;
    };
 
    const wrap = () => {
      let currentLine = "";
      let currentCost = 0;
      for (let i = 0; i < words.length; i++) {
        const word = words[i];
        if (currentLine.length + word.length + 1 <= maxLineLength) {
          if (currentLine) currentLine += " ";
          currentLine += word;
        } else { 
          lines.push({ line: currentLine, cost: calculateCost(currentLine) });
          currentLine = word; 
        }
      }

      if (currentLine) {
        lines.push({ line: currentLine, cost: 0 }); 
      }
    };

    wrap();
 
    setResult(lines.map((line) => line.line));
  };

  return (
    <div>
      <h2>Text Wrapping</h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your text here"
        rows="6"
        cols="40"
      />
      <br />
      <input
        type="number"
        value={maxLineLength}
        onChange={(e) => setMaxLineLength(e.target.value)}
        placeholder="Max line length"
      />
      <br />
      <button onClick={wrapText}>Wrap Text</button>
      <div>
        <h3>Result:</h3>
        {result.length > 0 &&
          result.map((line, index) => <div key={index}>{line}</div>)}
      </div>
    </div>
  );
};

export default WordWrap;
