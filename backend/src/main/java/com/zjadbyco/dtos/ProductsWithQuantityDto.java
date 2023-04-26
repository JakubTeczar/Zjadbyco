package com.zjadbyco.dtos;

public class ProductsWithQuantityDto {
    private ProductDto product;
    private float quantity;

    public ProductDto getProduct() {
        return product;
    }

    public void setProduct(ProductDto product) {
        this.product = product;
    }

    public float getQuantity() {
        return quantity;
    }

    public void setQuantity(float quantity) {
        this.quantity = quantity;
    }
}
