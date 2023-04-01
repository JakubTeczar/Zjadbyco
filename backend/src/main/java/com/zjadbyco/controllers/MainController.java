package com.zjadbyco.controllers;

import com.zjadbyco.models.Odpowiedz;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.logging.Logger;


@RestController
public class MainController {
    Logger logger = Logger.getLogger(MainController.class.getName());

    @CrossOrigin
    @PostMapping("/calendar/addElement")
    public ResponseEntity<Odpowiedz> addElement(@RequestBody Odpowiedz odpowiedz) {
        logger.info(odpowiedz.getName() + " " + odpowiedz.getAmount() + " " + odpowiedz.getCalories());

        return ResponseEntity.ok().body(odpowiedz);
    }

    @CrossOrigin
    @GetMapping("/calendar/elements")
    public ResponseEntity<List<Odpowiedz>> Elementy() {
        Odpowiedz odpowiedz1 = new Odpowiedz("odpowiedz1", "1", "1800", "01.01.2001");
        Odpowiedz odpowiedz2 = new Odpowiedz("odpowiedz2", "2", "1550", "15.05.2020");
        Odpowiedz odpowiedz3 = new Odpowiedz("odpowiedz3", "3", "1800", "31.03.2023");

        return ResponseEntity.ok().body(Arrays.asList(odpowiedz1, odpowiedz2, odpowiedz3));
    }
}