package com.Minul.finly_backend.control;


import com.Minul.finly_backend.dto.IncomeDTO;
import com.Minul.finly_backend.service.IncomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/incomes")
@RequiredArgsConstructor
public class IncomeController {

    private final IncomeService incomeService;

    @PostMapping("/add")
    public ResponseEntity<IncomeDTO> addIncome(@RequestBody IncomeDTO dto){
        IncomeDTO saved = incomeService.addIncome(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
    @GetMapping("/all")
    public ResponseEntity<List<IncomeDTO>> getAllIncomesForCurrentUser() {
        return ResponseEntity.ok(incomeService.getAllIncomesForCurrentUser());
    }
    @GetMapping("/current-month")
    public ResponseEntity<List<IncomeDTO>> getCurrentMonthIncomesForCurrentUser() {
        return ResponseEntity.ok(incomeService.getCurrentMonthIncomesForCurrentUser());
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIncomeByID(@PathVariable Long id) {
        incomeService.deleteIncomeByID(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/latest-5")
    public ResponseEntity<List<IncomeDTO>> getLatest5IncomesForCurrentUser() {
        return ResponseEntity.ok(incomeService.getLatest5IncomesForCurrentUser());
    }
    @GetMapping("/total")
    public ResponseEntity<BigDecimal> getTotalIncomesForCurrentUser() {
        BigDecimal total = incomeService.getTotalIncomesForCurrentUser();
        return ResponseEntity.ok(total);
    }
}
