package com.Minul.finly_backend.control;

import java.util.Map;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;

import com.Minul.finly_backend.dto.AuthDTO;
import com.Minul.finly_backend.dto.ProfileDTO;
import com.Minul.finly_backend.service.ProfileService;

import lombok.RequiredArgsConstructor;

@Slf4j
@RestController
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;
    @PostMapping("/register")
    public ResponseEntity<?> registerProfile( @RequestBody ProfileDTO profileDTO) {

        if (profileService.isEmailRegistered(profileDTO)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(
                    "Email is already registered. Please use a different email."
            );
        }
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

            if(!profileService.isEmailRegistered(authDTO.getEmail())){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        Map.of("message", "Email not registered. Please register first."));
            }
            if(!profileService.isAccountActive(authDTO.getEmail())){
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(
                        Map.of("message", "Account is not active. Please activate your account first."));
            }
            else{
                Map<String,Object> response = profileService.authenticationAndGenerateToken(authDTO);
                return ResponseEntity.status(HttpStatus.CREATED).body(response);
            }
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    Map.of("message", "Login failed. Invalid password"));
        }
    }

    @GetMapping("/profile")
    public ResponseEntity<ProfileDTO> getProfile(){
        ProfileDTO profile = profileService.getPublicProfile(null);
        return ResponseEntity.ok(profile);
    }

    @PutMapping("/profile")
    public ResponseEntity<ProfileDTO> updateProfile(@RequestBody ProfileDTO profileDTO) {
        ProfileDTO updatedProfile = profileService.updateProfile(profileDTO);
        if (updatedProfile == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.status(HttpStatus.OK).body(updatedProfile);
    }

    @PutMapping("/profile/password")
    public ResponseEntity<?> updatePassword(@RequestBody Map<String, String> passwordData) {
        log.info("Updating password for user: {}", passwordData.get("currentPassword"));
        log.info("New password: {}", passwordData.get("newPassword"));
        try {
            String newPassword = passwordData.get("newPassword");
            String currentPassword = passwordData.get("currentPassword");
            profileService.updatePassword(newPassword, currentPassword);
            return ResponseEntity.status(HttpStatus.OK).body("Password updated successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Password update failed. " + e.getMessage());
        }
    }

    @PostMapping("/reset-email")
    public ResponseEntity<?> resetEmail(@RequestBody Map<String, String> emailData) {
        log.info("Sending password reset email to: {}", emailData.get("email"));
        log.info("Reset code: {}", emailData.get("code"));
       try{
           profileService.sendResetEmail(emailData.get("email"), emailData.get("code"));
              return ResponseEntity.status(HttpStatus.OK).body("Reset email sent successfully.");
       }catch(Exception e){
           log.error("Error sending reset email: {}", e.getMessage());
           return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());

        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        log.info("Resetting password for email: {}", email);
        try {
            profileService.resetPassword(email);
            return ResponseEntity.status(HttpStatus.OK).body("Password reset successfully. Please check your email");
        } catch (Exception e) {
            log.error("Error resetting password: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Password reset failed. " + e.getMessage());
        }
    }
}
