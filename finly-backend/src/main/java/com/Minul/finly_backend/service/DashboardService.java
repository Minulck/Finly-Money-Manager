package com.Minul.finly_backend.service;

import com.Minul.finly_backend.dto.ExpenseDTO;
import com.Minul.finly_backend.dto.IncomeDTO;
import com.Minul.finly_backend.dto.RecentTransactionDTO;
import com.Minul.finly_backend.entity.ProfileEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static java.util.stream.Stream.concat;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final ExpenseService expenseService;
    private final IncomeService incomeService;
    private final ProfileService profileService;

    public Map<String,Object> getDashboardData() {
        ProfileEntity profile = profileService.getCurrentProfile();
        Map<String, Object> returnValue = new LinkedHashMap<>();
        List<ExpenseDTO> latestExpenses = expenseService.getLatest5ExpensesForCurrentUser();
        List<IncomeDTO> latestIncomes = incomeService.getLatest5IncomesForCurrentUser();
        List<RecentTransactionDTO> recentTransactions =  concat(latestIncomes.stream().map(income ->
                        RecentTransactionDTO.builder()
                                .id(income.getId())
                                .profileId(profile.getId())
                                .icon(income.getIcon())
                                .amount(income.getAmount())
                                .date(income.getDate())
                                .createdAt(income.getCreatedAt())
                                .updatedAt(income.getUpdatedAt())
                                .name(income.getName())
                                .type("Income")
                                .build()),
                latestExpenses.stream().map(expense ->
                        RecentTransactionDTO.builder()
                                .id(expense.getId())
                                .profileId(profile.getId())
                                .icon(expense.getIcon())
                                .amount(expense.getAmount())
                                .date(expense.getDate())
                                .createdAt(expense.getCreatedAt())
                                .updatedAt(expense.getUpdatedAt())
                                .name(expense.getName())
                                .type("Expense")
                                .build()))
                .sorted(
                        (a,b) -> {
                            int cmp = b.getDate().compareTo(a.getDate());
                            if (cmp == 0 && b.getCreatedAt() != null && a.getCreatedAt() != null) {
                               return b.getCreatedAt().compareTo(a.getCreatedAt());
                            }
                            return cmp;
                        }
                ).collect(Collectors.toList());

        returnValue.put("totalBalance",
                incomeService.getTotalIncomesForCurrentUser()
                        .subtract(expenseService.getTotalExpensesForCurrentUser()));
        returnValue.put("totalIncome", incomeService.getTotalIncomesForCurrentUser());
        returnValue.put("totalExpense", expenseService.getTotalExpensesForCurrentUser());
        returnValue.put("recent5incomes", latestIncomes);
        returnValue.put("recent5expenses", latestExpenses);
        returnValue.put("recentTransactions", recentTransactions);

        return returnValue;
    }

}
