package com.zjadbyco.services;

import com.zjadbyco.dtos.CategoryDto;
import com.zjadbyco.dtos.ProductDto;
import com.zjadbyco.entities.Product;
import com.zjadbyco.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Product findProductById(long id) {
        return productRepository.findById(id).orElse(null);
    }

    public List<ProductDto> getAllProducts() {
        return productRepository.getAllProducts().stream().map(product -> {
            ProductDto productDto = new ProductDto();
            productDto.setId(product.getId());
            productDto.setName(product.getName());
            productDto.setCategory(new CategoryDto());
            productDto.getCategory().setId(product.getCategory().getId());
            productDto.getCategory().setName(product.getCategory().getName().toString());
            productDto.setUnit(product.getUnit());
            productDto.setCaloriesPerUnit(product.getCaloriesPerUnit());

            return productDto;
        }).toList();
    }
}