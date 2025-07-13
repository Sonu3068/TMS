  import React, { useState, useEffect } from 'react';
  import './Pollsresult.css';

export default function Pollsresult({ pollId }) {

 
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    async function fetchResults() {
      try {
        const res = await fetch(`/api/polls/${pollId}/results`);
        const data = await res.json();
        setOptions(data.options);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchResults();
  }, [pollId]);

  const totalVotes = options.reduce((sum, o) => sum + o.votes, 0);

  if (loading) return <div className="loading">Loading results...</div>;

  return (
    <div className="admin-container">
      <h2 className="admin-title">Poll Results (Admin View)</h2>

      {options.length === 0
        ? <p>No results available.</p>
        : options.map(opt => {
            const pct = totalVotes ? ((opt.votes / totalVotes) * 100).toFixed(1) : 0;
            return (
              <div key={opt.id} className="admin-result">
                <div className="admin-header">
                  <span className="opt-text">{opt.text}</span>
                  <span className="opt-stats">{opt.votes} votes — {pct}%</span>
                </div>
                <div className="bar-container">
                  <div className="bar" style={{ width: `${pct}%` }}></div>
                </div>
              </div>
            );
          })}
    </div>
  );
};

