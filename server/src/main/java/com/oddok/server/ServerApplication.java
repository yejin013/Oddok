package com.oddok.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

import javax.annotation.PostConstruct;
import java.util.TimeZone;

@SpringBootApplication
@EnableScheduling
public class ServerApplication {
    
	@PostConstruct
        public void initTimeZone(){
		TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));
	}


    	public static void main(String[] args) {
        	SpringApplication.run(ServerApplication.class, args);
    	}	

}
