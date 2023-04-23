package com.zjadbyco.services;

import com.zjadbyco.entities.Food;
import com.zjadbyco.repositories.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}