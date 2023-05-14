package com.zjadbyco.repositories;

import com.zjadbyco.entities.Food;
import com.zjadbyco.entities.Fridge;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface FridgeRepository extends CrudRepository<Fridge, Long> {
    @Query("SELECT f FROM Fridge f")
    List<Fridge> getAllFood();

    @Query("SELECT f FROM Fridge f JOIN Dish d ON f.food = d")
    List<Fridge> getDishes();

    @Query("SELECT f FROM Fridge f JOIN Product p ON f.food = p")
    List<Fridge> getProducts();

    @Query("DELETE FROM Fridge WHERE id = :id")
    @Modifying
    @Transactional
    void deleteFood(long id);

    @Query("SELECT f FROM Fridge f where f.food = :food and f.expirationDate = :expirationDate")
    Fridge getFridgeByFoodAndExpirationDate(Food food, LocalDate expirationDate);

    @Modifying
    @Transactional
    @Query("DELETE FROM Fridge f WHERE f.food.id = :foodId")
    void deleteByFoodIdAndUser(long foodId);

    @Modifying
    @Transactional
    @Query("UPDATE Fridge SET quantity = :quantity WHERE id = :id")
    void changeQuantity(long id, float quantity);
}
