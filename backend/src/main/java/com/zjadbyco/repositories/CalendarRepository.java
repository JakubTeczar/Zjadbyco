package com.zjadbyco.repositories;

import com.zjadbyco.entities.Calendar;
import com.zjadbyco.entities.Food;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface CalendarRepository extends CrudRepository<Calendar, Long> {
    @Query("SELECT c FROM Calendar c WHERE c.date = :date")
    List<Calendar> getFoodByDate(LocalDate date);
}
