package com.zjadbyco.services;

import com.zjadbyco.dtos.CategoryDto;
import com.zjadbyco.dtos.ProductDto;
import com.zjadbyco.entities.Product;
import com.zjadbyco.entities.enums.CategoryName;
import com.zjadbyco.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final CategoryService categoryService;

    @Autowired
    public ProductService(ProductRepository productRepository, CategoryService categoryService) {
        this.productRepository = productRepository;
        this.categoryService = categoryService;
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

    public void saveProduct(ProductDto productDto) {
        Product product = new Product();
        product.setName(productDto.getName());
        product.setCategory(categoryService.findCategoryByName(CategoryName.OWN_PRODUCTS));
        product.setUnit(productDto.getUnit());
        product.setCaloriesPerUnit(product.getCaloriesPerUnit());
        productRepository.save(product);
    }
}