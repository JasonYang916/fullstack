import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = (props) => {
  return(
    <form onSubmit={props.func}>
      <div>
        filter shown with:
        <input
          value={props.filter}
          onChange={props.handler}
        />
      </div>
    </form>
  )
}

const PersonForm = (props) => {
  return(
    <form onSubmit={props.func}>
    <div>
      name: 
      <input 
        value={props.name}
        onChange={props.nameHandler}
      /> <br/>  
      number:
      <input
        value={props.number}
        onChange={props.numberHandler}
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const Persons = ({persons}) => {
  return (
    persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleNameChange = (event) => {setNewName(event.target.value)}
  const handleNumberChange = (event) => {setNewNumber(event.target.value)}
  const handleFilterChange = (event) => {setFilterName(event.target.value)}

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.filter(person => person.name===newName).length === 1){
      alert(`${newName} is already added to phonebook`)
    }
    else{
      const personObject = {
        name: newName, 
        number: newNumber,
        id: persons.length + 1,
      }
      setPersons(persons.concat(personObject))
    }
    setNewName('')
    setNewNumber('')
  }

  const show = (event) => {
    event.preventDefault()
    setShowAll(false)
  }

  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2> 
      <Filter func={show} filter={filterName} handler={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm func={addPerson} name={newName} nameHandler={handleNameChange} number={newNumber} numberHandler={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons persons={personsToShow}/>
    </div>
  )
}

export default App