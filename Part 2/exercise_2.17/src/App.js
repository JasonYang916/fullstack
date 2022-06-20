import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPeople => {
        setPersons(initialPeople)
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
      }
      personService
        .create(personObject)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (id) => {
    const personToDelete = persons.find(person => person.id === id)
    if(window.confirm(`Delete ${personToDelete.name} ?`)){
      personService
        .del(id)
        .then(setPersons(persons.filter(person => person.id !== id)))
    }
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
      {personsToShow.map(person => <Persons key={person.name} func={() => deletePerson(person.id)} person={person}/>)}
    </div>
  )
}

export default App