package com.travelplanner.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.travelplanner.entity.Payment;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {

    Optional<Payment> findByPaymentReference(String paymentReference);

    Optional<Payment> findByTransactionId(String transactionId);

    Optional<Payment> findByBookingBookingId(Long bookingId);

    List<Payment> findByUserUserId(Long userId);

}