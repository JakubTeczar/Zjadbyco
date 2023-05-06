package com.zjadbyco.controllers;

import com.zjadbyco.dtos.*;
import com.zjadbyco.services.CalendarService;
import com.zjadbyco.services.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.logging.Logger;

@RestController
@CrossOrigin
@RequestMapping("/calendar")
public class CalendarController {
    private final CalendarService calendarService;
    private final FoodService foodService;

    private final Logger logger = Logger.getLogger(CalendarController.class.getName());

    @Autowired
    public CalendarController(CalendarService calendarService, FoodService foodService) {
        this.calendarService = calendarService;
        this.foodService = foodService;
    }

    @GetMapping("/elements/{date}")
    public ResponseEntity<List<CalendarDto>> getFoodByDate(@PathVariable LocalDate date) {
        return ResponseEntity.ok().body(calendarService.getFoodByDate(date));
    }

    @PostMapping("/add/existing")
    public ResponseEntity<Void> addExistingFood(@RequestBody CalendarDto calendarDto) {
        calendarService.saveFood(calendarDto);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/remove")
    public ResponseEntity<Void> removeFood(@RequestBody CalendarDto calendarDto) {
        calendarService.deleteFood(calendarDto);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/change-checked")
    public ResponseEntity<Void> changeChecked(@RequestBody CalendarDto calendarDto) {
        calendarService.changeChecked(calendarDto);
        return ResponseEntity.ok().build();
    }
}