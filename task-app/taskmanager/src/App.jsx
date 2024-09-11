import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TaskForm from './TaskForm'
import TaskList from './TaskList'

function App() {

  return (
    <>
      <TaskForm></TaskForm>
      <TaskList></TaskList>
    </>
  )
}

export default App
