package com.travelplanner.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.travelplanner.entity.Transportation;
import com.travelplanner.entity.Trip;

@Repository
public interface TransportationRepository
        extends JpaRepository<Transportation, Long>,JpaSpecificationExecutor<Transportation> {

    List<Transportation> findByTrip(Trip trip);

    long countByTrip(Trip trip);

    List<Transportation> findByTripTripId(Long tripId);
    
}