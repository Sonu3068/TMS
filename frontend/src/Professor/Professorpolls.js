import React, { useState } from "react";
import "./Professorpolls.css";

function Professorpolls() {
  const [pollData, setPollData] = useState({
    question: "",
    options: ["", "", "", ""],
  });
  const YearBranch = ["CSE", "ECE", "EEE", "MECH", "CIVIL"];
  const [polls, setPolls] = useState([]);
  const [status, setStatus] = useState("");

  const handleInputChange = (e, index = null) => {
    const { name, value } = e.target;
    if (name === "question") {
      setPollData({ ...pollData, question: value });
    } else if (name === "option" && index !== null) {
      const newOptions = [...pollData.options];
      newOptions[index] = value;
      setPollData({ ...pollData, options: newOptions });
    }
  };

  const handleCreatePoll = () => {
    const validOptions = pollData.options.filter((opt) => opt.trim() !== "");
    if (!pollData.question.trim() || validOptions.length < 2) {
      setStatus("Please provide a question and at least two options.");
      return;
    }

    const newPoll = {
      id: Date.now(),
      question: pollData.question,
      options: validOptions.map((opt) => ({ text: opt, votes: 0 })),
    };
    setPolls([...polls, newPoll]);
    setPollData({ question: "", options: ["", "", "", ""] });
    setStatus("Poll created successfully!");
    setTimeout(() => setStatus(""), 3000);
  };

  const handleVote = (pollId, optionIndex) => {
    setPolls(
      polls.map((poll) => {
        if (poll.id === pollId) {
          const newOptions = [...poll.options];
          newOptions[optionIndex].votes = `Timeslot ${
            optionIndex === 1
              ? "1"
              : optionIndex === 2
              ? "2"
              : optionIndex === 3
              ? "3"
              : "4"
          }`;
          return { ...poll, options: newOptions };
        }
        return poll;
      })
    );
    setStatus("Vote recorded successfully!");
    setTimeout(() => setStatus(""), 3000);
  };

  const InputField = ({ label, name, value, onChange, placeholder }) => (
    <div className="input-group">
      <label className="input-label">{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="input-field"
      />
    </div>
  );

  const OptionField = ({ index, value, onChange }) => (
    <div className="input-group">
      <label className="input-label">Timeslot {index + 1}</label>
      <input
        type="text"
        name="option"
        value={value}
        onChange={(e) => onChange(e, index)}
        placeholder={`Enter Timeslot ${index + 1}`}
        className="input-field"
      />
    </div>
  );

  return (
    <div className="page-container" style={{ marginLeft: "2.5rem" }}>
      <div className="form-container">
        <h2 className="form-title">Professor Poll Creation</h2>
        {status && (
          <div
            className={`status-message ${
              status.includes("successfully")
                ? "status-success"
                : "status-error"
            }`}
          >
            {status}
          </div>
        )}
        <div className="form-content">
          <select
            label="Select the year&Branch"
            name="name"
            value={pollData.name}
            onChange={handleInputChange}
            placeholder="Enter your name"
          >
            <option>Select the year&Branch</option>
            {YearBranch.map((YearBranch, index) => (
              <option key={index} index={index}>
                {" "}
                {YearBranch}
              </option>
            ))}
          </select>

          <InputField
            label="Poll Question"
            name="question"
            value={pollData.question}
            onChange={handleInputChange}
            placeholder="Enter your poll question"
          />
          {pollData.options.map((option, index) => (
            <OptionField
              key={index}
              index={index}
              value={option}
              onChange={handleInputChange}
            />
          ))}
          <button onClick={handleCreatePoll} className="submit-button">
            Create Poll
          </button>
        </div>
      </div>
      <div className="polls-container">
        <h3 className="polls-title">Active Polls</h3>
        {polls.length === 0 ? (
          <p className="no-polls">No polls available.</p>
        ) : (
          polls.map((poll) => (
            <div key={poll.id} className="poll-item">
              <h4 className="poll-question">{poll.question}</h4>
              <div className="poll-options">
                {poll.options.map((option, index) => (
                  <div key={index} className="option-item">
                    <span>
                      {option.text} ({option.votes} votes)
                    </span>
                    <button
                      onClick={() => handleVote(poll.id, index)}
                      className="vote-button"
                    >
                      Vote
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Professorpolls;
