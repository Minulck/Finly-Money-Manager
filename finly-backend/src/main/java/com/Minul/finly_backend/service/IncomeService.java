package com.Minul.finly_backend.service;


import com.Minul.finly_backend.dto.CategoryDTO;
import com.Minul.finly_backend.dto.IncomeDTO;
import com.Minul.finly_backend.entity.CategoryEntity;
import com.Minul.finly_backend.entity.IncomeEntity;
import com.Minul.finly_backend.entity.ProfileEntity;
import com.Minul.finly_backend.repository.CategoryRepository;
import com.Minul.finly_backend.repository.IncomeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class IncomeService {

    private final CategoryRepository categoryRepository;
    private final IncomeRepository incomeRepository;
    private final ProfileService profileService;

    public IncomeDTO addIncome(IncomeDTO dto){
        ProfileEntity profile = profileService.getCurrentProfile();
        CategoryEntity category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + dto.getCategoryId()));
        IncomeEntity newItem = toEntity(dto, category, profile);
        IncomeEntity savedExpense = incomeRepository.save(newItem);
        return toDTO(savedExpense);
    }

    public List<IncomeDTO> getAllIncomesForCurrentUser(){
        ProfileEntity profile = profileService.getCurrentProfile();
        List<IncomeEntity> incomes = incomeRepository.findByProfileIdOrderByDateDesc(profile.getId());
        return incomes.stream()
                .map(this::toDTO)
                .toList();
    }

    public List<IncomeDTO> getCurrentMonthIncomesForCurrentUser(){
        ProfileEntity profile = profileService.getCurrentProfile();
        LocalDate now = LocalDate.now();
        LocalDate startDate = now.withDayOfMonth(1);
        LocalDate endDate = now.withDayOfMonth(now.lengthOfMonth());
        List<IncomeEntity> incomes = incomeRepository.findByProfileIdAndDateBetween(profile.getId(), startDate, endDate, null);
        return incomes.stream()
                .map(this::toDTO)
                .toList();
    }

    public void deleteIncomeByID(Long incomeId){
        ProfileEntity profile = profileService.getCurrentProfile();
        IncomeEntity income =  incomeRepository.findById(incomeId)
                .orElseThrow(() -> new RuntimeException("Expense not found with id: " +incomeId));
        if (!income.getProfile().getId().equals(profile.getId())) {
            throw new RuntimeException("Expense does not belong to the current user.");
        }
        incomeRepository.delete(income);
    }

    public List<IncomeDTO> getLatest5IncomesForCurrentUser(){
        ProfileEntity profile = profileService.getCurrentProfile();
        List<IncomeEntity> latestIncomes = incomeRepository.findTop5ByProfileIdOrderByDateDesc(profile.getId());
        return latestIncomes.stream()
                .map(this::toDTO)
                .toList();
    }

    public BigDecimal getTotalIncomesForCurrentUser(){
        ProfileEntity profile = profileService.getCurrentProfile();
        BigDecimal total = incomeRepository.findTotalExpensesByProfileId(profile.getId());
        return total !=null ? total : BigDecimal.ZERO;
    }

    public List<IncomeDTO> getIncomesForUserOnDate(Long profileId, LocalDate date) {
        List<IncomeEntity> expenses= incomeRepository.findByProfileIdAndDate(profileId, date);
        return expenses.stream()
                .map(this::toDTO)
                .toList();
    }

    public IncomeDTO updateincomeForCurrentUser(long incomeId, IncomeDTO incomeDTO){
        ProfileEntity profile = profileService.getCurrentProfile();
        IncomeEntity income =  incomeRepository.findByIdAndProfileId(incomeId, profile.getId())
                .orElseThrow(() -> new RuntimeException("Category not found for the current user"));

        income.setName(incomeDTO.getName());
        income.setIcon(incomeDTO.getIcon());
        income.setAmount(incomeDTO.getAmount());
        income.setDate(incomeDTO.getDate());
        CategoryEntity category = categoryRepository.findById(incomeDTO.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + incomeDTO.getCategoryId()));
        IncomeEntity updatedIncome   = incomeRepository.save(income);
        return toDTO(updatedIncome);
    }

    private IncomeEntity toEntity(IncomeDTO incomeDTO, CategoryEntity category, ProfileEntity profile) {

        return IncomeEntity.builder()
                .id(incomeDTO.getId())
                .name(incomeDTO.getName())
                .profile(profile)
                .icon(incomeDTO.getIcon())
                .category(category)
                .amount(incomeDTO.getAmount())
                .date(incomeDTO.getDate())
                .build();
    }

    private IncomeDTO toDTO(IncomeEntity incomeEntity){
        return IncomeDTO.builder()
                .id(incomeEntity.getId())
                .name(incomeEntity.getName())
                .icon(incomeEntity.getIcon())
                .categoryId(incomeEntity.getCategory() !=null ? incomeEntity.getCategory().getId() : null)
                .categoryName(incomeEntity.getCategory() !=null ? incomeEntity.getCategory().getName() : "N/A")
                .profileId(incomeEntity.getProfile().getId())
                .amount(incomeEntity.getAmount())
                .date(incomeEntity.getDate())
                .createdAt(incomeEntity.getCreatedAt())
                .updatedAt(incomeEntity.getUpdatedAt())
                .build();

    }

}
