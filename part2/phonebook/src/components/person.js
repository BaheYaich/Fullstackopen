const Person = ({persons, handleDeleteContact}) => 
{
    return (
    <>
        <p>{persons.name} {persons.number}</p>
        <button type="submit" onClick={() => handleDeleteContact(persons.name, persons.id)}>Delete</button>
    </>
    )
}

export default Person