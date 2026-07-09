package com.shafky.weeklyreport.config;

import com.shafky.weeklyreport.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable())

                .cors(cors -> {
                })

                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                .authorizeHttpRequests(auth -> auth

                        // Authentication
                        .requestMatchers("/api/auth/**").permitAll()

                        // Manager Dashboard
                        .requestMatchers("/api/dashboard/**").hasRole("MANAGER")

                        // AI Assistant
                        .requestMatchers("/api/ai/**").hasRole("MANAGER")

                        // Assignment Management
                        .requestMatchers("/api/assignments", "/api/assignments/**").hasRole("MANAGER")

                        .requestMatchers("/api/profile/**").authenticated()

                        // Users
                        .requestMatchers(HttpMethod.GET, "/api/users/**")
                        .hasRole("MANAGER")

                        // Member Assigned Projects
                        .requestMatchers(HttpMethod.GET, "/api/projects/my")
                        .authenticated()

                        // View Projects
                        .requestMatchers(HttpMethod.GET, "/api/projects/**")
                        .authenticated()

                        // Create Project
                        .requestMatchers(HttpMethod.POST, "/api/projects/**")
                        .hasRole("MANAGER")

                        // Update Project
                        .requestMatchers(HttpMethod.PUT, "/api/projects/**")
                        .hasRole("MANAGER")

                        // Delete Project
                        .requestMatchers(HttpMethod.DELETE, "/api/projects/**")
                        .hasRole("MANAGER")

                        // Everything else
                        .anyRequest()
                        .authenticated()

                )

                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration
    ) throws Exception {

        return configuration.getAuthenticationManager();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(List.of(
                "http://localhost:5173",
                "http://localhost:5174"
        ));

        configuration.setAllowedMethods(List.of(
                "GET",
                "POST",
                "PUT",
                "DELETE",
                "OPTIONS"
        ));

        configuration.setAllowedHeaders(List.of("*"));

        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}