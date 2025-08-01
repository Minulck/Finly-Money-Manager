package com.Minul.finly_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class FinlyBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(FinlyBackendApplication.class, args);
	}

}
