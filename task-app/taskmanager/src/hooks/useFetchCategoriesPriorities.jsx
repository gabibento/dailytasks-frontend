import { useState, useEffect } from 'react';
import api from '../services/api';

export const useFetchCategoriesPriorities = () => {
  const [categories, setCategories] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
