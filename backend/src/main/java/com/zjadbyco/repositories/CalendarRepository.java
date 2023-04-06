package com.zjadbyco.repositories;

import com.zjadbyco.models.Calendar;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CalendarRepository {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public CalendarRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Calendar> getFoodByDate(String date) {
        String sqlQuery = """
                SELECT calendar.id, name, quantity, unit FROM calendar
                JOIN dish on calendar.dish_id = dish.id WHERE date = ?::DATE
                UNION
                SELECT calendar.id, name, quantity, unit FROM calendar
                JOIN product on calendar.product_id = product.id WHERE date = ?::DATE
                """;

        RowMapper<Calendar> foodRowMapper = (row, rowNum) -> {
            return new Calendar(row.getString("id"), row.getString("name"), row.getInt("quantity"),
                    row.getString("unit"));
        };

        return jdbcTemplate.query(sqlQuery, foodRowMapper, date, date);
    }
}
