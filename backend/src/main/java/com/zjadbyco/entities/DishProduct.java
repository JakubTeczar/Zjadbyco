package com.zjadbyco.entities;

import com.zjadbyco.entities.ids.DishProductId;
import jakarta.persistence.*;

@Entity
@Table(name = "dish_product")
public class DishProduct {
    @EmbeddedId
    private DishProductId dishProductId = new DishProductId();

    @ManyToOne
    @MapsId("dishId")
    @JoinColumn(name = "dish_id")
    private Dish dish;

    @ManyToOne
    @MapsId("productId")
    @JoinColumn(name = "product_id")
    private Product product;

    private float quantity;

    public DishProductId getDishProductId() {
        return dishProductId;
    }

    public void setDishProductId(DishProductId dishProductId) {
        this.dishProductId = dishProductId;
    }

    public Dish getDish() {
        return dish;
    }

    public void setDish(Dish dish) {
        this.dish = dish;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public float getQuantity() {
        return quantity;
    }

    public void setQuantity(float quantity) {
        this.quantity = quantity;
    }
}