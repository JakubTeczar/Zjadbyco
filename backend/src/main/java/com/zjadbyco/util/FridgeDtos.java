package com.zjadbyco.util;

import com.zjadbyco.dtos.FridgeDto;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class FridgeDtos {
    private List<FridgeDto> fridgeDtos;

    public FridgeDtos(List<FridgeDto> fridgeDtos) {
        this.fridgeDtos = fridgeDtos;
    }

    public FridgeDtos() {
        this.fridgeDtos = new ArrayList<>();
    }

    public void add(FridgeDto fridgeDto) {
        fridgeDtos.add(fridgeDto);
    }

    public void sortByDate() {
        this.fridgeDtos = fridgeDtos.stream().sorted(Comparator.comparing(FridgeDto::getExpirationDate)).toList();
    }

    public FoodIdWithQuantity findFoodWithQuantityBeforeExpirationDate(
            long id,
            float quantity,
            LocalDate date
    ) {
        FoodIdWithQuantity foodIdWithQuantity = new FoodIdWithQuantity();
        float neededQuantity = quantity;
        for (FridgeDto fridgeDto : fridgeDtos) {
            if (fridgeDto.getQuantity() > 0 &&
                fridgeDto.getFood().getId() == id &&
                !date.isAfter(fridgeDto.getExpirationDate())) {

                //if fridge contains more or equal quantity of food than needed
                if (neededQuantity <= fridgeDto.getQuantity()) {
                    fridgeDto.setQuantity(fridgeDto.getQuantity() - neededQuantity);
                    foodIdWithQuantity.setFoodId(id);
                    foodIdWithQuantity.setQuantity(foodIdWithQuantity.getQuantity() + neededQuantity);
                }
                //fridge contains less quantity of food than needed
                else {
                    foodIdWithQuantity.setFoodId(id);
                    foodIdWithQuantity.setQuantity(fridgeDto.getQuantity());
                    neededQuantity -= fridgeDto.getQuantity();
                    fridgeDto.setQuantity(0);
                }

                if (foodIdWithQuantity.getQuantity() == quantity) {
                    break;
                }
            } else if (fridgeDto.getQuantity() > 0 && date.isAfter(fridgeDto.getExpirationDate())) {
                break;
            }
        }
        return foodIdWithQuantity;
    }
}
