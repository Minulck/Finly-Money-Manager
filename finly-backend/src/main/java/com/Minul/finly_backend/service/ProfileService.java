package com.Minul.finly_backend.service;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.Minul.finly_backend.dto.AuthDTO;
import com.Minul.finly_backend.dto.ProfileDTO;
import com.Minul.finly_backend.entity.ProfileEntity;
import com.Minul.finly_backend.repository.ProfileRepository;
import com.Minul.finly_backend.util.JwtUtil;
import lombok.extern.slf4j.Slf4j;
import lombok.RequiredArgsConstructor;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    @Value("${finly.activation.link}")
    String activationURL;

    public boolean isEmailRegistered(ProfileDTO profileDTO) {
        return profileRepository.findByEmail(profileDTO.getEmail()).isPresent();
    }

    public boolean isEmailRegistered(String email) {
        return profileRepository.findByEmail((email)).isPresent();
    }

    public ProfileDTO registerProfile (ProfileDTO profileDTO){
        ProfileEntity newProfile = toEntity(profileDTO);
        log.info("Profile details: {}", newProfile);

        newProfile.setActivationToken(UUID.randomUUID().toString());
        newProfile = profileRepository.save(newProfile);

        String activationLink = activationURL +"/api/v1.0/activate?token=" + newProfile.getActivationToken();
        String subject = "Activate your Finly account";
        String body = "Click the link below to activate your account:\n" + activationLink;

        System.out.println("Sending mail to " + newProfile.getEmail());
        emailService.sendMail(
                newProfile.getEmail(),
                subject,
                body);
        System.out.println("Mail sent (or attempted).");

        return toDTO(newProfile);
    }

    public ProfileEntity toEntity(ProfileDTO profileDTO) {
        return ProfileEntity.builder()
                .id(profileDTO.getId())
                .fullName(profileDTO.getFullName())
                .email(profileDTO.getEmail())
                .password(passwordEncoder.encode(profileDTO.getPassword()))
                .profileImage(profileDTO.getProfileImage())
                .createdAt(profileDTO.getCreatedAt())
                .updatedAt(profileDTO.getUpdatedAt())
                .build();
    }

    public ProfileDTO toDTO(ProfileEntity profileEntity) {
        return ProfileDTO.builder()
                .id(profileEntity.getId())
                .fullName(profileEntity.getFullName())
                .email(profileEntity.getEmail())
                .profileImage(profileEntity.getProfileImage())
                .createdAt(profileEntity.getCreatedAt())
                .updatedAt(profileEntity.getUpdatedAt())
                .build();
    }

    public ProfileDTO updateProfile(ProfileDTO profileDTO) {
        ProfileEntity currentProfile = getCurrentProfile();

        currentProfile.setFullName(profileDTO.getFullName());
        currentProfile.setProfileImage(profileDTO.getProfileImage());

        ProfileEntity updatedProfile = profileRepository.save(currentProfile);

        return toDTO(updatedProfile);
    }

    public void updatePassword(String newPassword, String currentPassword) {
        if (newPassword == null || newPassword.isEmpty()) {
            throw new IllegalArgumentException("New password cannot be null or empty");
        }
        try {
            ProfileEntity currentProfile = getCurrentProfile();

            log.info("Current password: {}", currentPassword);
            log.info("New password: {}", newPassword);
            log.info("Current profile password: {}", currentProfile.getPassword());

            if (!passwordEncoder.matches(currentPassword, currentProfile.getPassword())) {
                throw new RuntimeException("Current password is incorrect");
            }


            currentProfile.setPassword(passwordEncoder.encode(newPassword));
            profileRepository.save(currentProfile);
        }catch (Exception e) {
            throw new RuntimeException("Current password is incorrect");
        }
    }

    public boolean activateProfile(String activationToken){

        return profileRepository.findByActivationToken(activationToken)
                .map(profile->{
                    profile.setIsActive(true);
                    profileRepository.save(profile);
                    return true;
                })
                .orElse(false);
    }

    public boolean  isAccountActive (String email){

        return profileRepository.findByEmail(email)
                .map(ProfileEntity::getIsActive)
                .orElse(false);
    }

    public ProfileEntity getCurrentProfile(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return profileRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("Profile not found"));
    }

    public ProfileDTO getPublicProfile(String email){
        ProfileEntity current;
        if(email==null){
            current = getCurrentProfile();
        }
        else{
            current = profileRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Profile not found"));
        }
        return ProfileDTO.builder()
                .id(current.getId())
                .fullName(current.getFullName())
                .email(current.getEmail())
                .profileImage(current.getProfileImage())
                .createdAt(current.getCreatedAt())
                .updatedAt(current.getUpdatedAt())
                .build();
    }

    public Map<String, Object> authenticationAndGenerateToken(AuthDTO authDTO) {
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken((authDTO.getEmail()), authDTO.getPassword()));
            String token = jwtUtil.generateToken(authDTO.getEmail());
            return Map.of(
                    "token",token,
                    "user" , getPublicProfile(authDTO.getEmail())
            );
        }
        catch(Exception e){
            throw new RuntimeException("Login failed. Invalid password");
        }
    }

    public void sendResetEmail(String email,String code) {
        log.info("Sending password reset email to: {}", email);
        log.info("Reset code: {}", code);
        if (email == null || email.isEmpty()) {
            throw new IllegalArgumentException("Email cannot be null or empty");
        }

        if (!isEmailRegistered(email)) {
            throw new RuntimeException("Email not registered");
        }
            String body = """
                    <p>Dear User,</p>
                    <p>We received a request to reset your password. If you did not make this request, please ignore this email.</p>
                    <p>To reset your password, please use the following code:</p>
                    <p><strong>%s</strong></p>
                    <p>If you did not request a password reset, please contact our support team immediately.</p>
                    <p>Thank you for using our service!</p>
                    <p>Best regards,</p>
                    <p>Finly Team</p>
                    """.formatted(code);
            emailService.sendMail(
                    email,
                    "Password Reset Request - Finly",
                    body
            );
    }

    public void resetPassword(String email){
        String newPassword = UUID.randomUUID().toString().substring(0, 8);
        log.info("Resetting password for email: {}", email);

        ProfileEntity profile = profileRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Email not registered"));

        profile.setPassword(passwordEncoder.encode(newPassword));
        profileRepository.save(profile);
        String body = """
                <p>Dear User,</p>
                <p>Your password has been reset successfully. Your new password is:</p>
                <p><strong>%s</strong></p>
                <p>Please log in with this new password and change it to something more secure.</p>
                <p>If you did not request a password reset, please contact our support team immediately.</p>
                <p>Thank you for using our service!</p>
                <p>Best regards,</p>
                <p>Finly Team</p>
                """.formatted(newPassword);
        emailService.sendMail(
                email,
                "Password Reset Confirmation - Finly",
                body
        );
    }

}
