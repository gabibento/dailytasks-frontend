package com.java.taskmanager.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.java.taskmanager.dtos.TaskDTO;
import com.java.taskmanager.entities.Category;
import com.java.taskmanager.entities.Task;
import com.java.taskmanager.repositories.CategoryRepository;
import com.java.taskmanager.repositories.TaskRepository;

@Service
public class TaskService {

	@Autowired
	private TaskRepository taskRepository;

	@Autowired
	private CategoryRepository categoryRepository;

	public TaskDTO update(Task task) {
		Task entity = taskRepository.save(task);
		return new TaskDTO(entity);
	}
	
	public TaskDTO insert(TaskDTO dto) {
        
        Task task = new Task();
        task.setTitle(dto.getTitle());
        task.setCompleted(dto.isCompleted());
       
        Optional<Category> categoryOpt = categoryRepository.findById(dto.getCategoryId());
        if (categoryOpt.isPresent()) {
            task.setCategory(categoryOpt.get());
        } else {
            throw new RuntimeException("Category not found");
        }

        task = taskRepository.save(task);
        
        return new TaskDTO(task);
    }



	@Transactional(readOnly = true)
	public List<TaskDTO> findAll() {
		List<Task> tasks = taskRepository.findAll();
		List<TaskDTO> dtos = new ArrayList<>();
		tasks.forEach(task -> dtos.add(new TaskDTO(task)));
		return dtos;
	}

	@Transactional(readOnly = true)
	public Optional<Task> findById(Long id) {
		return Optional.ofNullable(taskRepository.findById(id).get());

	}

	@Transactional
	public void deleteById(Long id) {
		taskRepository.deleteById(id);
	}

}
