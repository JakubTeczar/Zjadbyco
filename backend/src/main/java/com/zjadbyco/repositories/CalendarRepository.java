package com.zjadbyco.repositories;

import com.zjadbyco.models.Food;
import com.zjadbyco.models.Dish;
import com.zjadbyco.models.Product;
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
                SELECT calendar.id, name, quantity, unit FROM calendar
                JOIN dish on calendar.dish_id = dish.id WHERE date = ?::DATE
                UNION
                SELECT calendar.id, name, quantity, unit FROM calendar
                JOIN product on calendar.product_id = product.id WHERE date = ?::DATE
                """;

        RowMapper<Food> foodRowMapper = (rs, rowNum) -> {
            return new Food(rs.getString("id"), rs.getString("name"), rs.getInt("quantity"),
                    rs.getString("unit"));
        };

        return jdbcTemplate.query(sqlQuery, foodRowMapper, date, date);
    }

    public List<Product> getAllProducts() {
        String sqlQuery = "SELECT id, name, unit, calories_per_unit FROM product";

        RowMapper<Product> productRowMapper =
                (rs, rowNum) -> new Product(rs.getString("id"), rs.getString("name"), rs.getString("unit"),
                        rs.getFloat("calories_per_unit"));
        return jdbcTemplate.query(sqlQuery, productRowMapper);
    }

    public List<Dish> getAllDishes() {
        String sqlQuery = "SELECT id, name, unit, calories_per_unit FROM dish";

        RowMapper<Dish> dishRowMapper =
                (rs, rowNum) -> new Dish(rs.getString("id"), rs.getString("name"), rs.getString("unit"),
                        rs.getFloat("calories_per_unit"));
        return jdbcTemplate.query(sqlQuery, dishRowMapper);
    }

    public void addProduct(Food food) {
        String sqlQuery = "INSERT INTO calendar VALUES (DEFAULT, ?, NULL, ?, ?)";
        jdbcTemplate.update(sqlQuery, food.id(), food.quantity(), food.date());
    }

    public void addDish(Food food) {
        String sqlQuery = "INSERT INTO calendar VALUES (DEFAULT, NULL, ?, ?, ?)";
        jdbcTemplate.update(sqlQuery, food.id(), food.quantity(), food.date());
    }
}
