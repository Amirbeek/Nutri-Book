package org.example.nutribookbe;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class NutribookBeApplication {

	public static void main(String[] args) {
		SpringApplication.run(NutribookBeApplication.class, args);
	}

}
