package com.zjadbyco.services;

import com.zjadbyco.entities.Category;
import com.zjadbyco.entities.enums.CategoryName;
import com.zjadbyco.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public Category findCategoryById(long id) {
        return categoryRepository.findById(id).orElse(null);
    }

    public Category findCategoryByName(CategoryName categoryName) {
        return categoryRepository.findByName(categoryName);
    }
}
