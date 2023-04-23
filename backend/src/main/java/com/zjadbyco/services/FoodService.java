package com.zjadbyco.services;

import com.zjadbyco.dtos.DishDto;
import com.zjadbyco.dtos.FoodDto;
import com.zjadbyco.entities.*;
import com.zjadbyco.entities.enums.CategoryName;
import com.zjadbyco.repositories.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

    public void addFood(FoodDto foodDto) {
        Category category = categoryService.findCategoryById(foodDto.getCategory().getId());

        Food food;
        if (category.getName() == CategoryName.OWN_DISHES) {
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
            food = dish;
        } else {
            food = new Product();
        }

        food.setName(foodDto.getName());
        food.setCategory(category);

        logger.info("Food name: " + food.getName());
        logger.info("Food category: " + food.getCategory().getId() + ", " + food.getCategory().getName());
        List<String> products = new ArrayList<>();
        ((Dish) food).getDishProducts().forEach(dishProduct -> {
            products.add(dishProduct.getProduct().getName() + ", " + dishProduct.getQuantity());
        });

        products.forEach(logger::info);
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