import React, { useState } from 'react';
import './Polls.css';

const Polls = () => {
  const initialoptions =[ { id: 1, text: 'Option A'},
    { id: 2, text: 'Option B'}];
  const [options, setOptions] = useState(
   initialoptions.map(options => ({ ...options, votes: 0 }))
  );

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
    <main  style={{
        marginLeft: window.innerWidth<768? "3rem" : "11.5rem",
        }}>
    <div className="poll-container"
     >
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
          {options.map(option => {
            const percentage = totalVotes ? ((option.votes / totalVotes) * 100).toFixed(1) : 0;
            return (
              <div key={option.id} className="poll-result">
                <div className="poll-result-header">
                  <span>{option.text}</span>
                  <span>{percentage}% ({option.votes} votes)</span>
                </div>
                <div className="poll-bar-container">
                  <div
                    className="poll-bar"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
         
        </>
      )}
    </div></main>
  );
};

export default Polls;
