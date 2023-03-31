package com.zjadbyco.controllers;

import com.sun.tools.javac.Main;
import com.zjadbyco.models.Odpowiedz;
import com.zjadbyco.models.Product;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}