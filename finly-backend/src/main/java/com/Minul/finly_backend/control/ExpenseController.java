package com.Minul.finly_backend.control;

import com.Minul.finly_backend.dto.ExpenseDTO;
import com.Minul.finly_backend.dto.IncomeDTO;
import com.Minul.finly_backend.service.ExpenseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/expenses")
public class ExpenseController {

    private final ExpenseService expenseService;

    @PostMapping("/add")
    public ResponseEntity<ExpenseDTO> addExpenses(@RequestBody ExpenseDTO dto){
        ExpenseDTO saved = expenseService.addExpense(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping("/all")
    public ResponseEntity<List<ExpenseDTO>> getAllExpensesForCurrentUser() {
        return ResponseEntity.ok(expenseService.getAllExpensesForCurrentUser());
    }

    @GetMapping("/current-month")
    public ResponseEntity<List<ExpenseDTO>> getCurrentMonthExpensesForCurrentUser() {
        return ResponseEntity.ok(expenseService.getCurrentMonthExpensesForCurrentUser());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpensesByID(@PathVariable long id) {
        expenseService.deleteExpensesByID(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/latest-5")
    public ResponseEntity<List<ExpenseDTO>> getLatest5ExpensesForCurrentUser() {
        return ResponseEntity.ok(expenseService.getLatest5ExpensesForCurrentUser());
    }

    @GetMapping("/total")
    public ResponseEntity<BigDecimal> getTotalExpensesForCurrentUser() {
        BigDecimal total = expenseService.getTotalExpensesForCurrentUser();
        return ResponseEntity.ok(total);
    }

    @PutMapping("/{id}")
    public ResponseEntity <?> updateCategory(@PathVariable Long id , @RequestBody ExpenseDTO expenseDTO) {
        try{
            ExpenseDTO updatedExpense = expenseService.updateexpensesForCurrentUser(id, expenseDTO);
            if (updatedExpense == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            return ResponseEntity.status(HttpStatus.CREATED).body(updatedExpense);
        }            catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(
                    "Category with this name already exists "
            );
        }
    }

}
