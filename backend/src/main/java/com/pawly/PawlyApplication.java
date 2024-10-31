package com.pawly;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class PawlyApplication {

	public static void main(String[] args) {
		SpringApplication.run(PawlyApplication.class, args);
	}

}
