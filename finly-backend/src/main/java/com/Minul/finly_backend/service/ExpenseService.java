package com.Minul.finly_backend.service;

import com.Minul.finly_backend.dto.ExpenseDTO;
import com.Minul.finly_backend.dto.IncomeDTO;
import com.Minul.finly_backend.entity.CategoryEntity;
import com.Minul.finly_backend.entity.ExpenseEntity;
import com.Minul.finly_backend.entity.IncomeEntity;
import com.Minul.finly_backend.entity.ProfileEntity;
import com.Minul.finly_backend.repository.CategoryRepository;
import com.Minul.finly_backend.repository.ExpenseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ExpenseService {

    private final CategoryRepository categoryRepository;
    private final ExpenseRepository expenseRepository;
    private final ProfileService profileService;

    public ExpenseDTO addExpense(ExpenseDTO dto){
        ProfileEntity profile = profileService.getCurrentProfile();
        CategoryEntity category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + dto.getCategoryId()));
        ExpenseEntity newItem = toEntity(dto, category, profile);
        ExpenseEntity savedExpense = expenseRepository.save(newItem);
        return toDTO(savedExpense);
    }

    public List<ExpenseDTO> getAllExpensesForCurrentUser(){
        ProfileEntity profile = profileService.getCurrentProfile();
        List<ExpenseEntity> expenses = expenseRepository.findByProfileIdOrderByDateAsc(profile.getId());
               return expenses.stream()
                       .map(this::toDTO)
                          .toList();
    }

    public List<ExpenseDTO> getCurrentMonthExpensesForCurrentUser(){
        LocalDate now = LocalDate.now();
        LocalDate startDate = now.withDayOfMonth(1);
        LocalDate endDate = now.withDayOfMonth(now.lengthOfMonth());
        ProfileEntity profile = profileService.getCurrentProfile();

        List<ExpenseEntity> expenses = expenseRepository.findByProfileIdAndDateBetween(profile.getId(), startDate, endDate);
        return expenses.stream()
                .map(this::toDTO)
                .toList();
    }

    public void deleteExpensesByID(Long expenseId){
        ProfileEntity profile = profileService.getCurrentProfile();
        ExpenseEntity expense =  expenseRepository.findById(expenseId)
                .orElseThrow(() -> new RuntimeException("Expense not found with id: " +expenseId));
        if (!expense.getProfile().getId().equals(profile.getId())) {
            throw new RuntimeException("Expense does not belong to the current user.");
        }
        expenseRepository.delete(expense);
    }


    public List<ExpenseDTO> getLatest5ExpensesForCurrentUser(){
        ProfileEntity profile = profileService.getCurrentProfile();
        List<ExpenseEntity> latestExpenses = expenseRepository.findTop5ByProfileIdOrderByDateDesc(profile.getId());
        return latestExpenses.stream()
                .map(this::toDTO)
                .toList();
    }

    public BigDecimal getTotalExpensesForCurrentUser(){
        ProfileEntity profile = profileService.getCurrentProfile();
        BigDecimal total =  expenseRepository.findTotalExpensesByProfileId(profile.getId());
        return total !=null ? total : BigDecimal.ZERO;
    }

    public List<ExpenseDTO> getExpensesForUserOnDate(Long profileId, LocalDate date) {
        List<ExpenseEntity> expenses= expenseRepository.findByProfileIdAndDate(profileId, date);
        return expenses.stream()
                .map(this::toDTO)
                .toList();
    }

    public ExpenseDTO updateexpensesForCurrentUser(long expenseId, ExpenseDTO expenseDTO){
        ProfileEntity profile = profileService.getCurrentProfile();
        ExpenseEntity expense =  expenseRepository.findByIdAndProfileId(expenseId, profile.getId())
                .orElseThrow(() -> new RuntimeException("Category not found for the current user"));

        expense.setName(expenseDTO.getName());
        expense.setIcon(expenseDTO.getIcon());
        expense.setAmount(expenseDTO.getAmount());
        expense.setDate(expenseDTO.getDate());
        CategoryEntity category = categoryRepository.findById(expenseDTO.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + expenseDTO.getCategoryId()));
        ExpenseEntity updatedexpense   = expenseRepository.save(expense);
        return toDTO(updatedexpense);
    }

    private ExpenseEntity toEntity(ExpenseDTO expenseDTO,CategoryEntity category, ProfileEntity profile) {

        return ExpenseEntity.builder()
                .id(expenseDTO.getId())
                .name(expenseDTO.getName())
                .profile(profile)
                .icon(expenseDTO.getIcon())
                .category(category)
                .amount(expenseDTO.getAmount())
                .date(expenseDTO.getDate())
                .build();
    }
    private ExpenseDTO toDTO(ExpenseEntity expenseEntity){
        return ExpenseDTO.builder()
                .id(expenseEntity.getId())
                .name(expenseEntity.getName())
                .icon(expenseEntity.getIcon())
                .categoryId(expenseEntity.getCategory() !=null ? expenseEntity.getCategory().getId() : null)
                .categoryName(expenseEntity.getCategory() !=null ? expenseEntity.getCategory().getName() : "N/A")
                .profileId(expenseEntity.getProfile().getId())
                .amount(expenseEntity.getAmount())
                .date(expenseEntity.getDate())
                .createdAt(expenseEntity.getCreatedAt())
                .updatedAt(expenseEntity.getUpdatedAt())
                .build();

    }
}
