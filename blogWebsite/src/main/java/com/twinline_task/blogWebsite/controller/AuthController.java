package com.twinline_task.blogWebsite.controller;

import com.twinline_task.blogWebsite.DTO.LoginDTO;
import com.twinline_task.blogWebsite.DTO.SignUpDTO;
import com.twinline_task.blogWebsite.entity.User;
import com.twinline_task.blogWebsite.repository.UserRepository;
import com.twinline_task.blogWebsite.service.JwtService;
import com.twinline_task.blogWebsite.service.UserService;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {


    private UserService userService;

    private AuthController(UserService userService ){
        this.userService=userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody SignUpDTO signUpDTO){
        Map<String, String> response = userService.registerUser(signUpDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO){
        return userService.logIn(loginDTO);
    }

}
