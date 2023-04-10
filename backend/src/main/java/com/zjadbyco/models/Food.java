package com.zjadbyco.models;

public record Food(String id, String name, float quantity, String unit, String date) {
    public Food(String id, String name, float quantity, String unit) {
        this(id, name, quantity, unit, null);
    }
}
