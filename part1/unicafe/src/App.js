import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(6)
  const [neutral, setNeutral] = useState(2)
  const [bad, setBad] = useState(1)

  return (
    <div>
      <h2>Give feedback</h2>
      <button onClick={setGood}>Good</button>
      <button onClick={setNeutral}>Neutral</button>
      <button onClick={setBad}>Bad</button>
      <h2>Statistics</h2>
      <p>Good : { good }</p>
      <p>Neutral : { neutral }</p>
      <p>Bad : { bad }</p>
    </div>
  )
}

export default App