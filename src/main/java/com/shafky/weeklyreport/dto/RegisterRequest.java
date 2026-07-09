package com.shafky.weeklyreport.dto;

import com.shafky.weeklyreport.enums.Role;
import lombok.Data;

@Data
public class RegisterRequest {
    private String name;
    private String email;
    private String password;
    private Role role;
}