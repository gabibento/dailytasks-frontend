import { useState, useEffect } from 'react';
import api from '../services/api';

export const useFetchTasks = () => {
    const [tasks, setTasks] = useState([]); 
    const [allTasks, setAllTasks] = useState([])
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
  
    useEffect(() => {
    
        const fetchTasks = async () => {
          try {
            const response = await api.get("/tasks");
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

  return {tasks, setTasks, setAllTasks, allTasks, loading, error}
}
