import { useState, useEffect } from 'react'

import personsService from './services/persons'

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const personsToShow = (filter==='') ? persons : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  const [notification, setNotification] = useState(null)

  const getAllhook = (() => {
    personsService
      .getAll()
      .then(response => {
        setPersons(response)
  })
  })

  useEffect(getAllhook, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    };

    const checkPerson = persons.find(person => 
      person.name.toLowerCase() === personObject.name.toLowerCase())

    if (checkPerson) {
      alert(newName + ' is already added to phonebook')
    }
    else{
      personsService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response))
      })
      setNotification(`${personObject.name} added to the phonebook.`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }

    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (id) => {
    const person = persons.find(person => person.id === id)
    const confirmDelete = window.confirm(`Are you sure you want to delete ${person.name}?`)
    
    if (confirmDelete) {
      personsService
        .deletePerson(id)
        .then(returnedPerson => {
          persons.map(person => person.id !== id ? person : returnedPerson)
        })
      setPersons(persons.filter(person => person.id !== id))
      alert(`${person.name} was deleted from the phonebook.`)
    }

  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <div>
      <Filter filter={filter} handleFilter={handleFilter} />
      </div>
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNewName={handleNewName} newNumber={newNumber} handleNewNumber={handleNewNumber} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App