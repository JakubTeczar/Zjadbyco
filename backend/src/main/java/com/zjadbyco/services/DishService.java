package com.zjadbyco.services;

import com.zjadbyco.dtos.*;
import com.zjadbyco.entities.DishProduct;
import com.zjadbyco.repositories.DishRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Stream;

@Service
public class DishService {
    private final DishRepository dishRepository;

    @Autowired
    public DishService(DishRepository dishRepository) {
        this.dishRepository = dishRepository;
    }

    public List<DishDto> getAllDishes() {
        return dishRepository.getAllDishes().stream().map(dish -> {
            List<ProductsWithQuantityDto> productsWithQuantities = dish.getDishProducts()
                    .stream()
                    .map(this::mapDishProductToProductsWithQuantity)
                    .toList();
            DishDto dishDto = new DishDto();
            dishDto.setId(dish.getId());
            dishDto.setName(dish.getName());
            dishDto.setCategory(new CategoryDto());
            dishDto.getCategory().setId(dish.getCategory().getId());
            dishDto.getCategory().setName(dish.getCategory().getName().toString());
            dishDto.setUnit(dish.getUnit());
            dishDto.setCaloriesPerUnit(dish.getCaloriesPerUnit());
            dishDto.setProductsWithQuantities(productsWithQuantities);

            return dishDto;
        }).toList();
    }

    public ProductsWithQuantityDto mapDishProductToProductsWithQuantity(DishProduct dishProduct) {
        ProductDto productDto = new ProductDto();
        productDto.setName(dishProduct.getProduct().getName());
        productDto.setUnit(dishProduct.getProduct().getUnit());
        productDto.setCaloriesPerUnit(dishProduct.getProduct().getCaloriesPerUnit());

        ProductsWithQuantityDto productsWithQuantity = new ProductsWithQuantityDto();
        productsWithQuantity.setProduct(productDto);
        productsWithQuantity.setQuantity(dishProduct.getQuantity());

        return productsWithQuantity;
    }
}
