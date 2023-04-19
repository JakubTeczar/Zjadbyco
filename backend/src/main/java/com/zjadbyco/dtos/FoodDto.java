package com.zjadbyco.dtos;

import java.util.List;

public class FoodDto {
    private long id;
    private String name;
    private CategoryDto category;
    private String unit;
    private float caloriesPerUnit;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public CategoryDto getCategory() {
        return category;
    }

    public void setCategory(CategoryDto category) {
        this.category = category;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public float getCaloriesPerUnit() {
        return caloriesPerUnit;
    }

    public void setCaloriesPerUnit(float caloriesPerUnit) {
        this.caloriesPerUnit = caloriesPerUnit;
    }
}
