package com.zjadbyco.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/hello")
@CrossOrigin({"http://localhost:3000", "http://127.0.0.1:3000"})
public class HelloController {
}
