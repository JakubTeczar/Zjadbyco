package com.zjadbyco.entities.enums;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.stream.Stream;

@Converter
public class CategoryNameConverter implements AttributeConverter<CategoryName, String> {
    @Override
    public String convertToDatabaseColumn(CategoryName categoryName) {
        if (categoryName == null) {
            return null;
        }
        return categoryName.toString();
    }

    @Override
    public CategoryName convertToEntityAttribute(String categoryNameString) {
        if (categoryNameString == null || categoryNameString.isEmpty()) {
            return null;
        }

        return Stream.of(CategoryName.values()).
                filter(c -> c.toString().equals(categoryNameString)).
                findFirst().
                orElseThrow(IllegalArgumentException::new);
    }
}
