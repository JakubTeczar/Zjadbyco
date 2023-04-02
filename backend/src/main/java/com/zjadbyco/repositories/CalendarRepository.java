package com.zjadbyco.repositories;

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

    public List<Product> getProductsByDate(String date) {

        String sqlQuery =
                "SELECT name, quantity, unit FROM \"Calendar\" " +
                        "INNER JOIN \"Product\" ON \"Calendar\".element_id = \"Product\".id " +
                        "WHERE value = 'product' AND date = ?::DATE";

        RowMapper<Product> productRowMapper = (result, i) ->
                new Product(result.getString("name"), result.getInt("quantity"), result.getString("unit"));

        return jdbcTemplate.query(sqlQuery, productRowMapper, date);
    }
}
