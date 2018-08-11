DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(

    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(30),
    department_name VARCHAR(30),
    price INT NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (item_id)

);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("tire", "auto", 50, 50), ("motor oil", "auto", 30, 100), ("plates", "kitchen", 10, 70), ("cups", "kitchen", 5, 70), ("towel", "bath", 25, 60), ("soap", "bath", 7, 200), ("rake", "yard", 20, 40), ("bags", "yard", 15, 150), ("paper", "office", 8, 300), ("pens", "office", 1, 1000);