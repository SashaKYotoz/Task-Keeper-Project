package net.sashakyotoz.todotask_project.controller;

import net.sashakyotoz.todotask_project.entity.Task;
import net.sashakyotoz.todotask_project.exceptions.ResourceNotFoundException;
import net.sashakyotoz.todotask_project.repository.TaskRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/todos")
public class TodoController {
    private final TaskRepository taskRepository;
    public TodoController(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @GetMapping
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return taskRepository.save(task);
    }
    @GetMapping("/{id}")
    public Task getTask(@PathVariable Long id){
        return taskRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Task", "id", id));
    }
    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task taskUpdated) {
        Task task = taskRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Task", "id", id));
        if (taskUpdated.getTask() != null) task.setTask(taskUpdated.getTask());
        task.setComplete(taskUpdated.isComplete());
        return taskRepository.save(task);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Long id) {
        Task task = taskRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Task", "id", id));
        taskRepository.delete(task);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/completed")
    public List<Task> getCompleteTasks() {
        return taskRepository.findByComplete(true);
    }

    @GetMapping("/uncompleted")
    public List<Task> getUnCompleteTasks() {
        return taskRepository.findByComplete(false);
    }
}
