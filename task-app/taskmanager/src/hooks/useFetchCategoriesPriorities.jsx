import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchCategoriesPriorities = () => {
  const [categories, setCategories] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseCategories = await api.get('/categories');
        const responsePriorities = await api.get('/priorities');
        setCategories(responseCategories.data);
        setPriorities(responsePriorities.data);
      } catch (e) {
        setError(e);
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { categories, priorities, loading, error };
};
