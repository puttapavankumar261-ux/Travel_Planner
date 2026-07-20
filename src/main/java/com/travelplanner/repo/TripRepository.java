package com.travelplanner.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.travelplanner.dto.TripDestinationAnalyticsDto;
import com.travelplanner.dto.TripStatusAnalyticsDto;
import com.travelplanner.entity.Trip;
import com.travelplanner.entity.User;
import com.travelplanner.enums.TripStatus;

@Repository
public interface TripRepository extends JpaRepository<Trip, Long>, JpaSpecificationExecutor<Trip> {

    List<Trip> findByUser(User user);

    List<Trip> findByTripStatus(TripStatus tripStatus);

    Long countByTripStatus(TripStatus tripStatus);
    
	@Query("""
		       SELECT new com.travelplanner.dto.TripStatusAnalyticsDto(
		           t.tripStatus,
		           COUNT(t)
		       )
		       FROM Trip t
		       GROUP BY t.tripStatus
		       ORDER BY t.tripStatus
		       """)
		List<TripStatusAnalyticsDto> getTripStatusAnalytics();
	
	@Query("""
		       SELECT new com.travelplanner.dto.TripDestinationAnalyticsDto(
		           t.destination,
		           COUNT(t)
		       )
		       FROM Trip t
		       GROUP BY t.destination
		       ORDER BY COUNT(t) DESC
		       """)
		List<TripDestinationAnalyticsDto> getTripDestinationAnalytics();

}