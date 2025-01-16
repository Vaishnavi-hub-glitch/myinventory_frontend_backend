package com.yash.myinventory.controller;

import com.yash.myinventory.model.Product;
import com.yash.myinventory.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/products")
@CrossOrigin("*")

public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    // Get all products
    //http://localhost:8082/products/list
    @GetMapping("/list")
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productService.getAll();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    // Get a product by ID
    // http://localhost:8082/products/get/{id}
    @GetMapping("/get/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        Optional<Product> product = productService.findByID(id);
        return product.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Create a new product
    //http://localhost:8082/products/add
    @PostMapping("/add")
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        productService.save(product);
        return new ResponseEntity<>(product, HttpStatus.CREATED);
    }

    // Update an existing product
    //http://localhost:8082/products/update/{id}
    @PutMapping("update/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product product) {
        Optional<Product> existingProduct = productService.findByID(id);
        if (existingProduct.isPresent()) {
            product.setId(id); // Ensure the ID is set for the update
            productService.save(product);
            return new ResponseEntity<>(product, HttpStatus.OK);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete a product
    //http://localhost:8082/products/delete/{id}
    @DeleteMapping("delete/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        if (productService.findByID(id).isPresent()) {
            productService.delete(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchProducts(@RequestParam String name) {
        List<Product> products = productService.searchByName(name);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/search/{id}")
    public ResponseEntity<Product> searchProductById(@PathVariable Long id) {
        Optional<Product> product = productService.findByID(id);
        return product.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/filter/price")
    public ResponseEntity<List<Product>> getProductsByPriceHighToLow() {
        List<Product> products = productService.filterByPriceHighToLow();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/filter/name")
    public ResponseEntity<List<Product>> getProductsSortedByName() {
        List<Product> products = productService.filterByName();
        return ResponseEntity.ok(products);
    }
}