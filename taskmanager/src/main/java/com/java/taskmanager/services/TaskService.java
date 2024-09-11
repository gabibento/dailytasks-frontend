package com.java.taskmanager.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.java.taskmanager.dtos.TaskDTO;
import com.java.taskmanager.entities.Task;
import com.java.taskmanager.repositories.TaskRepository;

@Service
public class TaskService {
	
	@Autowired
	private TaskRepository repository;
	
	@Transactional
	public TaskDTO insert(Task task) {
		Task entity = repository.save(task);
		TaskDTO dto = new TaskDTO(entity);
		return dto;
	}
	@Transactional(readOnly = true)
	public List<TaskDTO> findAll(){
		List<Task> tasks = repository.findAll();
		List<TaskDTO> dtos = new ArrayList<>();
		tasks.forEach(task -> dtos.add(new TaskDTO(task)));
		return dtos;
	}
	@Transactional(readOnly = true)
	public TaskDTO findById(Long id) {
		Task entity = repository.findById(id).get();
		TaskDTO dto = new TaskDTO(entity);
		return dto;
	}

}
