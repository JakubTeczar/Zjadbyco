package com.zjadbyco.entities;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "fridge")
public class Fridge {
    @Id
    @Column(name = "id", nullable = false, unique = true)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "fridge_gen")
    @SequenceGenerator(name = "fridge_gen", sequenceName = "fridge_seq", allocationSize = 1)
    private long id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "food_id", nullable = false)
    private Food food;

    @Column(name = "quantity", nullable = false)
    private float quantity;

    @Column(name = "expiration_date", nullable = false)
    private LocalDate expirationDate;

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

    public LocalDate getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(LocalDate expirationDate) {
        this.expirationDate = expirationDate;
    }
}
