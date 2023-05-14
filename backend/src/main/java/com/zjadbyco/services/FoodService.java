package com.zjadbyco.services;

import com.zjadbyco.dtos.*;
import com.zjadbyco.entities.*;
import com.zjadbyco.entities.enums.CategoryName;
import com.zjadbyco.repositories.CalendarRepository;
import com.zjadbyco.repositories.FoodRepository;
import com.zjadbyco.repositories.FridgeRepository;
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
    private final CalendarRepository calendarRepository;
    private final FridgeRepository fridgeRepository;
    private final DishService dishService;

    private final Logger logger = Logger.getLogger(FoodService.class.getName());

    @Autowired
    public FoodService(
            FoodRepository foodRepository,
            CategoryService categoryService,
            DishProductService dishProductService,
            CalendarRepository calendarRepository,
            FridgeRepository fridgeRepository,
            DishService dishService
    ) {
        this.foodRepository = foodRepository;
        this.categoryService = categoryService;
        this.dishProductService = dishProductService;
        this.calendarRepository = calendarRepository;
        this.fridgeRepository = fridgeRepository;
        this.dishService = dishService;
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
        } else {
            logger.info(Long.toString(id));
            List<DishDto> dishDtos = dishService.getAllDishes();
            for (DishDto dishDto : dishDtos) {
                for (ProductsWithQuantityDto productsWithQuantityDto : dishDto.getProductsWithQuantities()) {
                    if (productsWithQuantityDto.getProduct().getId() == id) {
                        calendarRepository.deleteByFoodIdAndUser(dishDto.getId());
                        fridgeRepository.deleteByFoodIdAndUser(dishDto.getId());
                        foodRepository.removeFood(dishDto.getId());
                        dishProductService.removeProductsForDish(dishDto.getId());
                    }
                }
            }
        }

        calendarRepository.deleteByFoodIdAndUser(id);
        fridgeRepository.deleteByFoodIdAndUser(id);
        foodRepository.removeFood(id);
    }

    FoodDto getFoodDtoById(long id) {
        Food food = getFoodById(id);
        FoodDto foodDto;
        if (food.getCategory().getName() == CategoryName.DISHES ||
                food.getCategory().getName() == CategoryName.OWN_DISHES) {
            DishDto dishDto = new DishDto();
            List<ProductsWithQuantityDto> productsWithQuantities = ((Dish) food)
                    .getDishProducts()
                    .stream()
                    .map(dishService::mapDishProductToProductsWithQuantity).toList();

            dishDto.setProductsWithQuantities(productsWithQuantities);
            foodDto = dishDto;
        } else {
            foodDto = new ProductDto();
        }
        CategoryDto categoryDto = new CategoryDto();
        categoryDto.setId(food.getCategory().getId());
        categoryDto.setName(food.getCategory().getName().toString());

        foodDto.setId(food.getId());
        foodDto.setName(food.getName());
        foodDto.setCategory(categoryDto);
        foodDto.setCaloriesPerUnit(food.getCaloriesPerUnit());
        foodDto.setUnit(food.getUnit());

        return foodDto;
    }
}