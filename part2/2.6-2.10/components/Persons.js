const Person = ({person}) => {
  return (
    <>
      {person.name} {person.number}<br />
    </>
  )
}

const Persons = ({personsToShow}) => {
  return (
    <p>
    {personsToShow.map(person => <Person key={person.name} person={person} />)}
    </p>
  )
}

export default Persons