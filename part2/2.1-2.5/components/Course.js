const Content = ({parts}) => {
  return (
  parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)
  )
}

const Exercises = ({parts}) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <strong>total of {total} exercises</strong>
  )
}

const Course = ({course}) => {
  return (
    <>
      <h1>{course.name}</h1>
      <Content parts={course.parts}/>
      <Exercises parts={course.parts} />
    </>
  )
}

export default Course