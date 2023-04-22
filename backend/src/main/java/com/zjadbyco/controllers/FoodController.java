package com.zjadbyco.controllers;

import com.zjadbyco.dtos.DishDto;
import com.zjadbyco.dtos.FoodDto;
import com.zjadbyco.dtos.ProductDto;
import com.zjadbyco.services.DishService;
import com.zjadbyco.services.FoodService;
import com.zjadbyco.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/food")
@CrossOrigin({"http://localhost:3000", "http://127.0.0.1:3000"})
public class FoodController {
    private final FoodService foodService;
    private final DishService dishService;
    private final ProductService productService;

    @Autowired
    public FoodController(FoodService foodService, DishService dishService, ProductService productService) {
        this.foodService = foodService;
        this.dishService = dishService;
        this.productService = productService;
    }

    @GetMapping("/")
    public ResponseEntity<List<FoodDto>> getAllFood() {
        return ResponseEntity.ok().body(foodService.getAllFoods());
    }

    @GetMapping("/products")
    public ResponseEntity<List<ProductDto>> getAllProducts() {
        return ResponseEntity.ok().body(productService.getAllProducts());
    }

    @GetMapping("/dishes")
    public ResponseEntity<List<DishDto>> getAllDishes() {
        return ResponseEntity.ok().body(dishService.getAllDishes());
    }
}
