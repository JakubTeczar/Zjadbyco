package com.zjadbyco.services;

import com.zjadbyco.dtos.*;
import com.zjadbyco.entities.Dish;
import com.zjadbyco.entities.DishProduct;
import com.zjadbyco.entities.Product;
import com.zjadbyco.entities.enums.CategoryName;
import com.zjadbyco.repositories.DishRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DishService {
    private final DishRepository dishRepository;
    private final CategoryService categoryService;
    private final ProductService productService;

    @Autowired
    public DishService(DishRepository dishRepository, CategoryService categoryService, ProductService productService) {
        this.dishRepository = dishRepository;
        this.categoryService = categoryService;
        this.productService = productService;
    }

    public List<DishDto> getAllDishes() {
        return dishRepository.getAllDishes().stream().map(dish -> {
            List<ProductsWithQuantityDto> productsWithQuantities = dish.getDishProducts()
                    .stream()
                    .map(this::mapDishProductToProductsWithQuantity)
                    .toList();
            DishDto dishDto = new DishDto();
            dishDto.setId(dish.getId());
            dishDto.setName(dish.getName());
            dishDto.setCategory(new CategoryDto());
            dishDto.getCategory().setId(dish.getCategory().getId());
            dishDto.getCategory().setName(dish.getCategory().getName().toString());
            dishDto.setUnit(dish.getUnit());
            dishDto.setCaloriesPerUnit(dish.getCaloriesPerUnit());
            dishDto.setProductsWithQuantities(productsWithQuantities);

            return dishDto;
        }).toList();
    }

    public ProductsWithQuantityDto mapDishProductToProductsWithQuantity(DishProduct dishProduct) {
        ProductDto productDto = new ProductDto();
        productDto.setName(dishProduct.getProduct().getName());
        productDto.setUnit(dishProduct.getProduct().getUnit());
        productDto.setCaloriesPerUnit(dishProduct.getProduct().getCaloriesPerUnit());

        ProductsWithQuantityDto productsWithQuantity = new ProductsWithQuantityDto();
        productsWithQuantity.setProduct(productDto);
        productsWithQuantity.setQuantity(dishProduct.getQuantity());

        return productsWithQuantity;
    }

    public void saveDish(DishDto dishDto) {
        Dish dish = new Dish();
        dish.setName(dishDto.getName());
        dish.setCategory(categoryService.findCategoryByName(CategoryName.OWN_DISHES));
        dish.setUnit(dishDto.getUnit());
        dish.setCaloriesPerUnit(dishDto.getCaloriesPerUnit());
        dish.setDishProducts(dishDto.getProductsWithQuantities()
                .stream()
                .map(productsWithQuantityDto -> {
                            Product product = productService.findProductById(
                                    productsWithQuantityDto.getProduct().getId()
                            );
                            DishProduct dishProduct = new DishProduct();
                            dishProduct.setDish(dish);
                            dishProduct.setProduct(product);
                            dishProduct.setQuantity(productsWithQuantityDto.getQuantity());
                            return dishProduct;
                        }
                ).collect(Collectors.toSet()));

        dishRepository.save(dish);
    }
}
