package com.travelplanner.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.travelplanner.entity.Expense;
import com.travelplanner.entity.Trip;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long>,JpaSpecificationExecutor<Expense> {

    List<Expense> findByTrip(Trip trip);

    long countByTrip(Trip trip);

	Double getTotalExpenseByTrip(Trip trip);

	Double getTotalExpenses();

}