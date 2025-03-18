package com.twinline_task.blogWebsite.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Builder
public class BlogDTO {

    @NotBlank(message = "Topic Cannot be Empty")
    private String topic;

    @NotBlank(message = "Content of a topic cannot be empty")
    private String content;
}
