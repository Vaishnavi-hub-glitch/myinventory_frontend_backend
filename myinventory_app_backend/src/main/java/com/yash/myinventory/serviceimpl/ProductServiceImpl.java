package com.yash.myinventory.serviceimpl;
import com.yash.myinventory.model.Product;
import com.yash.myinventory.repository.ProductRepository;
import com.yash.myinventory.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    private ProductRepository productRepository;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository){
        this.productRepository=productRepository;
    }

    public List<Product> getAll(){
        return productRepository.findAll();
    }

    public Optional<Product> findByID(Long id){
        return productRepository.findById(id);
    }

    public void save(Product product){
        productRepository.save(product);
    }

    public void delete(Long id){
        productRepository.deleteById(id);
    }


    public List<Product> searchByName(String name) {
        return productRepository.findAll().stream()
                .filter(product -> product.getName().toLowerCase()
                        .contains(name.toLowerCase()))
                .collect(Collectors.toList());
    }

    public Optional<Product> searchById(Long id) {
        return productRepository.findById(id);
    }

    public List<Product> filterByPriceHighToLow() {
        return productRepository.findAll().stream()
                .sorted(Comparator.comparing(Product::getPrice).reversed())
                .collect(Collectors.toList());
    }

    public List<Product> filterByName() {
        return productRepository.findAll().stream()
                .sorted(Comparator.comparing(Product::getName))
                .collect(Collectors.toList());
    }
}

