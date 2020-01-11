import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

type FormElem = React.FormEvent<HTMLFormElement>

interface ITodo {
  text: string
  complete: boolean
}

const StyledTodoList = styled.div`
  max-width: 400px;
  margin: 0 auto;
  font-family: sans-serif;

  h1 {
    text-align: center;
  }

  button {
      font-size: 1rem;
      border-radius: 0.2rem;
  }

  form {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;

    input {
      font-size: 1rem;
      flex-grow: 2;
      margin-right: 1rem;
      border-radius: 0.2rem;
      border: 1px solid lightgray;
    }
  }

  div {
    display: grid;
    grid-template-columns: 10fr 3fr 1fr;
    grid-gap: 2%;
    align-items: center;

    p {
      font-size: 1rem;
      margin: 0.5rem 0;
    }
  }
`

export default function App(): JSX.Element {
  const [value, setValue] = useState<string>('')
  const [todos, setTodos] = useState<ITodo[]>([])

  const handleSubmit = (e: FormElem): void => {
    e.preventDefault()
    addTodo(value)
    setValue('')
  }

  const completeTodo = (index: number): void => {
    const newTodos: ITodo[] = [...todos]
    newTodos[index].complete = !newTodos[index].complete
    setTodos(newTodos)
  }

  const removeTodo = (index: number): void => {
    const newTodos: ITodo[] = [...todos]
    newTodos.splice(index, 1)
    setTodos(newTodos)
  }

  const addTodo = (text: string): void => {
    const newTodos: ITodo[] = [...todos, { text, complete: false }]
    setTodos(newTodos)
  }
  return (
    <StyledTodoList>
      <h1>ToDo List</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={value} onChange={e => { setValue(e.target.value) }} required />
        <button type="submit">Add Todo</button>
      </form>
      <section>
        {todos.map((todo: ITodo, index: number) =>
          <div key={index}>
            <p style={{ textDecoration: todo.complete ? 'line-through' : 'none' }}>{todo.text}</p>
            <button type="button" onClick={() => { completeTodo(index) }}>{todo.complete ? 'Undo' : 'Do'}</button>
            <button type="button" onClick={() => { removeTodo(index) }}>X</button>
          </div>
        )}
      </section>
    </StyledTodoList>
  )
}


const root = document.getElementById('app-root')
ReactDOM.render(<App />, root)