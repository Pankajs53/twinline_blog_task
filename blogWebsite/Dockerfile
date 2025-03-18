# Use OpenJDK 17 image
FROM openjdk:21-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the JAR file into the container
COPY target/blogWebsite-0.0.1-SNAPSHOT.jar /app


# Expose the port (default Spring Boot port is 8080)
EXPOSE 8089

# Run the JAR file
ENTRYPOINT ["java", "-jar", "blogWebsite-0.0.1-SNAPSHOT.jar"]
