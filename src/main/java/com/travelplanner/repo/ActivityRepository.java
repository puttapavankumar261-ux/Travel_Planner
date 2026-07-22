package com.travelplanner.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.travelplanner.entity.Activity;
import com.travelplanner.entity.Trip;
import com.travelplanner.enums.ActivityStatus;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, Long>,
JpaSpecificationExecutor<Activity> {

List<Activity> findByTrip(Trip trip);

long countByTrip(Trip trip);

long countByTripAndActivityStatus(
    Trip trip,
    ActivityStatus activityStatus);

Long countByActivityStatus(ActivityStatus planned);

// NEW
List<Activity> findByTripTripId(Long tripId);
}