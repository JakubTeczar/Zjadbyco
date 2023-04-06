package com.zjadbyco.controllers;

import com.zjadbyco.models.Calendar;
import com.zjadbyco.repositories.CalendarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.logging.Logger;

@RestController
@CrossOrigin({"http://localhost:3000"})
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
}