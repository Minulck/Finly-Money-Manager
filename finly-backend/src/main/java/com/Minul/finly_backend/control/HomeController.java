package com.Minul.finly_backend.control;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/health")
public class HomeController {

    @GetMapping("")
    public String healthCheck() {
        return "Finly Backend is running!";
    }
}
