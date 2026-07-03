package com.travelplanner.service;

import java.util.List;

import com.travelplanner.entity.Role;

public interface RoleService {

    Role saveRole(Role role);

    Role getRoleById(Long roleId);

    List<Role> getAllRoles();

    Role updateRole(Long roleId, Role role);

    void deleteRole(Long roleId);

}