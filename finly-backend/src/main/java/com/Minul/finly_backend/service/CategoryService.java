package com.Minul.finly_backend.service;

import com.Minul.finly_backend.dto.CategoryDTO;
import com.Minul.finly_backend.entity.CategoryEntity;
import com.Minul.finly_backend.entity.ProfileEntity;
import com.Minul.finly_backend.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final ProfileService profileService;

    public CategoryDTO saveCategory(CategoryDTO categoryDTO){
        ProfileEntity profile = profileService.getCurrentProfile();

        if(categoryRepository.existsByNameAndProfileId(categoryDTO.getName(), profile.getId())) {
           throw new ResponseStatusException(HttpStatus.CONFLICT,"Category with this name already exists for the current user.");
        }
        CategoryEntity newCategory = toEntity(categoryDTO, profile);
        newCategory = categoryRepository.save(newCategory);
        return toDTO(newCategory);
    }

    private CategoryEntity toEntity(CategoryDTO categoryDTO, ProfileEntity profile) {
        return CategoryEntity.builder()
                .id(categoryDTO.getId())
                .profile(profile)
                .name(categoryDTO.getName())
                .icon(categoryDTO.getIcon())
                .type(categoryDTO.getType())
                .build();
    }

    private CategoryDTO toDTO(CategoryEntity categoryEntity) {
        return CategoryDTO.builder()
                .id(categoryEntity.getId())
                .ProfileId(categoryEntity.getProfile() !=null ? categoryEntity.getProfile().getId() : null)
                .name(categoryEntity.getName())
                .icon(categoryEntity.getIcon())
                .type(categoryEntity.getType())
                .createdAt(categoryEntity.getCreatedAt())
                .updatedAt(categoryEntity.getUpdatedAt())
                .build();

    }

    public List<CategoryDTO> getAllCategoriesForCurrentUser(){
         ProfileEntity profile = profileService.getCurrentProfile();
         List<CategoryEntity> categories = categoryRepository.findByProfileId(profile.getId());
         return categories.stream()
                 .map(this::toDTO)
                 .toList();
    }

    public List<CategoryDTO> getCategoryByType(String type) {
        ProfileEntity profile = profileService.getCurrentProfile();
        return categoryRepository.findByTypeAndProfileId(type, profile.getId())
                .stream()
                .map(this::toDTO)
                .toList();
    }

    public CategoryDTO updateCategoryForCurrentUser(long categoryId,CategoryDTO categoryDTO){
        ProfileEntity profile = profileService.getCurrentProfile();
        CategoryEntity category =  categoryRepository.findByIdAndProfileId(categoryId, profile.getId())
                .orElseThrow(() -> new RuntimeException("Category not found for the current user"));

        category.setName(categoryDTO.getName());
        category.setIcon(categoryDTO.getIcon());
        category.setType(categoryDTO.getType());
        CategoryEntity updatedCategory = categoryRepository.save(category);
        return toDTO(updatedCategory);
    }
}
