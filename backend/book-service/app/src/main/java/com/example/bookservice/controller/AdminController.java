package com.example.bookservice.controller;

import com.example.bookservice.repository.BookRepository;
import com.example.bookservice.repository.ExchangeRepository;
import com.example.bookservice.model.Exchange;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin")
public class AdminController {
    private final BookRepository bookRepository;
    private final ExchangeRepository exchangeRepository;

    public AdminController(BookRepository bookRepository, ExchangeRepository exchangeRepository) {
        this.bookRepository = bookRepository;
        this.exchangeRepository = exchangeRepository;
    }

    @GetMapping("/exchanges")
    public List<Exchange> allExchanges() {
        return exchangeRepository.findAll();
    }

    @GetMapping("/stats")
    public Map<String, Long> stats() {
        Map<String, Long> map = new HashMap<>();
        map.put("books", bookRepository.count());
        map.put("exchanges", exchangeRepository.count());
        return map;
    }
}
