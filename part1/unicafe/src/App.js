import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const all = good + neutral + bad
  const average = (good - bad) / all
  const positivePercentage = (good / all) * 100

  const handleGood = () => {setGood(good + 1)}
  const handleNeutral = () => {setNeutral(neutral + 1)}
  const handleBad = () => {setBad(bad + 1)}

  return (
    <div>
      <h2>Give feedback</h2>
      <button onClick={handleGood}>Good</button>
      <button onClick={handleNeutral}>Neutral</button>
      <button onClick={handleBad}>Bad</button>
      <h2>Statistics</h2>
      <p>Good : { good }</p>
      <p>Neutral : { neutral }</p>
      <p>Bad : { bad }</p>
      <p>All: { all }</p>
      <p>Average : { average }</p>
      <p>Positive : { positivePercentage } %</p>
    </div>
  )
}

export default App