package com.travelplanner.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.travelplanner.dto.ExpenseCategoryDto;
import com.travelplanner.dto.MonthlyExpenseDto;
import com.travelplanner.entity.Expense;
import com.travelplanner.entity.Trip;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long>,
        JpaSpecificationExecutor<Expense> {

    List<Expense> findByTrip(Trip trip);
    
    List<Expense> findByTripTripId(Long tripId);

    long countByTrip(Trip trip);
    
    @Query("""
    	       SELECT new com.travelplanner.dto.ExpenseCategoryDto(
    	           e.expenseCategory,
    	           COALESCE(SUM(e.amount),0)
    	       )
    	       FROM Expense e
    	       GROUP BY e.expenseCategory
    	       ORDER BY e.expenseCategory
    	       """)
    	List<ExpenseCategoryDto> getExpenseCategoryAnalytics();
    
    @Query("""
    	       SELECT
    	           YEAR(e.expenseDate),
    	           MONTH(e.expenseDate),
    	           COALESCE(SUM(e.amount), 0)
    	       FROM Expense e
    	       GROUP BY
    	           YEAR(e.expenseDate),
    	           MONTH(e.expenseDate)
    	       ORDER BY
    	           YEAR(e.expenseDate),
    	           MONTH(e.expenseDate)
    	       """)
    	List<Object[]> getMonthlyExpenseAnalytics();

    @Query("""
           SELECT COALESCE(SUM(e.amount), 0)
           FROM Expense e
           WHERE e.trip = :trip
           """)
    Double getTotalExpenseByTrip(@Param("trip") Trip trip);

    @Query("""
           SELECT COALESCE(SUM(e.amount), 0)
           FROM Expense e
           """)
    Double getTotalExpenses();

}