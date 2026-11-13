package com.inventory.inventory_management.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.util.List;
import com.inventory.inventory_management.entity.Product;
import com.inventory.inventory_management.service.ProductService;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

   @PostMapping
public ResponseEntity<Product> addProduct(@RequestBody Product product) {
    Product savedProduct = productService.addProduct(product);
    return new ResponseEntity<>(savedProduct, HttpStatus.CREATED);
}

@GetMapping
public List<Product> getAllProducts() {
    return productService.getAllProducts();
}

@GetMapping("/{id}")
public Product getProductById(@PathVariable Long id) {
    return productService.getProductById(id);
}
@PutMapping("/{id}")
public ResponseEntity<Product> updateProduct(
        @PathVariable Long id,
        @RequestBody Product product) {

    Product updatedProduct = productService.updateProduct(id, product);

    if (updatedProduct != null) {
        return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
    }

    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
}
@DeleteMapping("/{id}")
public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {

    productService.deleteProduct(id);

    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
}
}