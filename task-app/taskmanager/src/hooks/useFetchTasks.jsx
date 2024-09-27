import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchTasks = () => {
    const [tasks, setTasks] = useState([]); 
    const [allTasks, setAllTasks] = useState([])
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
  
    useEffect(() => {
    
        const fetchTasks = async () => {
          try {
            const response = await axios.get("http://localhost:8080/tasks");
            setTasks(response.data);
            setAllTasks(response.data)
            setLoading(false); 
          } catch (error) {
            setError(error.message);
            setLoading(false);
          }
        };
    
        fetchTasks(); 
      }, []); 

  return {tasks, setTasks, allTasks, loading, error}
}
