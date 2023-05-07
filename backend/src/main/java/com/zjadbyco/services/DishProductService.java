package com.zjadbyco.services;

import com.zjadbyco.repositories.DishProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DishProductService {
    private final DishProductRepository dishProductRepository;

    @Autowired
    public DishProductService(DishProductRepository dishProductRepository) {
        this.dishProductRepository = dishProductRepository;
    }

    public void removeProductsForDish(long dishId) {
        dishProductRepository.removeDishProductsByDishId(dishId);
    }
}
