package com.pawly;

import org.springframework.boot.SpringApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
@EnableScheduling
public class PawlyApplication {

	public static void main(String[] args) {
		SpringApplication.run(PawlyApplication.class, args);
	}

}
