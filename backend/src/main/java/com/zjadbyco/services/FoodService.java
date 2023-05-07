package com.zjadbyco.services;

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
    private final CategoryService categoryService;
    private final DishProductService dishProductService;

    private final Logger logger = Logger.getLogger(FoodService.class.getName());

    @Autowired
    public FoodService(
            FoodRepository foodRepository,
            CategoryService categoryService,
            DishProductService dishProductService
    ) {
        this.foodRepository = foodRepository;
        this.categoryService = categoryService;
        this.dishProductService = dishProductService;
    }

    public Food getFoodById(long id) {
        return foodRepository.findById(id).orElse(null);
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

    public void remove(long id) {
        if (getFoodById(id).getCategory().getName() == CategoryName.OWN_DISHES) {
            dishProductService.removeProductsForDish(id);
        }
        foodRepository.removeFood(id);
    }
}