import { useState } from 'react'

const Display = props => <h1>{props.value}</h1>

const Statistics = (props) => { 
  if (props.good===0 && props.neutral===0 && props.bad===0){
    return (
      <div>No feedback given</div>
    )
  }
  return(
    <div>
      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
      <p>all {props.good + props.neutral + props.bad}</p>
      <p>average {(props.good-props.bad)/(props.good+props.neutral+props.bad)}</p>
      <p>positive {(props.good)/(props.good+props.neutral+props.bad) +' %'}</p>
    </div>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)

  const handleNeutral = () => setNeutral(neutral + 1)

  const handleBad = () => setBad(bad + 1)

  return (
    <div>
      <Display value='give feedback' />
      <Button handleClick={handleGood} text='good' />
      <Button handleClick={handleNeutral} text='neutral' />
      <Button handleClick={handleBad} text='bad' />
      <Display value='statistics' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App;