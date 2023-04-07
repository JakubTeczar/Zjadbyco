package com.zjadbyco.models;

public record Product(String id, String name, String category, String unit, Float calories_per_unit) {
    public Product(String id, String name, String unit, float calories_per_unit) {
        this(id, name, null, unit, calories_per_unit);
    }
}