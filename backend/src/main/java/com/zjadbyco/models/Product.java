package com.zjadbyco.models;

public record Product(String id, String name, String category, String unit, Integer calories_per_unit) {
    public Product(String id, String name) {
        this(id, name, null, null, null);
    }
}