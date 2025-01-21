import TaskForm from './components/tasks/TaskForm';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#ff8fa0",
      },
      secondary: {
        main: "#8C8C8C",
      },
    },
    typography: {
      fontFamily: 'Montserrat, sans-serif', 
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
          <Route path='/createTask' element={<TaskForm />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
