package com.travelplanner.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.travelplanner.entity.Itinerary;
import com.travelplanner.entity.Trip;

@Repository
public interface ItineraryRepository extends JpaRepository<Itinerary, Long>,JpaSpecificationExecutor<Itinerary>{

    List<Itinerary> findByTrip(Trip trip);

    long countByTrip(Trip trip);
    
    List<Itinerary> findByTripTripId(Long tripId);

}