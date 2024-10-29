import TaskForm from './components/tasks/TaskForm';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#ff8fa0",
      },
      secondary: {
        main: "#8C8C8C"
      }
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/createTask' element={<TaskForm />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
