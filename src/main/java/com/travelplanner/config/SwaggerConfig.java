package com.travelplanner.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI travelPlannerOpenAPI() {

        return new OpenAPI()
                .info(new Info()
                        .title("Travel Planner REST API")
                        .description("REST APIs for Travel Planner Application")
                        .version("1.0")
                        .contact(new Contact()
                                .name("Pavan")
                                .email("your-email@example.com"))
                        .license(new License()
                                .name("Apache 2.0")));
    }
}