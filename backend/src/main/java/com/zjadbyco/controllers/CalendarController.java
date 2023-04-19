package com.zjadbyco.controllers;

import com.zjadbyco.dtos.CalendarDto;
import com.zjadbyco.services.CalendarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/calendar")
@CrossOrigin({"http://localhost:3000", "http://127.0.0.1:3000"})
public class CalendarController {
    private final CalendarService calendarService;

    @Autowired
    public CalendarController(CalendarService calendarService) {
        this.calendarService = calendarService;
    }

    @GetMapping("/elements/{date}")
    public ResponseEntity<List<CalendarDto>> getFoodByDate(@PathVariable LocalDate date) {
        return ResponseEntity.ok().body(calendarService.getFoodByDate(date));
    }

    @PostMapping("/add")
    public ResponseEntity<Void> addFood(@RequestBody CalendarDto calendarDto) {
        calendarService.saveFood(calendarDto);
        return ResponseEntity.ok().build();
    }
}