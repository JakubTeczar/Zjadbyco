package com.zjadbyco.repositories;

import com.zjadbyco.entities.Product;
import com.zjadbyco.entities.Shopping;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ShoppingRepository extends CrudRepository<Shopping, Long> {
    @Modifying
    @Transactional
    @Query("DELETE FROM Shopping s WHERE s.userId = :userId")
    void removeShoppingListByUserId(long userId);

    @Query("SELECT s FROM Shopping s WHERE s.userId = :userId AND s.product = :product")
    Shopping getShoppingByProductAndUserId(long userId, Product product);

    @Modifying
    @Transactional
    @Query("UPDATE Shopping SET quantity = :quantity WHERE id = :id")
    void updateShoppingQuantity(long id, float quantity);

    @Query("SELECT s FROM Shopping s WHERE s.userId = :userId")
    List<Shopping> getShoppingByUserId(long userId);

    @Modifying
    @Transactional
    @Query("DELETE FROM Shopping WHERE id = :id")
    void deleteFromShoppingList(long id);

    @Modifying
    @Transactional
    @Query("UPDATE Shopping SET checked = :checked WHERE id = :id")
    void changeChecked(long id, boolean checked);
}
