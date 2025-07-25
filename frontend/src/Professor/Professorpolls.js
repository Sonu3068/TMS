import React, { useState } from "react";
import "./Professorpolls.css";

function Professorpolls() {
  const [pollData, setPollData] = useState({ question: "", options: ["", "", "", ""] });
  const [numOptions, setNumOptions] = useState(4);
  const [polls, setPolls] = useState([]);
  const [status, setStatus] = useState("");

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;

    if (name === "question") {
      setPollData((pd) => ({ ...pd, question: value }));
    } else if (name === "option" && typeof index === "number") {
      setPollData((pd) => {
        const newOptions = [...pd.options];
        newOptions[index] = value;
        return { ...pd, options: newOptions };
      });
    }
  };

  const handleNumOptionsChange = (e) => {
    const value = parseInt(e.target.value, 10);
    const n = Math.max(2, Math.min(10, isNaN(value) ? 4 : value));
    setNumOptions(n);
    setPollData((pd) => ({
      ...pd,
      options: Array(n)
        .fill("")
        .map((_, i) => pd.options[i] || "")
    }));
  };

  const handleCreatePoll = () => {
    if (!pollData.question.trim() || pollData.options.filter((o) => o.trim()).length < 2) {
      setStatus("Provide a question and at least two options.");
      return;
    }
    setPolls((ps) => [
      ...ps,
      { id: Date.now(), question: pollData.question, options: pollData.options }
    ]);
    setPollData({ question: "", options: Array(numOptions).fill("") });
    setStatus("Poll created!");
    setTimeout(() => setStatus(""), 3000);
  };

  return (
    <div className="center-container">
      <div className="poll-wrapper">
        <h2>Create Poll</h2>

        {status && (
          <div className={status.includes("!") ? "status-success" : "status-error"}>
            {status}
          </div>
        )}

        <div className="input-group">
          <label>Number of Timeslots:</label>
          <input
            type="number"
            min="2"
            max="10"
            value={numOptions}
            onChange={handleNumOptionsChange}
          />
        </div>

        <div className="input-group">
          <label>Poll Question:</label>
          <input
            type="text"
            name="question"
            value={pollData.question}
            onChange={(e) => handleInputChange(e)}
            placeholder="Enter poll question"
          />
        </div>

        {pollData.options.map((opt, i) => (
          <div className="input-group" key={i}>
            <label>Timeslot {i + 1}:</label>
            <input
              type="text"
              name="option"
              value={opt}
              onChange={(e) => handleInputChange(e, i)}
              placeholder={`Enter Timeslot ${i + 1}`}
            />
          </div>
        ))}

        <button onClick={handleCreatePoll}>Create Poll</button>

        <div className="poll-container">
          <h3>Created Polls:</h3>
          {polls.map((p) => (
            <div className="poll-item" key={p.id}>
              <strong>{p.question}</strong>
              <ul>
                {p.options.map((opt, idx) => (
                  <li key={idx}>{opt}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Professorpolls;
