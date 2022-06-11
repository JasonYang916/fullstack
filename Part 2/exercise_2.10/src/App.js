import { useState } from 'react'

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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [showAll, setShowAll] = useState(true)

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
    setShowAll(!showAll)
  }

  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase() === filterName.toLowerCase())

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