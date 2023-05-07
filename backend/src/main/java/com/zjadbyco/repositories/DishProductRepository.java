package com.zjadbyco.repositories;

import com.zjadbyco.entities.DishProduct;
import com.zjadbyco.entities.ids.DishProductId;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface DishProductRepository extends CrudRepository<DishProduct, DishProductId> {
    @Modifying
    @Transactional
    @Query("DELETE FROM DishProduct WHERE dishProductId.dishId = :id")
    void removeDishProductsByDishId(long id);
}
