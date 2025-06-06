package com.example.bookservice;

// import com.example.bookservice.model.Book;
import com.example.bookservice.repository.BookRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@SpringBootTest(properties = {"spring.datasource.url=jdbc:h2:mem:testdb", "auth.enabled=false"})
@AutoConfigureMockMvc
@TestPropertySource(properties = "spring.jpa.hibernate.ddl-auto=create-drop")
class BookControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private BookRepository repository;

    @Test
    void shouldCreateAndFetchBooks() throws Exception {
        mockMvc.perform(post("/books")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"title\":\"Test\",\"author\":\"Author\",\"location\":\"Campus\"}"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").exists());

        mockMvc.perform(get("/books"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value("Test"));

        mockMvc.perform(get("/books?title=Test&author=Author"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].location").value("Campus"));

        Long id = repository.findAll().get(0).getId();
        mockMvc.perform(post("/books/" + id + "/exchange")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"fromUserId\":1,\"toUserId\":2,\"location\":\"Campus\"}"))
                .andExpect(status().isCreated());

        mockMvc.perform(get("/admin/stats"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.exchanges").value(1));
    }
}