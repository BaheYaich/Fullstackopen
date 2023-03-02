const PersonForm = ({functionReference, setNewName, newName, setNewNumber, newNumber}) => {
  return (
    <form onSubmit={functionReference}>
        <div>
          name: <input name="name" onChange={e => setNewName(e.target.value)} value={newName} />
        </div>
        <div>number: <input name="number" onChange={e => setNewNumber(e.target.value)} value={newNumber}/></div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
  )
}

export default PersonForm