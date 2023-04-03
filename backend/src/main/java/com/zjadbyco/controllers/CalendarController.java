package com.zjadbyco.controllers;

import com.zjadbyco.models.Food;
import com.zjadbyco.models.Odpowiedz;
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

    @PostMapping("/addElement")
    public ResponseEntity<Odpowiedz> addElement(@RequestBody Odpowiedz odpowiedz) {
        logger.info(odpowiedz.getName() + " " + odpowiedz.getAmount() + " " + odpowiedz.getCalories());
        return ResponseEntity.ok().body(odpowiedz);
    }

    @GetMapping("/elements/{date}")
    public ResponseEntity<List<Food>> getFoodByDate(@PathVariable String date) {
        logger.info(date);
        return ResponseEntity.ok().body(calendarRepository.getFoodByDate(date));
    }
}