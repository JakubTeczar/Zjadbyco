package com.zjadbyco.repositories;

import com.zjadbyco.entities.Category;
import com.zjadbyco.entities.Food;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FoodRepository extends CrudRepository<Food, Long> {
    @Query("SELECT f FROM Food f WHERE f.category = :category")
    List<Food> getFoodByCategory(Category category);
}
