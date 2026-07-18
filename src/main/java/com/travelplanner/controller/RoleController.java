package com.travelplanner.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.travelplanner.common.ApiResponse;
import com.travelplanner.common.ApiResponseUtil;
import com.travelplanner.common.constants.ApiMessages;
import com.travelplanner.entity.Role;
import com.travelplanner.service.RoleService;

@RestController
@RequestMapping("/api/roles")
public class RoleController {

    private final RoleService roleService;

    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    // Create Role
    @PostMapping
    public ResponseEntity<ApiResponse<Role>> saveRole(
            @RequestBody Role role) {

        Role response = roleService.saveRole(role);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponseUtil.success(
                		ApiMessages.ROLE_CREATED,
                        response));
    }

    // Get All Roles
    @GetMapping
    public ResponseEntity<ApiResponse<List<Role>>> getAllRoles() {

        List<Role> response = roleService.getAllRoles();

        return ResponseEntity.ok(
                ApiResponseUtil.success(
                        "Roles Retrieved Successfully",
                        response));
    }

    // Get Role By Id
    @GetMapping("/{roleId}")
    public ResponseEntity<ApiResponse<Role>> getRoleById(
            @PathVariable Long roleId) {

        Role response = roleService.getRoleById(roleId);

        return ResponseEntity.ok(
                ApiResponseUtil.success(
                        "Role Retrieved Successfully",
                        response));
    }

    // Update Role
    @PutMapping("/{roleId}")
    public ResponseEntity<ApiResponse<Role>> updateRole(
            @PathVariable Long roleId,
            @RequestBody Role role) {

        Role response = roleService.updateRole(roleId, role);

        return ResponseEntity.ok(
                ApiResponseUtil.success(
                		ApiMessages.ROLE_UPDATED,
                        response));
    }

    // Delete Role
    @DeleteMapping("/{roleId}")
    public ResponseEntity<ApiResponse<String>> deleteRole(
            @PathVariable Long roleId) {

        roleService.deleteRole(roleId);

        return ResponseEntity.ok(
                ApiResponseUtil.success(
                		ApiMessages.ROLE_DELETED,
                        null));
    }

}