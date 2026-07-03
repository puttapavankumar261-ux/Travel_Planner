package com.travelplanner.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.travelplanner.entity.Role;
import com.travelplanner.exception.RoleAlreadyExistsException;
import com.travelplanner.exception.RoleNotFoundException;
import com.travelplanner.repo.RoleRepository;
import com.travelplanner.service.RoleService;

@Service
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepo;

    public RoleServiceImpl(RoleRepository roleRepo) {
        this.roleRepo = roleRepo;
    }

    @Override
    public Role saveRole(Role role) {

        if (roleRepo.findByRoleName(role.getRoleName()).isPresent()) {
            throw new RoleAlreadyExistsException(
                    "Role " + role.getRoleName() + " already exists.");
        }

        return roleRepo.save(role);
    }

    @Override
    public Role getRoleById(Long roleId) {

        return roleRepo.findById(roleId)
                .orElseThrow(() ->
                        new RoleNotFoundException("Role not found with ID : " + roleId));
    }

    @Override
    public List<Role> getAllRoles() {

        return roleRepo.findAll();
    }

    @Override
    public Role updateRole(Long roleId, Role role) {

        Role existingRole = roleRepo.findById(roleId)
                .orElseThrow(() ->
                        new RoleNotFoundException("Role not found with ID : " + roleId));

        existingRole.setRoleName(role.getRoleName());
        existingRole.setDescription(role.getDescription());

        return roleRepo.save(existingRole);
    }

    @Override
    public void deleteRole(Long roleId) {

        Role existingRole = roleRepo.findById(roleId)
                .orElseThrow(() ->
                        new RoleNotFoundException("Role not found with ID : " + roleId));

        roleRepo.delete(existingRole);
    }

}