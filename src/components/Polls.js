import React, { useState } from 'react';
import './Polls.css'; // Import the CSS file

const Polls = () => {
  const [options, setOptions] = useState([
    { id: 1, text: 'Option A', votes: 0 },
    { id: 2, text: 'Option B', votes: 0 },
    { id: 3, text: 'Option C', votes: 0 },
    { id: 4, text: 'Option D', votes: 0 },
  ]);

  const [selectedOption, setSelectedOption] = useState(null);
  const [voted, setVoted] = useState(false);

  const handleVote = () => {
    if (selectedOption === null) return;

    const updatedOptions = options.map(option =>
      option.id === selectedOption ? { ...option, votes: option.votes + 1 } : option
    );
    setOptions(updatedOptions);
    setVoted(true);
  };

  const totalVotes = options.reduce((sum, option) => sum + option.votes, 0);

  return (
    <div className="poll-container">
      <h2 className="poll-title">Vote for your favorite option!</h2>

      {!voted ? (
        <>
          {options.map(option => (
            <div key={option.id} className="poll-option">
              <label>
                <input
                  type="radio"
                  name="poll"
                  value={option.id}
                  onChange={() => setSelectedOption(option.id)}
                />
                {option.text}
              </label>
            </div>
          ))}
          <button onClick={handleVote} className="poll-button">Submit Vote</button>
        </>
      ) : (
        <>
          <h3 className="poll-results-title">Results:</h3>
          {options.map(option => (
            <div key={option.id} className="poll-result">
              <div className="poll-result-header">
                <span>{option.text}</span>
                <span>{option.votes} votes ({totalVotes ? ((option.votes / totalVotes) * 100).toFixed(1) : 0}%)</span>
              </div>
              <div className="poll-bar-container">
                <div
                  className="poll-bar"
                  style={{ width: `${totalVotes ? (option.votes / totalVotes) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
          ))}
          <button
            onClick={() => {
              setSelectedOption(null);
              setVoted(false);
            }}
            className="poll-button"
          >
            Vote Again
          </button>
        </>
      )}
    </div>
  );
};

export default Polls;
