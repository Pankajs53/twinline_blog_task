package com.twinline_task.blogWebsite.repository;

import com.twinline_task.blogWebsite.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User,Long> {

    User findByEmail(String email);

}
