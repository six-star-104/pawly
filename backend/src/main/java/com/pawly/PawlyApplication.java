package com.pawly;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class PawlyApplication {

	public static void main(String[] args) {
		SpringApplication.run(PawlyApplication.class, args);
	}

}
