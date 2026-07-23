package com.travelplanner.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.travelplanner.entity.TripCompanion;

public interface TripCompanionRepository extends JpaRepository<TripCompanion, Long> {

    List<TripCompanion> findByTripTripId(Long tripId);

}