package com.zjadbyco.controllers;

import com.zjadbyco.models.Calendar;
import com.zjadbyco.models.Dish;
import com.zjadbyco.models.Product;
import com.zjadbyco.repositories.CalendarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.logging.Logger;

@RestController
@CrossOrigin({"http://localhost:3000", "http://127.0.0.1:3000"})
@RequestMapping("/calendar")
public class CalendarController {
    private final Logger logger;
    private final CalendarRepository calendarRepository;

    @Autowired
    public CalendarController(CalendarRepository calendarRepository) {
        this.calendarRepository = calendarRepository;
        this.logger = Logger.getLogger(CalendarController.class.getName());
    }

    @GetMapping("/elements/{date}")
    public ResponseEntity<List<Calendar>> getFoodByDate(@PathVariable String date) {
        return ResponseEntity.ok().body(calendarRepository.getFoodByDate(date));
    }

    @GetMapping("/product")
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok().body(calendarRepository.getAllProducts());
    }

    @GetMapping("/dish")
    public ResponseEntity<List<Dish>> getAllDishes() {
        return ResponseEntity.ok().body(calendarRepository.getAllDishes());
    }

    @PostMapping("/add/product")
    public ResponseEntity<?> addProduct(@RequestBody String body) {
        logger.info(body);
        return ResponseEntity.ok().build();
    }

//    @PostMapping("/add/dish")
}