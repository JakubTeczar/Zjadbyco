package com.zjadbyco.services;

import com.zjadbyco.dtos.CalendarDto;
import com.zjadbyco.dtos.FoodDto;
import com.zjadbyco.dtos.ShoppingDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ShoppingService {
    private final CalendarService calendarService;

    @Autowired
    public ShoppingService(CalendarService calendarService) {
        this.calendarService = calendarService;
    }

    public List<ShoppingDto> getShoppingList(long userId) {
        List<CalendarDto> calendarDtos = calendarService.getFoodByUser(userId);

        return new ArrayList<>();
    }
}
