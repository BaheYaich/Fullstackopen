const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ course }) => {
  const total = course.parts.reduce((sum, parts) => sum + parts.exercises, 0)
  return (
    <p><strong>Number of exercises {total}</strong></p>
  )
}

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(parts => <Part key={parts.id} part={parts} />)}
  </>

const Course = ({course}) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} /> 
      <Total course={course} />
    </>
  )
}

export default Course