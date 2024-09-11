package com.java.taskmanager.dtos;

import com.java.taskmanager.entities.Task;

public class TaskDTO {
	private Long id;
	private String title;
	private boolean completed;
	private Long categoryId;
	
	public TaskDTO() {

	}
	
	public TaskDTO(Long id, String title, boolean completed, Long categoryId) {
		this.id = id;
		this.title = title;
		this.completed = completed;
		this.categoryId = categoryId;
	}

	public TaskDTO(Task task) {
		id = task.getId();
		title = task.getTitle();
		completed = task.isCompleted();
		categoryId = task.getCategory().getId();
	}
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public boolean isCompleted() {
		return completed;
	}
	public void setCompleted(boolean completed) {
		this.completed = completed;
	}

	public Long getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(Long categoryId) {
		this.categoryId = categoryId;
	}
	
	
}
