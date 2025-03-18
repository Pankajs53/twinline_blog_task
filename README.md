# Twinline Blog Project

## Regarding the .env file, I did not remove it because there was nothing important

## Project Demo

You can watch the demo of the Twinline Blog project by following this link:  
[Twinline Blog Project Demo](https://youtu.be/X8RNPHQJSIw)

## Project Overview

The Twinline Blog project is built using Java for the backend and React for the frontend. It allows users to view, write, and edit blog posts, as well as interact with comments. The project demonstrates a seamless integration between Java-based backend APIs and the React-based frontend, offering an interactive and responsive user experience.

## Features

- **User Authentication**: Allows users to register, log in, and access their profiles.
- **Post Creation**: Users can create new blog posts with text, images, and other media.
- **Post Editing**: Authors can edit their blog posts after creation.
- **WordStats**: Users can see the top 5 words used combined all the blogs.
- **Responsive Design**: The frontend is built with React and styled to ensure it works smoothly on all devices.

## Optimization and Enhancements

While the current version of the project works well, there are several optimizations and enhancements that could improve the performance and scalability of the application.

### 1. **Using Kafka for Data Processing**

Currently, data is stored in a relational database. However, for better performance and scalability, we could have used **Apache Kafka** to handle high-throughput data streaming. Kafka would allow us to:

- Efficiently handle real-time data streams for creating and updating blog posts or comments.
- Decouple microservices, allowing for better scalability and fault tolerance in the system.
- Improve overall system performance by handling large-scale data operations asynchronously.

By integrating Kafka, the backend would be able to handle higher loads and process data streams in real-time, ensuring the application remains fast and responsive even under heavy traffic.

### 2. **API Overview**

## API Documentation

Below is the documentation for the APIs used in the Twinline Blog project.

### 1. **Get Top Words from Blog**

**Endpoint:**  
`GET http://localhost:8085/api/v1/blog/top-words`

- **Description:** Retrieves the most common words used across all blog posts.

---

### 2. **Update a Blog Post**

**Endpoint:**  
`PUT http://localhost:8085/api/v1/blog/update/{id}`

- **Description:** Updates a blog post by the given ID.
- **Request Body:**

 
  {
    "topic": "Exercise",
    "content": "Regular exercise is essential for maintaining overall health and well-being. It helps improve cardiovascular health, strengthens muscles, boosts mood, and enhances endurance. Engaging in activities such as jogging, yoga, weight training, or cycling can reduce the risk of chronic diseases like diabetes and heart disease. Aim for at least 30 minutes of moderate physical activity daily to stay fit and active."
  }

---
### 3. **Get All Blog Postst**

**Endpoint:**  
`GET http://localhost:8085/api/v1/blog/al`

---

### 4. **Delete a Blog Post**

**Endpoint:**  
`DELETE http://localhost:8085/api/v1/blog/delete/{id`

---

### 5. **Create a New Blog Post**

**Endpoint:**  
`POST http://localhost:8085/api/v1/blog/create`


 {
  "topic": "Hydration4",
  "content": "yessssss"
 }

---

 6. **User Login**

**Endpoint:**  
`POST http://localhost:8085/api/v1/auth/login`

Description: Authenticates a user and returns a JWT token.


 {
  "email": "pawanThakur@gmail.com",
  "password": "pankaj123"
 }

---

 7. **User Signup**

**Endpoint:**  
`POST http://localhost:8085/api/v1/auth/signup`

Description: Registers a new user in the system.


 {
  "userName": "Pankaj123",
  "firstName": "Pankaj",
  "lastName": "Singh",
  "email": "pankajThakur@gmail.com",
  "password": "pankaj123"
 }

These APIs interact with the database to store and retrieve data related to users, posts, and comments.

---

Conclusion
This project serves as a basic blog application, but due to time limitations, it has not been deployed or fully optimized.
While it works as expected, there are several areas for improvement, such as integrating Kafka for data handling and scaling out the application architecture. With more time, the project could be enhanced with better performance optimizations, such as caching and implementing a microservices architecture.
The provided APIs form the backbone of the application, offering a simple yet effective way to manage blog posts and comments.
