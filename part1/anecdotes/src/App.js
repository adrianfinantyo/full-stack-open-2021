import React, { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(
    Array.from(Array(anecdotes.length), () => 0)
  );
  const handleNextAnecdote = () => {
    setSelected(selected + 1);
  };

  const handleVoteAnecdote = () => {
    const tempVotes = [...votes];
    tempVotes[selected]++;
    setVotes(tempVotes);
  };

  const getMaxVotesAndIndex = v => {
    let maxVotes = 0;
    let maxVotesIndex = 0;
    for (let i = 0; i < v.length; i++) {
      if (v[i] > maxVotes) {
        maxVotes = v[i];
        maxVotesIndex = i;
      }
    }
    return [maxVotes, maxVotesIndex];
  };

  const [maxVotes, maxVotesIndex] = getMaxVotesAndIndex(votes);

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <button onClick={handleVoteAnecdote}>vote</button>
      <button onClick={handleNextAnecdote}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[maxVotesIndex]}</p>
      <p>has {maxVotes} votes</p>
    </div>
  );
};

export default App