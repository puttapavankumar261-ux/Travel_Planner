package com.travelplanner.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.travelplanner.entity.Trip;
import com.travelplanner.entity.User;
import com.travelplanner.enums.TripStatus;

@Repository
public interface TripRepository extends JpaRepository<Trip, Long>, JpaSpecificationExecutor<Trip> {

    List<Trip> findByUser(User user);

    List<Trip> findByTripStatus(TripStatus tripStatus);

	Long countByTripStatus(TripStatus completed);

}