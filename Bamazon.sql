-- Drops the bids_db if it already exists --
DROP DATABASE IF EXISTS bamazon_db;
-- Create a database called bids_db --
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products
(
    item_id INT NOT NULL
    AUTO_INCREMENT,
  product_name VARCHAR
    (45) NULL,
  department_name VARCHAR
    (45),
  price DECIMAL
    (10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY
    (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("watch", "men's accessories", 99.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("shoes", "men's accessories", 199.00, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("belt", "men's accessories", 39.00, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("dress", "women's accessories", 199.00, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("pantyhose", "women's accessories", 29.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("shoes", "women's accessories", 399.00, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("skirts", "women's accessories", 69.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("bracelet", "women's jewelry", 199.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("earrings", "women's jewelry", 299.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("tie", "men's accessories", 49.00, 100);