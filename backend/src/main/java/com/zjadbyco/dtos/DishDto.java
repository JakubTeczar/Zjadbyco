package com.zjadbyco.dtos;

import java.util.List;

public class DishDto extends FoodDto {
    private List<ProductsWithQuantityDto> productsWithQuantities;

    public List<ProductsWithQuantityDto> getProductsWithQuantities() {
        return productsWithQuantities;
    }

    public void setProductsWithQuantities(List<ProductsWithQuantityDto> productsWithQuantities) {
        this.productsWithQuantities = productsWithQuantities;
    }
}
