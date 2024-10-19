const PersonForm = ({functionReference, setNewName, newName, setNewNumber, newNumber}) => {
  return (
    <form onSubmit={functionReference}>
        <label>name:</label><input name="name" onChange={e => setNewName(e.target.value)} value={newName} />
        <label>number:</label><input name="number" onChange={e => setNewNumber(e.target.value)} value={newNumber}/>
        <button type="submit">add</button>
    </form>
  )
}

export default PersonForm