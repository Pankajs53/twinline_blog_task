package com.twinline_task.blogWebsite.service;

import com.twinline_task.blogWebsite.DTO.LoginDTO;
import com.twinline_task.blogWebsite.DTO.SignUpDTO;
import com.twinline_task.blogWebsite.entity.User;
import com.twinline_task.blogWebsite.repository.UserRepository;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;


import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    public Map<String,String> registerUser(SignUpDTO signUpDTO){
        try{
            Optional<User> existingUser = Optional.ofNullable(userRepository.findByEmail(signUpDTO.getEmail()));
            if (existingUser.isPresent()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User already exists with this email");
            }

            // Hash password
            String hashedPassword = BCrypt.hashpw(signUpDTO.getPassword(), BCrypt.gensalt());

            // Create new user using Builder
            User newUser = User.builder()
                    .userName(signUpDTO.getUserName())
                    .firstName(signUpDTO.getFirstName())
                    .email(signUpDTO.getEmail())
                    .password(hashedPassword)
                    .build();

            // Save the user
            userRepository.save(newUser);

            // Response map
            Map<String, String> response = new HashMap<>();
            response.put("message", "User registered successfully");
            response.put("email", newUser.getEmail());

            return response;
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error occurred while registering user", e);
        }
    }

    public ResponseEntity<Map<String,String>> logIn(LoginDTO loginDTO){
        // validate the email id and password
        // and generate a token and sent token
        try{
            User user=userRepository.findByEmail(loginDTO.getEmail());
            if(user==null){
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No User exist with this email");
            }

            boolean passAns=BCrypt.checkpw(loginDTO.getPassword(),user.getPassword());
            if(!passAns){
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password Does Not Match....");
            }

            String token = jwtService.generateToken(user.getId());

            // sending token in cokie because it gets safe from CSRF attack.
            ResponseCookie cookie = ResponseCookie.from("token",token)
                    .httpOnly(true)
                    .secure(true)
                    .sameSite("Strict")
                    .path("/")
                    .maxAge(7 * 24 * 60 * 60)
                    .build();
            Map<String, String> response = new HashMap<>();
            response.put("message", "Login successful");

            return ResponseEntity.ok().header("Set-Cookie",cookie.toString()).body(response);

        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,"ERROR OCCURED WHILE LOGIN...");
        }
    }

}
