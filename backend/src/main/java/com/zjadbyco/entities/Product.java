package com.zjadbyco.entities;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "product")
public class Product extends Food {
}