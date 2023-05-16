package com.zjadbyco.repositories;

import com.zjadbyco.entities.Calendar;
import com.zjadbyco.entities.Food;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface CalendarRepository extends CrudRepository<Calendar, Long> {
    @Modifying
    @Query("DELETE FROM Calendar WHERE id = :id")
    @Transactional
    void deleteFood(long id);

    @Modifying
    @Query("UPDATE Calendar SET checked = :checked WHERE id = :id")
    @Transactional
    void changeChecked(long id, boolean checked);

    @Query("SELECT c FROM Calendar c")
    List<Calendar> getFoodByUser(long userId);

    @Modifying
    @Transactional
    @Query("DELETE FROM Calendar c WHERE c.food.id = :foodId")
    void deleteByFoodIdAndUser(long foodId);

    @Query("SELECT c FROM Calendar c WHERE c.date >= :startDate AND c.date <= :endDate")
    List<Calendar> getFoodBetweenDates(LocalDate startDate, LocalDate endDate);

    @Query("SELECT c FROM Calendar c WHERE c.checked = false AND c.date >= :startDate AND c.date <= :endDate")
    List<Calendar> getUncheckedFoodBetweenDates(LocalDate startDate, LocalDate endDate);
}