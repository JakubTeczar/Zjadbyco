package com.zjadbyco.entities.enums;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum CategoryName {
    @JsonProperty("Produkty zbożowe")
    GRAIN_PRODUCTS("Produkty zbożowe"),

    @JsonProperty("Owoce i warzywa")
    FRUITS_AND_VEGETABLES("Owoce i warzywa"),

    @JsonProperty("Nabiał")
    DAIRY("Nabiał"),

    @JsonProperty("Mięso")
    MEAT("Mięso"),

    @JsonProperty("Dania")
    DISHES("Dania"),

    @JsonProperty("Napoje")
    DRINKS("Napoje"),

    @JsonProperty("Własne")
    OWN("Własne"),

    @JsonProperty("Inne")
    OTHER("Inne");

    private final String name;

    private CategoryName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return name;
    }
}