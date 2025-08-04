package com.Minul.finly_backend.repository;

import com.Minul.finly_backend.entity.ExpenseEntity;
import com.Minul.finly_backend.entity.IncomeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ExpenseRepository extends JpaRepository<ExpenseEntity, Long> {

    List<ExpenseEntity> findByProfileIdOrderByDateAsc(Long profileId);
    List<ExpenseEntity> findTop5ByProfileIdOrderByDateDesc(Long profileId);
    Optional<ExpenseEntity> findByIdAndProfileId(Long id, Long profileId);
    @Query ("SELECT SUM(e.amount) FROM ExpenseEntity e WHERE e.profile.id = :profileId")
     BigDecimal findTotalExpensesByProfileId(@Param("profileId") Long profileId);

   // select * from expense where profile_id = ?1 and date between ?2 and ?3 and name like %?4%
    List<ExpenseEntity> findByProfileIdAndDateBetweenAndNameContainingIgnoreCase(
            Long profileId,
            LocalDate startDate,
            LocalDate endDate,
            String name
    );

    List<ExpenseEntity> findByProfileIdAndDateBetween(
            Long profileId,
            LocalDate startDate,
            LocalDate endDate
    );
    List<ExpenseEntity> findByProfileIdAndDate(Long profileId, LocalDate date) ;
}


