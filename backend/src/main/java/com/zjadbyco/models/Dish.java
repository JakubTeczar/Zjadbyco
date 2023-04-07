package com.zjadbyco.models;

public record Dish(String id, String name, String category, String unit, Integer calories_per_unit) {
    public Dish(String id, String name) {
        this(id, name, null, null, null);
    }
}
