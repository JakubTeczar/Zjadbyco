package com.zjadbyco.repositories;

import com.zjadbyco.entities.Dish;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DishRepository extends CrudRepository<Dish, Long> {
    @Query("SELECT d FROM Dish d ORDER BY d.name")
    List<Dish> getAllDishes();
}
