package com.yash.myinventory.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
@Table(name = "product")
public class Product {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name")
    private String  name;

    @Column(name = "price")
    private long  price;

    @Column(name = "description")
    private String description;

    @Column(name = "expiryDate")
    private Date expiryDate;
}
