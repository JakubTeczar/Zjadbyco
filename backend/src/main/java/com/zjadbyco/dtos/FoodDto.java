package com.zjadbyco.dtos;

public class FoodDto {
    private Long id;
    private String name;
    private CategoryDto category;
    private String unit;
    private Float caloriesPerUnit;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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

    public Float getCaloriesPerUnit() {
        return caloriesPerUnit;
    }

    public void setCaloriesPerUnit(Float caloriesPerUnit) {
        this.caloriesPerUnit = caloriesPerUnit;
    }
}
