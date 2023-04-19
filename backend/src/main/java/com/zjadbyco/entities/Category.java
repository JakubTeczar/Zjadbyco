package com.zjadbyco.entities;

import com.zjadbyco.entities.enums.CategoryName;
import com.zjadbyco.entities.enums.CategoryNameConverter;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "category")
public class Category {
    @Id
    @Column(name = "id", nullable = false, unique = true)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "category_gen")
    @SequenceGenerator(name = "category_gen", sequenceName = "category_seq", allocationSize = 1)
    private long id;

    @Column(name = "name", nullable = false, length = 50, unique = true)
    @Convert(converter = CategoryNameConverter.class)
    private CategoryName name;

    @OneToMany(mappedBy = "category")
    private List<Food> foods;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public CategoryName getName() {
        return name;
    }

    public void setName(CategoryName name) {
        this.name = name;
    }
}
