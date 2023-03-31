package com.zjadbyco.models;

public class Odpowiedz {
    private String name;
    private String amount;
    private String calories;
    private String date;

    public Odpowiedz(String name, String amount, String calories, String date) {
        this.name = name;
        this.amount = amount;
        this.calories = calories;
        this.date = date;
    }

    public String getDate() {
        return date;
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
