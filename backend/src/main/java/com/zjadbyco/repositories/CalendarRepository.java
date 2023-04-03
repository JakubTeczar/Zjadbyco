package com.zjadbyco.repositories;

import com.zjadbyco.models.Food;
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

    public List<Food> getFoodByDate(String date) {
        String sqlQuery = """
                SELECT name, quantity, unit FROM (
                    SELECT * FROM "Calendar"
                    INNER JOIN "Product" ON "Calendar".food_id = "Product".id WHERE food_type = 'product'
                    UNION
                    SELECT * FROM "Calendar"
                    INNER JOIN "Dish" ON "Calendar".food_id = "Dish".id WHERE food_type = 'dish'
                ) AS query
                WHERE date = ?::DATE
                """;

        RowMapper<Food> foodRowMapper =
                (row, rowNum) -> new Food(row.getString("name"), row.getInt("quantity"), row.getString("unit"));

        return jdbcTemplate.query(sqlQuery, foodRowMapper, date);
    }
}
