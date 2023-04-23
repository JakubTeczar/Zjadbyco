package com.zjadbyco.services;

import com.zjadbyco.dtos.*;
import com.zjadbyco.entities.Calendar;
import com.zjadbyco.entities.Dish;
import com.zjadbyco.entities.enums.CategoryName;
import com.zjadbyco.repositories.CalendarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@Service
public class CalendarService {
    private final CalendarRepository calendarRepository;
    private final FoodService foodService;

    @Autowired
    public CalendarService(CalendarRepository calendarRepository, FoodService foodService) {
        this.calendarRepository = calendarRepository;
        this.foodService = foodService;
    }

    public List<CalendarDto> getFoodByDate(LocalDate date) {
        return calendarRepository.getFoodByDate(date).stream().map(calendar -> {
            CalendarDto calendarDto = new CalendarDto();
            calendarDto.setId(calendar.getId());

            if (calendar.getFood().getCategory().getName() == CategoryName.DISHES) {
                DishDto dishDto = new DishDto();

                List<ProductsWithQuantityDto> productsWithQuantities = ((Dish) calendar.getFood()).getDishProducts()
                        .stream()
                        .map(dishProduct -> {
                            ProductDto productDto = new ProductDto();
                            productDto.setName(dishProduct.getProduct().getName());
                            productDto.setUnit(dishProduct.getProduct().getUnit());
                            productDto.setCaloriesPerUnit(dishProduct.getProduct().getCaloriesPerUnit());

                            ProductsWithQuantityDto productsWithQuantity = new ProductsWithQuantityDto();
                            productsWithQuantity.setProduct(productDto);
                            productsWithQuantity.setQuantity(dishProduct.getQuantity());

                            return productsWithQuantity;
                        }).toList();

                dishDto.setProductsWithQuantities(productsWithQuantities);
                calendarDto.setFood(dishDto);
            } else {
                calendarDto.setFood(new ProductDto());
            }

            calendarDto.getFood().setName(calendar.getFood().getName());
            calendarDto.getFood().setUnit(calendar.getFood().getUnit());
            calendarDto.getFood().setCaloriesPerUnit(calendar.getFood().getCaloriesPerUnit());
            calendarDto.setQuantity(calendar.getQuantity());
            calendarDto.setDate(calendar.getDate());

            return calendarDto;
        }).collect(Collectors.toList());
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
}
