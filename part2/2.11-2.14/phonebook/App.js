import { useState, useEffect } from 'react'
import axios from 'axios'

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const personsToShow = (filter==='')
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  const hook = (() => {
    axios
      .get('http://localhost:3001/db')
      .then(response => {
        console.log(response.data)
        setPersons(response.data.persons)
  })
  })

  useEffect(hook, [])

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
      setPersons(persons.concat(personObject))
    }

    setNewName('')
    setNewNumber('')
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
      <div>
      <Filter filter={filter} handleFilter={handleFilter} />
      </div>
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNewName={handleNewName} newNumber={newNumber} handleNewNumber={handleNewNumber} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow}/>
    </div>
  )
}

export default App