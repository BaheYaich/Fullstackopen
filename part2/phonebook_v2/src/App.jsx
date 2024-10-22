import { useEffect, useState } from 'react'
import Person from './components/person'
import PersonForm from './components/personForm'
import Filter from './components/search'
import personService from './services/persons'
import Notification from './components/notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('success')

  useEffect(() => {
    personService
    .getAll()
    .then(response => { setPersons(response) })
  }, []);

  const filteredContacts = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
  // const existingPerson = persons.find(person => person.name === newName)

  const handleNotification = (message, type) => {
    setMessageType(type)
    setMessage(message)
    setTimeout(() => {          
      setMessage(null)        
    }, 5000)  
  }

  // const handleNewPerson = (event) => {
  //   event.preventDefault()
  //   if (existingPerson) {
  //     if (!window.confirm(`${newName} already exists in the phonebook, replace the old number with the new one?`)) return
  //     else {
  //       const updatedPerson = { ...existingPerson, number: newNumber }
  //       personService
  //       .update(existingPerson.id, updatedPerson)
  //       .then(() => {
  //         personService
  //           .getAll()
  //           .then(response => { 
  //             setPersons(response)
  //             handleNotification(`'${existingPerson.name}' was updated`, 'success') 
  //           })
  //       })
  //     }
  //   }
  //   else {
  //     const personObject = {
  //       name: newName,
  //       number: newNumber
  //     }
  //     personService
  //       .create(personObject)
  //       .then(response => {
  //         setPersons(persons.concat(response))
  //         handleNotification(`'${newName}' was added`, 'success') 
  //         setNewName('')
  //         setNewNumber('')     
  //       })
  //     }
  // }

  const handleOnDelete = (name, id) => {
    if (!window.confirm(`${name} is about to be deleted`)) return
    personService
      .delete(id)
      .then(() => {
        personService
          .getAll()
          .then(response => { 
            setPersons(response) 
            handleNotification(`'${name}' was deleted`, 'error') 
          })
      })
      .catch(error => {      
        handleNotification(`'${name}' was already deleted from server`, 'error')       
        setPersons(persons.filter(person => person.id !== id))    
      })
  }

  const handleAddOrUpdatePerson = (event) => {
    event.preventDefault()

    const existingPerson = persons.find(person => person.name === newName)

    const personObject = {
        name: newName,
        number: newNumber
    }

    if (existingPerson) {
        // If the person already exists, confirm with the user to update
        const confirmUpdate = window.confirm(`${newName} is already in the phonebook. Replace the old number with the new one?`)

        if (confirmUpdate) {
            // Send PUT request to update the contact
            personService
                .update(existingPerson.id, personObject)
                .then(updatedPerson => {
                    setPersons(persons.map(person => person.id !== existingPerson.id ? person : updatedPerson))
                    setNewName('')
                    setNewNumber('')
                    handleNotification({ message: `Updated ${newName}'s number`, type: 'success' })
                })
                .catch(error => {
                    handleNotification({ message: `Error updating ${newName}'s contact`, type: 'error' })
                })
        }
    } else {
        // Send POST request to add the new contact
        personService
            .create(personObject)
            .then(returnedPerson => {
                setPersons(persons.concat(returnedPerson))
                setNewName('')
                setNewNumber('')
                handleNotification({ message: `Added ${newName}`, type: 'success' })
            })
            .catch(error => {
                handleNotification({ message: `Error adding ${newName}`, type: 'error' })
            })
    }
}

  return (
    <>
      <h2>Phonebook</h2>
      <Notification message={message} type={messageType} />
      <Filter setSearch={setSearch} search={search} />
      <h3>Add new contact</h3>
      <PersonForm functionReference={handleAddOrUpdatePerson} setNewName={setNewName} newName={newName} setNewNumber={setNewNumber} newNumber={newNumber} />
      <h3>Numbers</h3>
      <ul className='contacts'>{filteredContacts.map(persons => <Person key={persons.id} persons={persons} handleDeleteContact={handleOnDelete} />)}</ul>
    </>
  )
}

export default App