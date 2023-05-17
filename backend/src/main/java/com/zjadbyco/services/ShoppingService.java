package com.zjadbyco.services;

import com.zjadbyco.dtos.*;
import com.zjadbyco.entities.Dish;
import com.zjadbyco.entities.Product;
import com.zjadbyco.entities.Shopping;
import com.zjadbyco.entities.enums.CategoryName;
import com.zjadbyco.repositories.ShoppingRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.zjadbyco.util.FoodIdWithQuantity;
import com.zjadbyco.util.FridgeDtos;

import java.time.LocalDate;
import java.util.*;

@Service
public class ShoppingService {
    private final CalendarService calendarService;
    private final FridgeService fridgeService;
    private final FoodService foodService;
    private final ShoppingRepository shoppingRepository;

    @Autowired
    public ShoppingService(
            CalendarService calendarService,
            FridgeService fridgeService,
            FoodService foodService,
            ShoppingRepository shoppingRepository
    ) {
        this.calendarService = calendarService;
        this.fridgeService = fridgeService;
        this.foodService = foodService;
        this.shoppingRepository = shoppingRepository;
    }

    public void generateShoppingList(long userId, LocalDate startDate, LocalDate endDate) {
        removeShoppingList(userId);

        List<CalendarDto> calendarDtos = calendarService.getUncheckedFoodBetweenDates(startDate, endDate);
        List<CalendarDto> sortedCalendarDtos = new ArrayList<>(calendarDtos);
        sortedCalendarDtos.sort(Comparator.comparing(CalendarDto::getDate));

        FridgeDtos fridgeDtos = new FridgeDtos(fridgeService.getAllFood());
        fridgeDtos.sortByDate();

        for (CalendarDto calendarDto : sortedCalendarDtos) {
            FoodIdWithQuantity foodIdWithQuantity = fridgeDtos.findFoodWithQuantityBeforeExpirationDate(
                    calendarDto.getFood().getId(),
                    calendarDto.getQuantity(),
                    calendarDto.getDate()
            );

            if (calendarDto.getFood().getId() == foodIdWithQuantity.getFoodId() &&
                    calendarDto.getQuantity() == foodIdWithQuantity.getQuantity()) {
                continue;
            } else if (
                    calendarDto.getFood().getCategory().getName().equals(CategoryName.DISHES.toString()) ||
                            calendarDto.getFood().getCategory().getName().equals(CategoryName.OWN_DISHES.toString())
            ) {
                float dishNeededQuantity = calendarDto.getQuantity() - foodIdWithQuantity.getQuantity();
                ((Dish) foodService.getFoodById(calendarDto.getFood().getId()))
                        .getDishProducts().forEach(dishProduct -> {
                            Product product = dishProduct.getProduct();
                            float fullNededQuantity = dishProduct.getQuantity() * dishNeededQuantity;

                            FoodIdWithQuantity productIdWithQuantity =
                                    fridgeDtos.findFoodWithQuantityBeforeExpirationDate(
                                            product.getId(), fullNededQuantity, calendarDto.getDate()
                                    );

                            if (product.getId() == productIdWithQuantity.getFoodId() &&
                                    fullNededQuantity == productIdWithQuantity.getQuantity()) {
                                return;
                            } else {
                                Shopping shopping = new Shopping();
                                shopping.setProduct(product);
                                shopping.setQuantity(fullNededQuantity - productIdWithQuantity.getQuantity());
                                shopping.setUserId(0);
                                saveShopping(shopping);
                            }
                        });

            } else {
                Shopping shopping = new Shopping();
                shopping.setProduct((Product) foodService.getFoodById(calendarDto.getFood().getId()));
                shopping.setQuantity(calendarDto.getQuantity() - foodIdWithQuantity.getQuantity());
                shopping.setUserId(0);
                saveShopping(shopping);
            }
        }


    }

    @Transactional
    public void saveShopping(Shopping shopping) {
        Shopping existingShopping = shoppingRepository.getShoppingByProductAndUserId(shopping.getUserId(), shopping.getProduct());

        if (existingShopping != null) {
            shoppingRepository.updateShoppingQuantity(
                    existingShopping.getId(),
                    existingShopping.getQuantity() + shopping.getQuantity()
            );
        } else {
            shoppingRepository.save(shopping);
        }
    }

    public void removeShoppingList(long userId) {
        shoppingRepository.removeShoppingListByUserId(userId);
    }

    public List<ShoppingDto> getShoppingList(long userId) {
        return shoppingRepository.getShoppingByUserId(userId).stream().map(shopping -> {
            ShoppingDto shoppingDto = new ShoppingDto();

            ProductDto productDto = new ProductDto();
            productDto.setId(shopping.getProduct().getId());
            productDto.setName(shopping.getProduct().getName());
            productDto.setUnit(shopping.getProduct().getUnit());

            shoppingDto.setId(shopping.getId());
            shoppingDto.setProduct(productDto);
            shoppingDto.setQuantity(shopping.getQuantity());
            shoppingDto.setChecked(shopping.isChecked());

            return shoppingDto;
        }).toList();
    }

    public void deleteFromShoppingList(long id) {
        shoppingRepository.deleteFromShoppingList(id);
    }

    public void changeChecked(ShoppingDto shoppingDto) {
        shoppingRepository.changeChecked(shoppingDto.getId(), shoppingDto.isChecked());
    }
}
