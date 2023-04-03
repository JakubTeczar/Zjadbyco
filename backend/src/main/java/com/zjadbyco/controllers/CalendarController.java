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
    private final Logger logger = Logger.getLogger(CalendarController.class.getName());
    private final CalendarRepository calendarRepository;

    @Autowired
    public CalendarController(CalendarRepository calendarRepository) {
        this.calendarRepository = calendarRepository;
    }

    @PostMapping("/addElement")
    public ResponseEntity<Odpowiedz> addElement(@RequestBody Odpowiedz odpowiedz) {
        logger.info(odpowiedz.getName() + " " + odpowiedz.getAmount() + " " + odpowiedz.getCalories());
        return ResponseEntity.ok().body(odpowiedz);
    }

    @GetMapping("/elements")
    public ResponseEntity<List<Food>> getFoodByDate() {
        return ResponseEntity.ok().body(calendarRepository.getFoodByDate("2023-04-02"));
        //TODO: CHWILOWO DATA WPISANA NA SZTYWNO AZ TECZKI POPRAWI U SIEBIE
    }
}