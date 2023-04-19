package com.zjadbyco.entities;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "product")
public class Product extends Food {
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private Set<DishProduct> dishProducts = new HashSet<>();

    public Set<DishProduct> getDishProducts() {
        return dishProducts;
    }

    public void setDishProducts(Set<DishProduct> dishProducts) {
        this.dishProducts = dishProducts;
    }
}