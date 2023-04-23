package com.zjadbyco.repositories;

import com.zjadbyco.entities.Category;
import com.zjadbyco.entities.enums.CategoryName;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends CrudRepository<Category, Long> {
    @Query("SELECT c FROM Category c WHERE c.name = :name")
    Category findByName(CategoryName name);
}
