import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchCategoriesPriorities = () => {
  const [categories, setCategories] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseCategories = await axios.get('http://localhost:8080/categories');
        const responsePriorities = await axios.get('http://localhost:8080/priorities');
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
