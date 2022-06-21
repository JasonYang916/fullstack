import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notifcation from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [message, setMessage] = useState(null)

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
    const filteredPerson = persons.find(person => person.name===newName)
    if (filteredPerson !== undefined){
      if(window.confirm(`${filteredPerson.name} is already added added to the phonebook, replace the old number with a new one?`)){
        const personObject = {...filteredPerson, number: newNumber}
        personService
          .update(filteredPerson.id, personObject)
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id !== updatedPerson.id ? person : updatedPerson))
            setMessage(`Changed ${filteredPerson.name}'s number`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch(error => {
            alert(
              `'${filteredPerson.name}' was already deleted from server`
            )
            setPersons(persons.filter(p => p.id !== filteredPerson.id))
          })
      }
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
          setMessage(`Added ${newPerson.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
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
      <Notifcation message={message} />
      <Filter func={show} filter={filterName} handler={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm func={addPerson} name={newName} nameHandler={handleNameChange} number={newNumber} numberHandler={handleNumberChange}/>
      <h2>Numbers</h2>
      {personsToShow.map(person => <Persons key={person.name} func={() => deletePerson(person.id)} person={person}/>)}
    </div>
  )
}

export default App