package com.Minul.finly_backend.control;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.Minul.finly_backend.dto.CategoryDTO;
import com.Minul.finly_backend.service.CategoryService;

import lombok.RequiredArgsConstructor;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/categories")
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping("/save")
    public ResponseEntity<CategoryDTO> saveCategory(@RequestBody CategoryDTO categoryDTO){
            CategoryDTO response = categoryService.saveCategory(categoryDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);

    }

    @GetMapping("")
    public ResponseEntity< List<CategoryDTO> > getAllCategoriesForCurrentUser(){
            List<CategoryDTO> categories = categoryService.getAllCategoriesForCurrentUser();
            return ResponseEntity.ok(categories);


    }

}
