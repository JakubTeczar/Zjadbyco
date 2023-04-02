package com.zjadbyco.models;

public class Product {
    private String name;
    private int quantity;
    private String unit;

    public Product(String name, int quantity, String unit) {
        this.name = name;
        this.quantity = quantity;
        this.unit = unit;
    }

    public String getName() {
        return name;
    }

    public int getQuantity() {
        return quantity;
    }

    public String getUnit() {
        return unit;
    }

    @Override
    public String toString() {
        return name + ", " + quantity + unit;
    }
}