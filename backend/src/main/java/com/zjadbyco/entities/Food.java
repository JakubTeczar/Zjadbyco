package com.zjadbyco.entities;

import com.zjadbyco.entities.enums.CategoryName;
import com.zjadbyco.entities.enums.CategoryNameConverter;
import jakarta.persistence.*;

@Entity
@Table(name = "food")
@Inheritance(strategy = InheritanceType.JOINED)
public class Food {
    @Id
    @Column(name = "id", nullable = false, unique = true)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "food_gen")
    @SequenceGenerator(name = "food_gen", sequenceName = "food_seq", allocationSize = 1)
    private long id;

    @Column(name = "name", nullable = false, length = 120)
    private String name;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "category_id", nullable = false)
    @Convert(converter = CategoryNameConverter.class)
    private Category category;

    @Column(name = "unit", nullable = false, length = 5)
    private String unit;

    @Column(name = "calories_per_unit", nullable = false)
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

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
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
