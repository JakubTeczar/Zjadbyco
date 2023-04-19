package com.zjadbyco.entities;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "calendar")
public class Calendar {
    @Id
    @Column(name = "id", unique = true, nullable = false)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "calendar_gen")
    @SequenceGenerator(name = "calendar_gen", sequenceName = "calendar_seq", allocationSize = 1)
    private long id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "food_id", nullable = false)
    private Food food;

    @Column(name = "quantity", nullable = false)
    private float quantity;

    @Column(name = "date", nullable = false)
    private LocalDate date;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Food getFood() {
        return food;
    }

    public void setFood(Food food) {
        this.food = food;
    }

    public float getQuantity() {
        return quantity;
    }

    public void setQuantity(float quantity) {
        this.quantity = quantity;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}
