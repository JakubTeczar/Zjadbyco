package com.zjadbyco.repositories;

import com.zjadbyco.entities.Fridge;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FridgeRepository extends CrudRepository<Fridge, Long> {
    @Query("SELECT f FROM Fridge f")
    List<Fridge> getAllFood();

    @Query("SELECT f FROM Fridge f JOIN Dish d ON f.food = d")
    List<Fridge> getDishes();

    @Query("SELECT f FROM Fridge f JOIN Product p ON f.food = p")
    List<Fridge> getProducts();
}
