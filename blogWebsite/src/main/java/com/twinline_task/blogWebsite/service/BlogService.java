package com.twinline_task.blogWebsite.service;

import com.twinline_task.blogWebsite.DTO.BlogDTO;
import com.twinline_task.blogWebsite.DTO.BlogDTOResponse;
import com.twinline_task.blogWebsite.entity.Blog;
import com.twinline_task.blogWebsite.entity.User;
import com.twinline_task.blogWebsite.repository.BlogRepository;
import com.twinline_task.blogWebsite.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.stream.Collectors;

@Component
public class BlogService {
    @Autowired
    private BlogRepository blogRepository;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserRepository userRepository;

    public Long getUserId(HttpServletRequest request){
        String token = JwtService.extractTokenFromCokie(request);
        if (token == null) {
            throw new RuntimeException("Token not found");
        }
        // store the token first and then pass token to extract userId
        return Long.parseLong(jwtService.extractUserId(token));
    }

    // create blog
    public Blog createBlog(BlogDTO blogDTO, HttpServletRequest request){
        try {
            Long userId = getUserId(request);
            User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User Not Found"));

            Blog newBlog = Blog.builder()
                    .topic(blogDTO.getTopic())
                    .content(blogDTO.getContent())
                    .user(user)
                    .build();

            return blogRepository.save(newBlog);
        }catch (Exception e){
            throw new RuntimeException("Error while creating blog", e);
        }
    }

    // delete blog
    public void deleteBlog(Long blogId, HttpServletRequest request){
        try{
            Long userId = getUserId(request);
            Blog blog = blogRepository.findById(blogId)
                    .orElseThrow(() -> new RuntimeException("Blog not found."));

            // only the owner of this blog should be able to delete it
            if (!blog.getUser().getId().equals(userId)) {
                throw new RuntimeException("Unauthorized: You can only delete your own blogs.");
            }

            blogRepository.deleteById(blogId);
        } catch (Exception e) {
            throw new RuntimeException("Error in deleting the blog....",e);
        }
    }

    // update blog
    public Blog updateBlog(Long blogId, BlogDTO blogDTO, HttpServletRequest request){
        try{
            Long userId = getUserId(request);
            Blog existingBlog = blogRepository.findById(blogId)
                    .orElseThrow(() -> new RuntimeException("Blog Not Found"));

            if (!existingBlog.getUser().getId().equals(userId)) {
                throw new RuntimeException("Unauthorized to update this blog!");
            }

            existingBlog.setTopic(blogDTO.getTopic());
            existingBlog.setContent(blogDTO.getContent());

            return blogRepository.save(existingBlog);

        }catch (Exception e){
            throw new RuntimeException("Error while updating blog", e);
        }
    }

    // get all blogs
    public List<BlogDTOResponse> getAllBlogs(HttpServletRequest request) {
        try {
            Long userId = getUserId(request);

            List<Blog> userBlogs = blogRepository.findByUserId(userId);

            if (userBlogs.isEmpty()) {
                return Collections.emptyList();
            }

            return userBlogs.stream().map(blog -> new BlogDTOResponse(blog.getId(),blog.getTopic(), blog.getContent())).collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Error fetching user blogs", e);
        }
    }


    // lets create the function to get top 5 used words combine in all
    public List<Map.Entry<String, Integer>> getTopFiveUsedFrequentWordCombined(HttpServletRequest request){
        try{
            String token = JwtService.extractTokenFromCokie(request);
            if (token == null) {
                throw new RuntimeException("Authorization Token not found...");
            }

            Long userId = Long.parseLong(jwtService.extractUserId(token));

            List<Blog> userBlogs = blogRepository.findByUserId(userId);

            String allData =  userBlogs.stream().map(blog -> blog.getContent()).collect(Collectors.joining(" "));
            // make all the words in capital to track frequency correctly
            String [] words = allData.toLowerCase().split("\\W+");

            //store the data in map with it frequency
            Map<String,Integer> wordCount = new HashMap<>();
            for(String currWord: words){
                if(wordCount.containsKey(currWord)){
                    int count = wordCount.get(currWord);
                    count++;
                    wordCount.put(currWord,count);
                }else{
                    wordCount.put(currWord,1);
                }
            }

            // once we have data stored in hashmap we will use
            // type of queue known as PriortyQueue which keeps the values in front according to priority it can be desc asc.
            // we can use max-heap in this case

            // Imp: Not using max-Heap because we will have to hold size of 0(n). In our case max size is 0(5) using min-Heap
            PriorityQueue<Map.Entry<String, Integer>> pq = new PriorityQueue<>(Comparator.comparingInt(Map.Entry::getValue));

            for (Map.Entry<String, Integer> entry : wordCount.entrySet()) {
                pq.offer(entry);
                if (pq.size() > 5) {
                    pq.poll(); // Remove the smallest frequency word
                }
            }

            List<Map.Entry<String, Integer>> topWords = new ArrayList<>(pq);
            topWords.sort((a, b) -> b.getValue() - a.getValue());
            return topWords;

        } catch (Exception e) {
            System.err.println("Error in getTopFiveUsedFrequentWordCombined: " + e.getMessage());
            throw new RuntimeException(e);
        }

    }
}
