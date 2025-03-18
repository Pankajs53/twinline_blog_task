package com.twinline_task.blogWebsite;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BlogWebsiteApplication {

	public static void main(String[] args) {
		SpringApplication.run(BlogWebsiteApplication.class, args);
		System.out.println("Working Fine....");
	}

}
