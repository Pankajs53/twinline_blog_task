package com.twinline_task.blogWebsite.repository;

import com.twinline_task.blogWebsite.entity.Blog;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlogRepository extends CrudRepository<Blog,Long> {
    List<Blog> findByUserId(Long userId);
}
