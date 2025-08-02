package com.Minul.finly_backend.control;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.Minul.finly_backend.dto.AuthDTO;
import com.Minul.finly_backend.dto.ProfileDTO;
import com.Minul.finly_backend.service.ProfileService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;
    @PostMapping("/register")
    public ResponseEntity<ProfileDTO> registerProfile( @RequestBody ProfileDTO profileDTO) {
        ProfileDTO registeredProfile = profileService.registerProfile(profileDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(registeredProfile);
    }

    @GetMapping("/activate")
    public ResponseEntity<String> activateProfile(@RequestParam String token) {
        Boolean isActivated = profileService.activateProfile(token);
        if (isActivated) {
            return ResponseEntity.ok("Profile activated successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Activation token not found or already used.");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String , Object>> login(@RequestBody AuthDTO authDTO){
        try{
            if(!profileService.isAccountActive(authDTO.getEmail())){
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(
                        Map.of("message", "Account is not active or Account is not a  registered One. Please try again."));
            }
            else{
               try{
                   Map<String,Object> response = profileService.authenticationAndGenerateToken(authDTO);
                   return ResponseEntity.status(HttpStatus.CREATED).body(response);
               }
               catch (Exception e) {
                   return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                           Map.of("message", "Invalid email or password. Please try again."));
               }
            }
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    Map.of("message", "Login failed. Please check your credentials."));
        }
    }

    @GetMapping("/test")
    public String test(){
        return "Test successful!";
    }

}
