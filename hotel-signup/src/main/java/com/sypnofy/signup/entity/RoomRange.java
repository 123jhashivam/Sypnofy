package com.sypnofy.signup.entity;

public enum RoomRange {
    R_1_10("1–10"),
    R_11_50("11–50"),
    R_51_150("51–150"),
    R_151_300("151–300"),
    R_300_PLUS("300+");

    private final String label;

    RoomRange(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }

    public static RoomRange fromLabel(String label) {
        for (RoomRange range : values()) {
            if (range.label.equalsIgnoreCase(label) || range.name().equalsIgnoreCase(label)) {
                return range;
            }
        }
        return null;
    }
}
