import { useState } from 'react'

const Heading = ({ heading }) => <h1>{heading}</h1>

const Paragraph =  ({ text, votes }) => (
  <>
    <p>{text}</p>
    <p>has {votes} votes</p>
  </>
)

const MostVotedAnecdote = ({ anecdotes, votes }) => {
  const mostVotes = Math.max( ...votes )
  const mostVotedIndex = votes.indexOf(mostVotes)

  if (mostVotes === 0) {
    return (
      <>
        <p>no votes yet</p>
      </>
    )
  }

  return (
    <Paragraph text={anecdotes[mostVotedIndex]} votes={mostVotes} />
  )
}

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVoted] = useState(Array(anecdotes.length).fill(0))

  const setToSelected = () => {
    const random = Math.floor(Math.random() * anecdotes.length)
    setSelected(random)
  }

  const setToVoted = () => {
    votes[selected] += 1
    const updatedVotes = [...votes]
    setVoted(updatedVotes)
  }

  return (
    <div>
      <Heading heading='Anecdote of the day' />
      <Paragraph text={anecdotes[selected]} votes={votes[selected]} />
      <Button onClick={setToVoted} text='vote' />
      <Button onClick={setToSelected} text='next anecdote' />
      <Heading heading='Anecdote with most votes' />
      <MostVotedAnecdote anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

export default App