package com.example.bookservice.controller;



import com.example.bookservice.model.Book;

import com.example.bookservice.repository.BookRepository;
import com.example.bookservice.repository.ExchangeRepository;
import com.example.bookservice.model.Exchange;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;



import java.util.List;
import java.util.Optional;


@RestController

@RequestMapping("/books")

public class BookController {
    private final BookRepository bookRepository;
    private final ExchangeRepository exchangeRepository;

    public BookController(BookRepository bookRepository, ExchangeRepository exchangeRepository) {
        this.bookRepository = bookRepository;
        this.exchangeRepository = exchangeRepository;
    }


    @GetMapping
    public List<Book> getBooks(@RequestParam Optional<String> title,
                               @RequestParam Optional<String> author) {
        if (title.isPresent() || author.isPresent()) {
            return bookRepository.findByTitleContainingIgnoreCaseAndAuthorContainingIgnoreCase(
                    title.orElse(""), author.orElse(""));
        }
        return bookRepository.findAll();
    }


    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Book addBook(@RequestBody Book book) {
        return bookRepository.save(book);
    }

    @PostMapping("/{id}/exchange")
    @ResponseStatus(HttpStatus.CREATED)
    public Exchange exchangeBook(@PathVariable Long id, @RequestBody Exchange request) {
        Book book = bookRepository.findById(id).orElseThrow();
        request.setBook(book);
        return exchangeRepository.save(request);
    }
}