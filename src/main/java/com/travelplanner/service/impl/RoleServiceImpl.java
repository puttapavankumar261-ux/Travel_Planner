package com.travelplanner.service.impl;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.travelplanner.entity.Role;
import com.travelplanner.exception.RoleAlreadyExistsException;
import com.travelplanner.exception.RoleNotFoundException;
import com.travelplanner.repo.RoleRepository;
import com.travelplanner.service.RoleService;

@Service
public class RoleServiceImpl implements RoleService {

    private static final Logger logger =
            LoggerFactory.getLogger(RoleServiceImpl.class);

    private final RoleRepository roleRepo;

    public RoleServiceImpl(RoleRepository roleRepo) {
        this.roleRepo = roleRepo;
    }

    @Override
    public Role saveRole(Role role) {

        logger.info("Creating role: {}", role.getRoleName());

        if (roleRepo.findByRoleName(role.getRoleName()).isPresent()) {

            logger.warn("Role already exists: {}", role.getRoleName());

            throw new RoleAlreadyExistsException(
                    "Role " + role.getRoleName() + " already exists.");
        }

        Role savedRole = roleRepo.save(role);

        logger.info("Role created successfully with ID: {}",
                savedRole.getRoleId());

        return savedRole;
    }

    @Override
    public Role getRoleById(Long roleId) {

        logger.info("Fetching role with ID: {}", roleId);

        return roleRepo.findById(roleId)
                .orElseThrow(() -> {

                    logger.warn("Role not found with ID: {}", roleId);

                    return new RoleNotFoundException(
                            "Role not found with ID : " + roleId);
                });
    }

    @Override
    public List<Role> getAllRoles() {

        logger.info("Fetching all roles.");

        List<Role> roles = roleRepo.findAll();

        logger.info("Retrieved {} role(s).", roles.size());

        return roles;
    }

    @Override
    public Role updateRole(Long roleId, Role role) {

        logger.info("Updating role with ID: {}", roleId);

        Role existingRole = roleRepo.findById(roleId)
                .orElseThrow(() -> {

                    logger.warn("Role not found with ID: {}", roleId);

                    return new RoleNotFoundException(
                            "Role not found with ID : " + roleId);
                });

        existingRole.setRoleName(role.getRoleName());
        existingRole.setDescription(role.getDescription());

        Role updatedRole = roleRepo.save(existingRole);

        logger.info("Role updated successfully with ID: {}", roleId);

        return updatedRole;
    }

    @Override
    public void deleteRole(Long roleId) {

        logger.info("Deleting role with ID: {}", roleId);

        Role existingRole = roleRepo.findById(roleId)
                .orElseThrow(() -> {

                    logger.warn("Role not found with ID: {}", roleId);

                    return new RoleNotFoundException(
                            "Role not found with ID : " + roleId);
                });

        roleRepo.delete(existingRole);

        logger.info("Role deleted successfully with ID: {}", roleId);
    }
}