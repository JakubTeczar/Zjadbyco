package com.zjadbyco.controllers;

import com.zjadbyco.dtos.FridgeDto;
import com.zjadbyco.services.FridgeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/fridge")
public class FridgeController {
    private final FridgeService fridgeService;

    @Autowired
    public FridgeController(FridgeService fridgeService) {
        this.fridgeService = fridgeService;
    }

    @GetMapping("/elements/all")
    public ResponseEntity<List<FridgeDto>> getAllFood() {
        return ResponseEntity.ok().body(fridgeService.getAllFood());
    }

    @GetMapping("/elements/products")
    public ResponseEntity<List<FridgeDto>> getProducts() {
        return ResponseEntity.ok().body(fridgeService.getProducts());
    }

    @GetMapping("/elements/dishes")
    public ResponseEntity<List<FridgeDto>> getDishes() {
        return ResponseEntity.ok().body(fridgeService.getDishes());
    }

    //
//    @PostMapping("/add/existing")
//    public ResponseEntity<Void> addExistingFood(@RequestBody FridgeDto fridgeDto) {
//        return ResponseEntity.ok().build();
//    }
//
//    @PostMapping("/add/new")
//    public ResponseEntity<Void> addNewFood(@RequestBody FridgeDto fridgeDto) {
//        return ResponseEntity.ok().build();
//    }
//
//
    @DeleteMapping("/remove")
    public ResponseEntity<Void> deleteFood(@RequestBody FridgeDto fridgeDto) {
        fridgeService.deleteFood(fridgeDto);
        return ResponseEntity.ok().build();
    }
}
