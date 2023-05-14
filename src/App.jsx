import React, { useState } from "react";
import "./App.css";
import ColumnChart from "./chart";

const App = () => {
  const [words, setWords] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [showHistogram, setShowHistogram] = useState(false);

  const fetchWords = async () => {
    try {
      const response = await fetch(
        "https://www.terriblytinytales.com/test.txt"
      );
      const text = await response.text();
      const wordList = text.split(/\s+/);
      const wordCount = {};

      wordList.forEach((word) => {
        if (wordCount[word]) {
          wordCount[word] += 1;
        } else {
          wordCount[word] = 1;
        }
      });

      const sortedWords = Object.entries(wordCount).sort((a, b) => b[1] - a[1]);
      const topWords = sortedWords.slice(0, 20);

      setWords(topWords.map(([word, count]) => `${word} (${count})`));
      setChartData(topWords.map(([word, count]) => ({ word, count })));
    } catch (error) {
      console.error("Error fetching words:", error);
    }
  };

  const exportChartData = () => {
    const csvContent = `Word,Count\n${chartData
      .map(({ word, count }) => `${word},${count}`)
      .join("\n")}`;
    const encodedUri = encodeURI(`data:text/csv;charset=utf-8,${csvContent}`);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "histogram_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container">
      <h1>Terrifically Tiny Tales</h1>
      <div className="content">
        {!words.length && (
          <button className="btn" onClick={fetchWords}>
            Submit
          </button>
        )}
        {words.length > 0 && !showHistogram && (
          <div className="results">
            <div className="word-list-div">
              <h2>Top 20 Words</h2>
              <ul className="word-list">
                {words.map((word, index) => (
                  <li key={index}>{word}</li>
                ))}
              </ul>
            </div>
            <button className="btn" onClick={() => setShowHistogram(true)}>
              Show Histogram
            </button>
            <button className="btn export" onClick={exportChartData}>
              Export
            </button>
          </div>
        )}
        {showHistogram && (
          <div className="results">
            <div className="chart-div">
              <h2>Histogram</h2>
              <ColumnChart />
            </div>
            <button className="btn" onClick={() => setShowHistogram(false)}>
              Hide Histogram
            </button>
            <button className="btn export" onClick={exportChartData}>
              Export
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;