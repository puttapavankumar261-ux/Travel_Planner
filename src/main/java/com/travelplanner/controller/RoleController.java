package com.travelplanner.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.travelplanner.entity.Role;
import com.travelplanner.service.RoleService;

@RestController
@RequestMapping("/api/roles")
public class RoleController {

    private final RoleService roleService;

    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    @PostMapping
    public ResponseEntity<Role> saveRole(@RequestBody Role role) {

        return new ResponseEntity<>(roleService.saveRole(role), HttpStatus.CREATED);

    }

    @GetMapping
    public ResponseEntity<List<Role>> getAllRoles() {

        return ResponseEntity.ok(roleService.getAllRoles());

    }

    @GetMapping("/{roleId}")
    public ResponseEntity<Role> getRoleById(@PathVariable Long roleId) {

        return ResponseEntity.ok(roleService.getRoleById(roleId));

    }

    @PutMapping("/{roleId}")
    public ResponseEntity<Role> updateRole(@PathVariable Long roleId,
                                           @RequestBody Role role) {

        return ResponseEntity.ok(roleService.updateRole(roleId, role));

    }

    @DeleteMapping("/{roleId}")
    public ResponseEntity<String> deleteRole(@PathVariable Long roleId) {

        roleService.deleteRole(roleId);

        return ResponseEntity.ok("Role deleted successfully.");

    }

}