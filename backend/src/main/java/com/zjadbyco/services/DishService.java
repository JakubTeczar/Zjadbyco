package com.zjadbyco.services;

import com.zjadbyco.dtos.CategoryDto;
import com.zjadbyco.dtos.DishDto;
import com.zjadbyco.dtos.ProductDto;
import com.zjadbyco.dtos.ProductsWithQuantityDto;
import com.zjadbyco.entities.Dish;
import com.zjadbyco.entities.DishProduct;
import com.zjadbyco.entities.Product;
import com.zjadbyco.repositories.DishRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DishService {
    private final DishRepository dishRepository;
    private final ProductService productService;
    private final CategoryService categoryService;

    @Autowired
    public DishService(DishRepository dishRepository, ProductService productService, CategoryService categoryService) {
        this.dishRepository = dishRepository;
        this.productService = productService;
        this.categoryService = categoryService;
    }

    public void saveDish(Dish dish) {
        Dish newDish = new Dish();
        newDish.setName(dish.getName());
        newDish.setCategory(categoryService.findCategoryById(dish.getCategory().getId()));
        newDish.setUnit(dish.getUnit());
        newDish.setCaloriesPerUnit(dish.getCaloriesPerUnit());
        newDish.getDishProducts().addAll(dish.getDishProducts().stream().
                map(dishProduct -> {
                    Product product = productService.findProductById(dishProduct.getProduct().getId());
                    DishProduct newDishProduct = new DishProduct();
                    newDishProduct.setProduct(product);
                    newDishProduct.setDish(newDish);
                    newDishProduct.setQuantity(dishProduct.getQuantity());
                    return newDishProduct;
                }).collect(Collectors.toSet()));

        dishRepository.save(newDish);
    }

    public List<DishDto> getAllDishes() {
        return dishRepository.getAllDishes().stream().map(dish -> {
            DishDto dishDto = new DishDto();

            List<ProductsWithQuantityDto> productsWithQuantities = dish.getDishProducts().stream().map(dishProduct -> {
                ProductDto productDto = new ProductDto();
                productDto.setId(dishProduct.getProduct().getId());
                productDto.setName(dishProduct.getProduct().getName());
                productDto.setCategory(new CategoryDto());
                productDto.getCategory().setId(dishProduct.getProduct().getCategory().getId());
                productDto.getCategory().setName(dishProduct.getProduct().getCategory().getName().toString());
                productDto.setUnit(dishProduct.getProduct().getUnit());
                productDto.setCaloriesPerUnit(dishProduct.getProduct().getCaloriesPerUnit());

                ProductsWithQuantityDto productsWithQuantity = new ProductsWithQuantityDto();
                productsWithQuantity.setProduct(productDto);
                productsWithQuantity.setQuantity(dishProduct.getQuantity());

                return productsWithQuantity;
            }).toList();

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
}
