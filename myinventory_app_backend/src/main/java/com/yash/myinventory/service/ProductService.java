package com.yash.myinventory.service;
import com.yash.myinventory.model.Product;

import java.util.List;
import java.util.Optional;

public interface ProductService {
    public List<Product> getAll();
    public void save(Product product);
    public Optional<Product> findByID(Long id);
    public void delete(Long id);
    public List<Product> filterByName();
    public List<Product> filterByPriceHighToLow();
    public List<Product> searchByName(String name);
    public Optional<Product> searchById(Long id);
}
