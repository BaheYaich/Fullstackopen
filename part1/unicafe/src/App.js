import { useState } from 'react'

const Statistics = ({good, neutral, bad, all, average, positivePercentage}) => {
  if (all !== 0) {
    return (
      <>
      <table>
        <tbody>
          <StatisticsLine text='Good' value={good} />
          <StatisticsLine text='Neutral' value={neutral} />
          <StatisticsLine text='Bad' value={bad} />
          <StatisticsLine text='All' value={all} />
          <StatisticsLine text='Average' value={average} />
          <StatisticsLine text='Positive percentage' value={positivePercentage}/>
        </tbody>
      </table>
      </>
    )
  } 
  return (<p>No feedback given</p>)
}

const Button = ({handleReference, text}) => {
  return (
    <button onClick={ handleReference }>{ text }</button>
  )
}

const StatisticsLine = ({text, value}) => {
  return (
    <tr>
      <td>{ text }</td>
      <td>{ value }</td>
    </tr>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad
  const average = all === 0 ? 0 : (good - bad) / all
  const positivePercentage = all === 0 ? 0 : (good / all) * 100 + ' %'

  const handleGood = () => {setGood(good + 1)}
  const handleNeutral = () => {setNeutral(neutral + 1)}
  const handleBad = () => {setBad(bad + 1)}

  return (
    <div>
      <h2>Give feedback</h2>
      <Button handleReference={handleGood} text='Good' />
      <Button handleReference={handleNeutral} text='Neutral' />
      <Button handleReference={handleBad} text='Bad' />
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positivePercentage={positivePercentage} />
    </div>
  )
}

export default App