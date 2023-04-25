package com.zjadbyco.repositories;

import com.zjadbyco.entities.Calendar;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface CalendarRepository extends CrudRepository<Calendar, Long> {
    @Query("SELECT c FROM Calendar c WHERE c.date = :date")
    List<Calendar> getFoodByDate(LocalDate date);

    @Modifying
    @Query("DELETE FROM Calendar WHERE id = :id")
    @Transactional
    void deleteFood(long id);

    @Modifying
    @Query("UPDATE Calendar SET checked = :checked WHERE id = :id")
    @Transactional
    void changeChecked(long id, boolean checked);
}
