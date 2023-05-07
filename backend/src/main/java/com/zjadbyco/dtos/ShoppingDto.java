package com.zjadbyco.dtos;

public class ShoppingDto {
    private FoodDto food;
    private float quantity;

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
}
