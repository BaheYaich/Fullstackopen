const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p><b>Number of exercises {sum}</b></p>

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
    </>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  const total = course.parts.reduce((sum, parts) => sum + parts.exercises, 0)

  return (
    <div>
      <Course course={course} />
      <Total sum={total} />
    </div>
  )
}

export default App