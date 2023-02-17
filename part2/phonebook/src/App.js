import { useState } from 'react'

const Person = ({persons}) => <p>{persons.name}</p>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', }
  ]) 
  const [newName, setNewName] = useState('')
  const handleNewName = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
    }
    setPersons(persons.concat(person))
    setNewName("")
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleNewName}>
        <div>
          name: <input name="name" onChange={e => setNewName(e.target.value)} value={newName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(persons => <Person key={persons.name} persons={persons} />)}
    </div>
  )
}

export default App