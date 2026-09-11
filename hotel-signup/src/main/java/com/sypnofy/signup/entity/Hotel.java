package com.sypnofy.signup.entity;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "hotels")
public class Hotel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;

    @Column(name = "company_name", nullable = false, length = 150)
    private String companyName;

    @Column(name = "hotel_name", nullable = false, length = 150)
    private String hotelName;

    @Column(name = "city", nullable = false, length = 100)
    private String city;

    @Enumerated(EnumType.STRING)
    @Column(name = "hotel_type", nullable = false, length = 30)
    private HotelType hotelType;

    @Enumerated(EnumType.STRING)
    @Column(name = "room_range", nullable = false, length = 20)
    private RoomRange roomRange;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @PrePersist
    void onCreate() {
        this.createdAt = Instant.now();
    }

    // --- getters and setters ---

    public Long getId() { return id; }

    public User getOwner() { return owner; }
    public void setOwner(User owner) { this.owner = owner; }

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }

    public String getHotelName() { return hotelName; }
    public void setHotelName(String hotelName) { this.hotelName = hotelName; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public HotelType getHotelType() { return hotelType; }
    public void setHotelType(HotelType hotelType) { this.hotelType = hotelType; }

    public RoomRange getRoomRange() { return roomRange; }
    public void setRoomRange(RoomRange roomRange) { this.roomRange = roomRange; }

    public Instant getCreatedAt() { return createdAt; }
}
