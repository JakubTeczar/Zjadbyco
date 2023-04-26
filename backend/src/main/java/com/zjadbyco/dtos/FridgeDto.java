package com.zjadbyco.dtos;

import java.time.LocalDate;

public class FridgeDto {
    private long id;
    private FoodDto food;
    private float quantity;
    private LocalDate expirationDate;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public FoodDto getFood() {
        return food;
    }

    public void setFood(FoodDto food) {
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
