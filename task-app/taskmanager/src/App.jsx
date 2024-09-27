import TaskForm from './components/TaskForm'
import Home from './components/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/createTask' element={<TaskForm/>}></Route>
      </Routes>
    </Router>
    
    </>
  )
}

export default App
