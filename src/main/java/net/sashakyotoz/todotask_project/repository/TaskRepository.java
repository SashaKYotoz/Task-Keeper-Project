package net.sashakyotoz.todotask_project.repository;

import net.sashakyotoz.todotask_project.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import java.util.List;
@Component
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByComplete(boolean complete);
}
