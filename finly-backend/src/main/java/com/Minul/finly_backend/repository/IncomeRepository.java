package com.Minul.finly_backend.repository;

import com.Minul.finly_backend.entity.CategoryEntity;
import com.Minul.finly_backend.entity.IncomeEntity;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface IncomeRepository extends JpaRepository<IncomeEntity,Long> {
    List<IncomeEntity> findByProfileIdOrderByDateDesc(Long profileId);
    List<IncomeEntity> findTop5ByProfileIdOrderByDateDesc(Long profileId);
    Optional<IncomeEntity> findByIdAndProfileId(Long id, Long profileId);
    @Query("SELECT SUM(e.amount) FROM IncomeEntity e WHERE e.profile.id = :profileId")
    BigDecimal findTotalExpensesByProfileId(@Param("profileId") Long profileId);

    // select * from expense where profile_id = ?1 and date between ?2 and ?3 and name like %?4%
    List<IncomeEntity> findByProfileIdAndDateBetweenAndNameContainingIgnoreCase(
            Long profileId,
            LocalDate startDate,
            LocalDate endDate,
            String name,
            Sort sort
    );

    List<IncomeEntity> findByProfileIdAndDateBetween(
            Long profileId,
            LocalDate startDate,
            LocalDate endDate,
            Sort sort
    );
    List<IncomeEntity> findByProfileIdAndDate(Long profileId, LocalDate date) ;

}
