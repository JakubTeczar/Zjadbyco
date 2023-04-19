package com.zjadbyco.entities;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "dish")
public class Dish extends Food {
    @OneToMany(mappedBy = "dish", cascade = CascadeType.ALL)
    private Set<DishProduct> dishProducts = new HashSet<>();

    public Set<DishProduct> getDishProducts() {
        return dishProducts;
    }

    public void setDishProducts(Set<DishProduct> dishProducts) {
        this.dishProducts = dishProducts;
    }
}
