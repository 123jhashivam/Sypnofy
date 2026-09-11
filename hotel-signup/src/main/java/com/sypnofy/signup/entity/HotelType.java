package com.sypnofy.signup.entity;

public enum HotelType {
    INDEPENDENT_HOTEL("Independent hotel"),
    BOUTIQUE_HOTEL("Boutique hotel"),
    CHAIN_GROUP_PROPERTY("Chain / group property"),
    RESORT("Resort"),
    GUESTHOUSE_BNB("Guesthouse / B&B"),
    SERVICED_APARTMENTS("Serviced apartments");

    private final String label;

    HotelType(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }

    public static HotelType fromLabel(String label) {
        for (HotelType type : values()) {
            if (type.label.equalsIgnoreCase(label) || type.name().equalsIgnoreCase(label)) {
                return type;
            }
        }
        return null;
    }
}
