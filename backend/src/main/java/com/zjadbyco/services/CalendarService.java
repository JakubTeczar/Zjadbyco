package com.zjadbyco.services;

import com.zjadbyco.dtos.*;
import com.zjadbyco.entities.Calendar;
import com.zjadbyco.entities.Category;
import com.zjadbyco.entities.Dish;
import com.zjadbyco.entities.enums.CategoryName;
import com.zjadbyco.repositories.CalendarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;
import java.util.logging.Logger;

@Service
public class CalendarService {
    private final CalendarRepository calendarRepository;
    private final DishService dishService;
    private final FoodService foodService;
    private final CategoryService categoryService;

    private final Logger logger = Logger.getLogger(CalendarService.class.getName());

    @Autowired
    public CalendarService(
            CalendarRepository calendarRepository,
            DishService dishService,
            FoodService foodService,
            CategoryService categoryService
    ) {
        this.calendarRepository = calendarRepository;
        this.dishService = dishService;
        this.foodService = foodService;
        this.categoryService = categoryService;
    }

    public List<CalendarDto> getFoodByDate(LocalDate date) {
        return getFoodBetweenDates(date, date);
    }

    public void saveFood(CalendarDto calendarDto) {
        Calendar calendar = new Calendar();
        calendar.setFood(foodService.getFoodById(calendarDto.getFood().getId()));
        calendar.setQuantity(calendarDto.getQuantity());
        calendar.setDate(calendarDto.getDate());

        calendarRepository.save(calendar);
    }

    public void deleteFood(CalendarDto calendarDto) {
        calendarRepository.deleteFood(calendarDto.getId());
    }

    public void changeChecked(CalendarDto calendarDto) {
        calendarRepository.changeChecked(calendarDto.getId(), calendarDto.getChecked());
    }

    public List<CalendarDto> getFoodByUser(long userId) {
        return calendarRepository.getFoodByUser(userId).stream().map(calendar -> {
            CalendarDto calendarDto = new CalendarDto();

            if (calendar.getFood().getCategory().getName() == CategoryName.DISHES ||
                calendar.getFood().getCategory().getName() == CategoryName.OWN_DISHES) {
                DishDto dishDto = new DishDto();

                List<ProductsWithQuantityDto> productsWithQuantities = ((Dish) calendar.getFood())
                        .getDishProducts()
                        .stream()
                        .map(dishService::mapDishProductToProductsWithQuantity).toList();

                dishDto.setProductsWithQuantities(productsWithQuantities);
                calendarDto.setFood(dishDto);
            } else {
                calendarDto.setFood(new ProductDto());
            }
            CategoryDto categoryDto = new CategoryDto();
            categoryDto.setId(calendar.getFood().getCategory().getId());
            categoryDto.setName(calendar.getFood().getCategory().getName().toString());

            calendarDto.getFood().setId(calendar.getFood().getId());
            calendarDto.getFood().setCategory(categoryDto);
            calendarDto.getFood().setName(calendar.getFood().getName());
            calendarDto.getFood().setUnit(calendar.getFood().getUnit());
            calendarDto.getFood().setCaloriesPerUnit(calendar.getFood().getCaloriesPerUnit());
            calendarDto.setQuantity(calendar.getQuantity());
            calendarDto.setDate(calendar.getDate());
            calendarDto.setChecked(calendar.isChecked());

            return calendarDto;
        }).toList();
    }

    public void deleteByFoodIdAndUser(long foodId) {
        calendarRepository.deleteByFoodIdAndUser(foodId);
    }

    public List<CalendarDto> getFoodBetweenDates(LocalDate startDate, LocalDate endDate) {
        return calendarRepository.getFoodBetweenDates(startDate, endDate).stream().map(calendar -> {
            CalendarDto calendarDto = new CalendarDto();
            calendarDto.setId(calendar.getId());

            if (calendar.getFood().getCategory().getName() == CategoryName.DISHES ||
                calendar.getFood().getCategory().getName() == CategoryName.OWN_DISHES) {
                DishDto dishDto = new DishDto();

                List<ProductsWithQuantityDto> productsWithQuantities = ((Dish) calendar.getFood())
                        .getDishProducts()
                        .stream()
                        .map(dishService::mapDishProductToProductsWithQuantity).toList();

                dishDto.setProductsWithQuantities(productsWithQuantities);
                calendarDto.setFood(dishDto);
            } else {
                calendarDto.setFood(new ProductDto());
            }
            CategoryDto categoryDto = new CategoryDto();
            categoryDto.setId(calendar.getFood().getCategory().getId());
            categoryDto.setName(calendar.getFood().getCategory().getName().toString());

            calendarDto.getFood().setId(calendar.getFood().getId());
            calendarDto.getFood().setCategory(categoryDto);
            calendarDto.getFood().setName(calendar.getFood().getName());
            calendarDto.getFood().setUnit(calendar.getFood().getUnit());
            calendarDto.getFood().setCaloriesPerUnit(calendar.getFood().getCaloriesPerUnit());
            calendarDto.setQuantity(calendar.getQuantity());
            calendarDto.setDate(calendar.getDate());
            calendarDto.setChecked(calendar.isChecked());

            return calendarDto;
        }).toList();
    }

    public List<CalendarDto> getUncheckedFoodBetweenDates(LocalDate startDate, LocalDate endDate) {
        return calendarRepository.getUncheckedFoodBetweenDates(startDate, endDate).stream().map(calendar -> {
            CalendarDto calendarDto = new CalendarDto();
            calendarDto.setId(calendar.getId());

            if (calendar.getFood().getCategory().getName() == CategoryName.DISHES ||
                calendar.getFood().getCategory().getName() == CategoryName.OWN_DISHES) {
                DishDto dishDto = new DishDto();

                List<ProductsWithQuantityDto> productsWithQuantities = ((Dish) calendar.getFood())
                        .getDishProducts()
                        .stream()
                        .map(dishService::mapDishProductToProductsWithQuantity).toList();

                dishDto.setProductsWithQuantities(productsWithQuantities);
                calendarDto.setFood(dishDto);
            } else {
                calendarDto.setFood(new ProductDto());
            }
            CategoryDto categoryDto = new CategoryDto();
            categoryDto.setId(calendar.getFood().getCategory().getId());
            categoryDto.setName(calendar.getFood().getCategory().getName().toString());

            calendarDto.getFood().setId(calendar.getFood().getId());
            calendarDto.getFood().setCategory(categoryDto);
            calendarDto.getFood().setName(calendar.getFood().getName());
            calendarDto.getFood().setUnit(calendar.getFood().getUnit());
            calendarDto.getFood().setCaloriesPerUnit(calendar.getFood().getCaloriesPerUnit());
            calendarDto.setQuantity(calendar.getQuantity());
            calendarDto.setDate(calendar.getDate());
            calendarDto.setChecked(calendar.isChecked());

            return calendarDto;
        }).toList();
    }
}
