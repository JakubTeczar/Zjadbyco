package com.zjadbyco.services;

import com.zjadbyco.dtos.*;
import com.zjadbyco.entities.Dish;
import com.zjadbyco.entities.Food;
import com.zjadbyco.entities.enums.CategoryName;
import com.zjadbyco.repositories.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoodService {
    private final FoodRepository foodRepository;

    @Autowired
    public FoodService(FoodRepository foodRepository) {
        this.foodRepository = foodRepository;
    }

    public Food getFoodById(long id) {
        return foodRepository.findById(id).orElse(null);
    }

    public List<FoodDto> getAllFoods() {
        return foodRepository.getAllFoods().stream().map(food -> {
            FoodDto foodDto;

            if (food.getCategory().getName() == CategoryName.DISHES) {
                DishDto dishDto = new DishDto();

                List<ProductsWithQuantityDto> productsWithQuantities = ((Dish) food).getDishProducts()
                        .stream()
                        .map(dishProduct -> {
                            ProductDto productDto = new ProductDto();
                            productDto.setId(dishProduct.getProduct().getId());
                            productDto.setName(dishProduct.getProduct().getName());
                            productDto.setCategory(new CategoryDto());
                            productDto.getCategory().setId(dishProduct.getProduct().getCategory().getId());
                            productDto.getCategory().setName(dishProduct.getProduct().getCategory().getName()
                                    .toString());
                            productDto.setUnit(dishProduct.getProduct().getUnit());
                            productDto.setCaloriesPerUnit(dishProduct.getProduct().getCaloriesPerUnit());

                            ProductsWithQuantityDto productsWithQuantity = new ProductsWithQuantityDto();
                            productsWithQuantity.setProduct(productDto);
                            productsWithQuantity.setQuantity(dishProduct.getQuantity());

                            return productsWithQuantity;
                        }).toList();

                dishDto.setProductsWithQuantities(productsWithQuantities);
                foodDto = dishDto;
            } else {
                foodDto = new ProductDto();
            }

            foodDto.setId(food.getId());
            foodDto.setName(food.getName());
            foodDto.setCategory(new CategoryDto());
            foodDto.getCategory().setId(food.getCategory().getId());
            foodDto.getCategory().setName(food.getCategory().getName().toString());
            foodDto.setUnit(food.getUnit());
            foodDto.setCaloriesPerUnit(food.getCaloriesPerUnit());

            return foodDto;
        }).toList();
    }
}