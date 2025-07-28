package com.Minul.finly_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.Minul.finly_backend.entity.ProfileEntity;
import java.util.Optional;

public interface ProfileRepository extends JpaRepository<ProfileEntity, Long> {

    Optional <ProfileEntity> findByEmail(String email);
}
