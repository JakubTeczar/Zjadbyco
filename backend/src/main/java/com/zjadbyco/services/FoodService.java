package com.zjadbyco.services;

import com.zjadbyco.dtos.DishDto;
import com.zjadbyco.dtos.FoodDto;
import com.zjadbyco.entities.*;
import com.zjadbyco.entities.enums.CategoryName;
import com.zjadbyco.repositories.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@Service
public class FoodService {
    private final FoodRepository foodRepository;
    private final ProductService productService;
    private final CategoryService categoryService;

    private final Logger logger = Logger.getLogger(FoodService.class.getName());

    @Autowired
    public FoodService(FoodRepository foodRepository, ProductService productService, CategoryService categoryService) {
        this.foodRepository = foodRepository;
        this.productService = productService;
        this.categoryService = categoryService;
    }

    public Food getFoodById(long id) {
        return foodRepository.findById(id).orElse(null);
    }

    public Food addFood(FoodDto foodDto) {
        Food food;
        if (foodDto instanceof DishDto) {
            Dish dish = new Dish();
            dish.setDishProducts(((DishDto) foodDto).getProductsWithQuantities()
                    .stream()
                    .map(productsWithQuantityDto -> {
                        Product product = productService.findProductById(productsWithQuantityDto.getProduct().getId());
                        DishProduct dishProduct = new DishProduct();
                        dishProduct.setDish(dish);
                        dishProduct.setProduct(product);
                        dishProduct.setQuantity(productsWithQuantityDto.getQuantity());
                        return dishProduct;
                    }).collect(Collectors.toSet()));
            Category category = categoryService.findCategoryByName(CategoryName.OWN_DISHES);
            food = dish;
            food.setCategory(category);
        } else {
            food = new Product();
            Category category = categoryService.findCategoryByName(CategoryName.OWN_PRODUCTS);
            food.setCategory(category);
        }

        food.setName(foodDto.getName());
        food.setUnit(foodDto.getUnit());
        food.setCaloriesPerUnit(foodDto.getCaloriesPerUnit());

        return foodRepository.save(food);
    }

    public List<FoodDto> getFoodByCategory(long categoryId) {
        Category category = categoryService.findCategoryById(categoryId);
        return foodRepository.getFoodByCategory(category).stream().map(food -> {
            FoodDto foodDto = new FoodDto();
            foodDto.setId(food.getId());
            foodDto.setName(food.getName());
            return foodDto;
        }).collect(Collectors.toList());
    }
}