import { useEffect, useState } from 'react'
import Person from './components/person'
import PersonForm from './components/personForm'
import Filter from './components/search'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    personService
    .getAll()
    .then(response => { setPersons(response) })
  }, []);

  const filteredContacts = persons.filter(person =>
    person.name.toLowerCase().includes(search.toLowerCase())
  )

  const existingPerson = persons.find(person => person.name === newName)

  const handleNewPerson = (event) => {
    event.preventDefault()
    if (existingPerson) {
      if (!window.confirm(`${newName} already exists in the phonebook, replace the old number with the new one?`)) return
      else {
        const updatedPerson = { ...existingPerson, number: newNumber }
        personService
        .update(existingPerson.id, updatedPerson)
        .then(() => {
          personService
            .getAll()
            .then(response => { setPersons(response) })
        })
      }
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response))
          setNewName('')
          setNewNumber('')
        })
      }
  }

  const handleOnDelete = (name, id) => {
    if (!window.confirm(`${name} is about to be deleted`)) return
    personService
      .delete(id)
      .then(() => {
        personService
          .getAll()
          .then(response => { setPersons(response) })
      })
  }

  return (
    <>
      <h2>Phonebook</h2>
      <Filter setSearch={setSearch} search={search} />
      <h3>Add new contact</h3>
      <PersonForm functionReference={handleNewPerson} setNewName={setNewName} newName={newName} setNewNumber={setNewNumber} newNumber={newNumber} />
      <h3>Numbers</h3>
      {filteredContacts.map(persons => <Person key={persons.id} persons={persons} handleDeleteContact={handleOnDelete} />)}
    </>
  )
}

export default App