package com.zjadbyco.models;

public class Odpowiedz {
    private String name;
    private String amount;
    private String calories;

    public Odpowiedz(String name, String amount, String calories) {
        this.name = name;
        this.amount = amount;
        this.calories = calories;
    }

    public String getName() {
        return name;
    }

    public String getAmount() {
        return amount;
    }

    public String getCalories() {
        return calories;
    }
}
