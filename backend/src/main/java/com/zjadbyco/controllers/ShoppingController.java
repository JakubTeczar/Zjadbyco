package com.zjadbyco.controllers;

import com.zjadbyco.dtos.ShoppingDto;
import com.zjadbyco.services.ShoppingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/shopping")
public class ShoppingController {
    public final ShoppingService shoppingService;

    @Autowired
    public ShoppingController(ShoppingService shoppingService) {
        this.shoppingService = shoppingService;
    }

    @PostMapping("/generate")
    public ResponseEntity<Void> generateShoppingList(
            @RequestParam(name = "start") LocalDate startDate,
            @RequestParam(name = "end") LocalDate endDate
    ) {
        shoppingService.generateShoppingList(0, startDate, endDate);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/get")
    public ResponseEntity<List<ShoppingDto>> getShoppingList() {
        return ResponseEntity.ok().body(shoppingService.getShoppingList(0));
    }
}
