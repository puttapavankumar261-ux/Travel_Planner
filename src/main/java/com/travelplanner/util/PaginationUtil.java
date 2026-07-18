package com.travelplanner.util;

import org.springframework.data.domain.Page;
import com.travelplanner.dto.PageResponseDto;

public class PaginationUtil {

    private PaginationUtil() {
    }

    public static <T> PageResponseDto<T> build(Page<T> page) {

        PageResponseDto<T> response = new PageResponseDto<>();

        response.setContent(page.getContent());
        response.setPage(page.getNumber());
        response.setSize(page.getSize());
        response.setTotalElements(page.getTotalElements());
        response.setTotalPages(page.getTotalPages());
        response.setFirst(page.isFirst());
        response.setLast(page.isLast());
        response.setHasNext(page.hasNext());
        response.setHasPrevious(page.hasPrevious());

        return response;
    }
}