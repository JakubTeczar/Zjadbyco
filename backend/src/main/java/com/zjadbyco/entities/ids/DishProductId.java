package com.zjadbyco.entities.ids;

import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class DishProductId implements Serializable {
    private long dishId;
    private long productId;

    public long getDishId() {
        return dishId;
    }

    public void setDishId(long dishId) {
        this.dishId = dishId;
    }

    public long getProductId() {
        return productId;
    }

    public void setProductId(long productId) {
        this.productId = productId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof DishProductId that)) return false;
        return dishId == that.dishId && productId == that.productId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(dishId, productId);
    }
}