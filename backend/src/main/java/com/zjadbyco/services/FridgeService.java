package com.zjadbyco.services;

import com.zjadbyco.dtos.*;;
import com.zjadbyco.entities.Dish;
import com.zjadbyco.entities.Food;
import com.zjadbyco.entities.Fridge;
import com.zjadbyco.entities.enums.CategoryName;
import com.zjadbyco.repositories.FridgeRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FridgeService {
    private final FridgeRepository fridgeRepository;
    private final DishService dishService;
    private final FoodService foodService;

    @Autowired
    public FridgeService(FridgeRepository fridgeRepository, DishService dishService, FoodService foodService) {
        this.fridgeRepository = fridgeRepository;
        this.dishService = dishService;
        this.foodService = foodService;
    }

    public List<FridgeDto> getAllFood() {
        return fridgeRepository.getAllFood().stream().map(fridge -> {
            FridgeDto fridgeDto = new FridgeDto();
            fridgeDto.setId(fridge.getId());

            if (fridge.getFood().getCategory().getName() == CategoryName.DISHES ||
                fridge.getFood().getCategory().getName() == CategoryName.OWN_DISHES) {
                DishDto dishDto = new DishDto();

                List<ProductsWithQuantityDto> productsWithQuantities = ((Dish) fridge.getFood())
                        .getDishProducts()
                        .stream()
                        .map(dishService::mapDishProductToProductsWithQuantity)
                        .toList();

                dishDto.setProductsWithQuantities(productsWithQuantities);
                fridgeDto.setFood(dishDto);
            } else {
                fridgeDto.setFood(new ProductDto());
            }

            fridgeDto.getFood().setId(fridge.getFood().getId());
            fridgeDto.getFood().setName(fridge.getFood().getName());
            fridgeDto.getFood().setUnit(fridge.getFood().getUnit());
            fridgeDto.getFood().setCaloriesPerUnit(fridge.getFood().getCaloriesPerUnit());
            fridgeDto.setQuantity(fridge.getQuantity());
            fridgeDto.setExpirationDate(fridge.getExpirationDate());

            return fridgeDto;
        }).toList();
    }

    public List<FridgeDto> getDishes() {
        return fridgeRepository.getDishes().stream().map(fridge -> {
            FridgeDto fridgeDto = new FridgeDto();
            fridgeDto.setId(fridge.getId());
            DishDto dishDto = new DishDto();
            dishDto.setName(fridge.getFood().getName());
            dishDto.setUnit(fridge.getFood().getUnit());
            dishDto.setCaloriesPerUnit(fridge.getFood().getCaloriesPerUnit());
            List<ProductsWithQuantityDto> productsWithQuantity = ((Dish) fridge.getFood())
                    .getDishProducts()
                    .stream()
                    .map(dishService::mapDishProductToProductsWithQuantity)
                    .toList();
            dishDto.setProductsWithQuantities(productsWithQuantity);
            fridgeDto.setFood(dishDto);
            fridgeDto.setQuantity(fridge.getQuantity());
            fridgeDto.setExpirationDate(fridge.getExpirationDate());

            return fridgeDto;
        }).toList();
    }

    public List<FridgeDto> getProducts() {
        return fridgeRepository.getProducts().stream().map(fridge -> {
            FridgeDto fridgeDto = new FridgeDto();
            fridgeDto.setId(fridge.getId());
            ProductDto productDto = new ProductDto();
            productDto.setName(fridge.getFood().getName());
            productDto.setUnit(fridge.getFood().getUnit());
            productDto.setCaloriesPerUnit(fridge.getFood().getCaloriesPerUnit());
            fridgeDto.setFood(productDto);
            fridgeDto.setQuantity(fridge.getQuantity());
            fridgeDto.setExpirationDate(fridge.getExpirationDate());
            return fridgeDto;
        }).toList();
    }

    public void deleteFood(FridgeDto fridgeDto) {
        fridgeRepository.deleteFood(fridgeDto.getId());
    }


    @Transactional
    public void addFood(FridgeDto fridgeDto) {
        Food food = new Food();
        food.setId(fridgeDto.getFood().getId());
        Fridge fridge = fridgeRepository.getFridgeByFoodAndExpirationDate(food, fridgeDto.getExpirationDate());
        // If fridge object with same food and expiration date already exists
        if (fridge != null) {
            fridgeRepository.changeQuantity(fridge.getId(), fridge.getQuantity() + fridgeDto.getQuantity());
        } else {
            Fridge newFridge = new Fridge();
            newFridge.setFood(foodService.getFoodById(fridgeDto.getFood().getId()));
            newFridge.setQuantity(fridgeDto.getQuantity());
            newFridge.setExpirationDate(fridgeDto.getExpirationDate());
            fridgeRepository.save(newFridge);
        }
    }

    public void deleteByFoodIdAndUser(long foodId) {
        fridgeRepository.deleteByFoodIdAndUser(foodId);
    }


}
