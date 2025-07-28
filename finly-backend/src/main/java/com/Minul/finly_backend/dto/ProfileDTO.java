package com.Minul.finly_backend.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ProfileDTO {

    private long id;
    private String fullName;
    private String email;
    private String password;
    private String profileImage;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
