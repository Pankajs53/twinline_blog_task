package com.twinline_task.blogWebsite.DTO;

import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BlogDTOResponse {
    private Long blogId;
    private String topic;
    @Lob
    private String content;
}
