package com.shafky.weeklyreport.service;

import com.shafky.weeklyreport.dto.*;

public interface AuthService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
}