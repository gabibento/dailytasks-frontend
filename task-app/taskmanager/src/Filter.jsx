import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({tasks, setTasks, allTasks}) => {
    const [categories, setCategories] = useState([])
    const [priorities, setPriorities] = useState([])
    const [filters, setFilters] = useState({
        category: '',
        priority: '',
      });

    useEffect(() => {
        const fetchCategories = async () => {
            try{
                const response = await axios.get('http://localhost:8080/categories')
                const responsePriority = await axios.get('http://localhost:8080/priorities')
                setCategories(response.data)
                setPriorities(responsePriority.data)
            }catch (e) {
                console.error(e)
            }
        }
        fetchCategories()
      }, [])

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
          ...prevFilters,
          [name]: value,
        }));
      };
    
      useEffect(() => {
        const filteredTasks = allTasks.filter((task) => {
          const matchesPriority =
            filters.priority === '' || task.priorityName.toLowerCase() === filters.priority.toLowerCase()
          const matchesCategory =
            filters.category === '' || task.categoryName.toLowerCase() === filters.category.toLowerCase()
          return matchesPriority && matchesCategory
        });
        setTasks(filteredTasks)
      }, [filters, allTasks, setTasks])

  return (
    <div>
        <select name="priority" onChange={handleChange}>
            <option value="">Priority</option>
            {priorities.map((priority) => (
                    <option key={priority.id} value={priority.name}>{priority.name}</option>
                ))}
        </select>

        <select name='category' onChange={handleChange}>
                <option value="">Select a category</option>

                {categories.map((category) => (
                    <option key={category.id} value={category.name}>{category.name}</option>
                ))}
               </select>
    </div>
  )
}

export default Filter