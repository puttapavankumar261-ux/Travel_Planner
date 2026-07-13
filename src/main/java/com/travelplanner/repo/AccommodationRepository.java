package com.travelplanner.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.travelplanner.entity.Accommodation;
import com.travelplanner.entity.Trip;

@Repository
public interface AccommodationRepository
        extends JpaRepository<Accommodation, Long> {

    List<Accommodation> findByTrip(Trip trip);

    long countByTrip(Trip trip);

}