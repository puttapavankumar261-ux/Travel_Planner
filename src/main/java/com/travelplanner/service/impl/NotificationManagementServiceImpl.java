package com.travelplanner.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.travelplanner.dto.NotificationRequestDto;
import com.travelplanner.dto.NotificationResponseDto;
import com.travelplanner.entity.Notification;
import com.travelplanner.entity.User;
import com.travelplanner.mapper.NotificationMapper;
import com.travelplanner.repo.NotificationRepository;
import com.travelplanner.repo.UserRepository;
import com.travelplanner.service.NotificationManagementService;
import com.travelplanner.enums.NotificationRecipientType;
import com.travelplanner.enums.ReferenceType;
import com.travelplanner.enums.NotificationAction;
import com.travelplanner.enums.NotificationModule;
import com.travelplanner.enums.NotificationPriority;
import com.travelplanner.exception.NotificationNotFoundException;
import com.travelplanner.exception.UserNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class NotificationManagementServiceImpl implements NotificationManagementService {

	private final NotificationRepository notificationRepository;
	private final UserRepository userRepository;
	private final NotificationMapper notificationMapper;
	private static final Logger logger =
	        LoggerFactory.getLogger(NotificationManagementServiceImpl.class);
	private User getUser(Long userId) {

		return userRepository.findById(userId)
				.orElseThrow(() ->
				new UserNotFoundException(
						"User not found with ID : " + userId));
	}
	private Notification getNotification(Long notificationId) {

		return notificationRepository.findById(notificationId)
				.orElseThrow(() ->
				new NotificationNotFoundException(
						"Notification not found with ID : " + notificationId));
	}
	@Override
	public NotificationResponseDto createNotification(NotificationRequestDto requestDto) {

	    logger.info("Creating notification: {}", requestDto.getTitle());

	    User performedBy = getUser(requestDto.getPerformedByUserId());

	    User recipientUser = null;

	    if (requestDto.getRecipientUserId() != null) {
	        recipientUser = getUser(requestDto.getRecipientUserId());
	    }

	    Notification notification = new Notification();

	    notification.setTitle(requestDto.getTitle());
	    notification.setMessage(requestDto.getMessage());

	    notification.setModule(requestDto.getModule());
	    notification.setAction(requestDto.getAction());

	    notification.setPriority(requestDto.getPriority());
	    notification.setRecipientType(requestDto.getRecipientType());

	    notification.setRecipientUser(recipientUser);
	    notification.setPerformedBy(performedBy);

	    notification.setReferenceType(requestDto.getReferenceType());
	    notification.setReferenceId(requestDto.getReferenceId());

	    Notification savedNotification =
	            notificationRepository.save(notification);

	    logger.info("Notification saved successfully. ID: {}",
	            savedNotification.getNotificationId());

	    return notificationMapper.toResponseDto(savedNotification);
	}

	@Override
	@Transactional(readOnly = true)
	public List<NotificationResponseDto> getUserNotifications(Long userId) {

		User user = getUser(userId);

		return notificationRepository
				.findByRecipientUserAndDeletedFalseOrderByCreatedAtDesc(user)
				.stream()
				.map(notificationMapper::toResponseDto)
				.toList();
	}

	@Override
	@Transactional(readOnly = true)
	public List<NotificationResponseDto> getUnreadNotifications(Long userId) {

		User user = getUser(userId);

		return notificationRepository
				.findByRecipientUserAndReadFalseAndDeletedFalseOrderByCreatedAtDesc(user)
				.stream()
				.map(notificationMapper::toResponseDto)
				.toList();
	}

	@Override
	@Transactional(readOnly = true)
	public long getUnreadNotificationCount(Long userId) {

		User user = getUser(userId);

		return notificationRepository
				.countByRecipientUserAndReadFalseAndDeletedFalse(user);
	}

	@Override
	public NotificationResponseDto markAsRead(Long notificationId) {

		Notification notification = getNotification(notificationId);

		notification.setRead(true);

		Notification updatedNotification =
				notificationRepository.save(notification);

		return notificationMapper.toResponseDto(updatedNotification);
	}

	@Override
	public void markAllAsRead(Long userId) {

		User user = getUser(userId);

		List<Notification> notifications =
				notificationRepository
				.findByRecipientUserAndReadFalseAndDeletedFalseOrderByCreatedAtDesc(user);

		notifications.forEach(notification ->
		notification.setRead(true));

		notificationRepository.saveAll(notifications);
	}

	@Override
	public void deleteNotification(Long notificationId) {

		Notification notification = getNotification(notificationId);

		notification.setDeleted(true);

		notificationRepository.save(notification);
	}

	@Override
	@Transactional(readOnly = true)
	public List<NotificationResponseDto> getAdminNotifications() {

		return notificationRepository
				.findByRecipientTypeAndDeletedFalseOrderByCreatedAtDesc(
						NotificationRecipientType.ADMIN)
				.stream()
				.map(notificationMapper::toResponseDto)
				.toList();
	}

	@Override
	@Transactional(readOnly = true)
	public List<NotificationResponseDto> getNotificationsByModule(NotificationModule module) {

		return notificationRepository
				.findByModuleAndDeletedFalseOrderByCreatedAtDesc(module)
				.stream()
				.map(notificationMapper::toResponseDto)
				.toList();
	}
}
