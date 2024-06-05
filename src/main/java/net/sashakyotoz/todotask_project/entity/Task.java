package net.sashakyotoz.todotask_project.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "task")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String date = LocalDateTime.now().format(DateTimeFormatter.ofPattern("EEEE(dd) LLLL, yyyy HH:mm:ss"));
    private String task;
    private boolean complete;
}
