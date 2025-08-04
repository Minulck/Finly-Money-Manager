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
    public ResponseEntity<?> saveCategory(@RequestBody CategoryDTO categoryDTO){
          try{
              CategoryDTO response = categoryService.saveCategory(categoryDTO);
              return ResponseEntity.status(HttpStatus.CREATED).body(response);
          }            catch (Exception e) {
              return ResponseEntity.status(HttpStatus.CONFLICT).body(
                      "Category with this name already exists "
              );
          }


    }

    @GetMapping("")
    public ResponseEntity< List<CategoryDTO> > getAllCategoriesForCurrentUser(){
            List<CategoryDTO> categories = categoryService.getAllCategoriesForCurrentUser();
            return ResponseEntity.ok(categories);
    }

    @GetMapping("/{type}")
    public ResponseEntity<List <CategoryDTO> > getCategoryByTypeForCurrentUser (@PathVariable String type) {
        List<CategoryDTO> categories = categoryService.getCategoryByType(type);
        if (categories.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(categories);
        }
        return ResponseEntity.ok(categories);
    }

    @PutMapping("/{id}")
    public ResponseEntity <?> updateCategory(@PathVariable Long id , @RequestBody CategoryDTO categoryDTO) {
        try{
            CategoryDTO updatedCategory = categoryService.updateCategoryForCurrentUser(id, categoryDTO);
            if (updatedCategory == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            return ResponseEntity.status(HttpStatus.CREATED).body(updatedCategory);
        }            catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(
                    "Category with this name already exists "
            );
        }
    }

}
