package com.travelplanner.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.travelplanner.entity.Role;
import com.travelplanner.entity.User;
import com.travelplanner.enums.Gender;
import com.travelplanner.enums.LoginProvider;
import com.travelplanner.enums.RoleName;
import com.travelplanner.repo.RoleRepository;
import com.travelplanner.repo.UserRepository;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;

    public DataInitializer(RoleRepository roleRepository,
                           UserRepository userRepository) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        createRoles();
        createAdmin();
    }

    private void createRoles() {

        if (roleRepository.findByRoleName(RoleName.ADMIN).isEmpty()) {

            Role adminRole = new Role();
            adminRole.setRoleName(RoleName.ADMIN);
            adminRole.setDescription("System Administrator");

            roleRepository.save(adminRole);

            logger.info("ADMIN role created successfully.");
        }

        if (roleRepository.findByRoleName(RoleName.USER).isEmpty()) {

            Role userRole = new Role();
            userRole.setRoleName(RoleName.USER);
            userRole.setDescription("Application User");

            roleRepository.save(userRole);

            logger.info("USER role created successfully.");
        }
    }

    private void createAdmin() {

        if (userRepository.findByEmail("admin@travelplanner.com").isPresent()) {
            logger.info("Default Admin already exists.");
            return;
        }

        Role adminRole = roleRepository
                .findByRoleName(RoleName.ADMIN)
                .orElseThrow(() -> new RuntimeException("ADMIN role not found"));

        User admin = new User();

        admin.setFirstName("System");
        admin.setLastName("Administrator");
        admin.setEmail("admin@travelplanner.com");
        admin.setPassword("admin123");
        admin.setMobileNumber("9999999999");
        admin.setGender(Gender.MALE);
        admin.setCountry("India");
        admin.setPreferredCurrency("INR");
        admin.setPreferredLanguage("English");
        admin.setRole(adminRole);
        admin.setAccountVerified(true);
        admin.setAccountEnabled(true);
        admin.setAccountLocked(false);
        admin.setLoginProvider(LoginProvider.LOCAL);

        userRepository.save(admin);

        logger.info("Default Admin created successfully.");
    }
}	