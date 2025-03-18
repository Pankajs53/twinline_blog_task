package com.twinline_task.blogWebsite.controller;

import com.twinline_task.blogWebsite.DTO.BlogDTO;
import com.twinline_task.blogWebsite.DTO.BlogDTOResponse;
import com.twinline_task.blogWebsite.entity.Blog;
import com.twinline_task.blogWebsite.service.BlogService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/blog")
public class BlogController {
    @Autowired
    private BlogService blogService;

    @PostMapping("/create")
    public ResponseEntity<?> addBlog(@RequestBody BlogDTO blogDTO, HttpServletRequest request){
        try {
            Blog createdBlog = blogService.createBlog(blogDTO, request);
            BlogDTOResponse blogDTOResponse = BlogDTOResponse.builder()
                    .blogId(createdBlog.getId())
                    .topic(createdBlog.getTopic())
                    .content(blogDTO.getContent())
                    .build();
            Map<String,BlogDTOResponse> response = new HashMap<>();
            response.put("Created Blog",blogDTOResponse);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (Exception e) {
            Map<String,String> response = new HashMap<>();
            response.put("Error while creating Blog",e.getMessage());
            return new ResponseEntity<>(response,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete/{blogId}")
    public ResponseEntity<?> deleteBlog(@PathVariable Long blogId, HttpServletRequest request){
        try{
            blogService.deleteBlog(blogId, request);
            return new ResponseEntity<>("Deleted the Blog...",HttpStatus.OK);
        }catch (Exception e){
            Map<String,String> response = new HashMap<>();
            response.put("Error deleting the blog",e.getMessage());
            return new ResponseEntity<>(response,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<BlogDTOResponse>> getAllBlog(HttpServletRequest request){
        try{
            List<BlogDTOResponse> userBlog = blogService.getAllBlogs(request);
            return new ResponseEntity<>(userBlog,HttpStatus.OK);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    // update blogs
    @PutMapping("/update/{blogId}")
    public ResponseEntity<?> updateBlog(@PathVariable Long blogId, @RequestBody BlogDTO blogDTO,HttpServletRequest request){
        try{
            Blog updatedBlog = blogService.updateBlog(blogId, blogDTO, request);
            return new ResponseEntity<>("Blog updated sucess....",HttpStatus.OK);
        }catch (Exception e){
            Map<String,String> response = new HashMap<>();
            response.put("Error deleting the blog",e.getMessage());
            return new ResponseEntity<>(response,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // top 5 words
    @GetMapping("/top-words")
    public ResponseEntity<?> getTopFiveUsedWords(HttpServletRequest request){
        try {
            List<Map.Entry<String, Integer>> topWords = blogService.getTopFiveUsedFrequentWordCombined(request);

            if (topWords.isEmpty()) {
                return ResponseEntity.ok(Map.of("message", "No words found in blogs."));
            }

            return ResponseEntity.ok(Map.of("topWords", topWords));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }
}