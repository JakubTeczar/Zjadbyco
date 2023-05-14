package com.zjadbyco.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "shopping")
public class Shopping {
    @Id
    @Column(name = "id", nullable = false, unique = true)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "shopping_gen")
    @SequenceGenerator(name = "shopping_gen", sequenceName = "shopping_seq", allocationSize = 1)
    private long id;

    @JoinColumn(name = "product_id", nullable = false)
    @ManyToOne(cascade = CascadeType.ALL)
    private Product product;

    @Column(name = "quantity", nullable = false)
    private float quantity;

    @Column(name = "checked", nullable = false)
    private boolean checked = false;

    @Column(name = "user_id", nullable = false)
    private long userId;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public float getQuantity() {
        return quantity;
    }

    public void setQuantity(float quantity) {
        this.quantity = quantity;
    }

    public boolean isChecked() {
        return checked;
    }

    public void setChecked(boolean checked) {
        this.checked = checked;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }
}
