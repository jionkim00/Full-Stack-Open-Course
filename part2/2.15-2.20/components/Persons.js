const Person = ({person, deletePerson}) => {
  return (
    <>
      {person.name} {person.number}
      <button onClick={() => deletePerson(person.id)}>Delete</button>
      <br />
    </>
  )
}

const Persons = ({personsToShow, deletePerson}) => {
  return (
    <p>
    {personsToShow.map(person => <Person key={person.name} person={person} deletePerson={deletePerson} />)}
    </p>
  )
}

export default Persons