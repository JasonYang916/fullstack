import { useState } from 'react'

const Display = props => <div>{props.value}</div>

// This is the right place to define a component
const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  const [value, setValue] = useState(10)

  const setToValue = (newValue) => () => {
    console.log('value now', newValue)  // print the new value to console
    setValue(newValue)
  }

  return (
    <div>
      <Display value={value} />
      <button onClick={setToValue(1000)}>thousand</button>
      <button onClick={setToValue(0)}>reset</button>
      <button onClick={setToValue(value + 1)}>increment</button>
    </div>
  )
}

export default App;