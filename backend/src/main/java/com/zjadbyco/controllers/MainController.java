package com.zjadbyco.controllers;

import com.zjadbyco.models.Product;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class MainController {

    @PostMapping("/calendar/addElement")
    public ResponseEntity<?> addElement(
            @RequestParam String name,
            @RequestParam int amount,
            @RequestParam String calories) {

        return ResponseEntity
                .ok()
                .header("name", name)
                .header("amount", Integer.toString(amount))
                .header("calories", calories)
                .body("");
    }
}