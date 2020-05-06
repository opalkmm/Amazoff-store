CREATE DATABASE amazoffDB;
USE amazoffDB;
CREATE TABLE products(
item_id integer not null auto_increment,
product_namee varchar(100) not null,
department_name varchar(30) not null,
price integer not null,
stock_quantity integer not null,
PRIMARY KEY(item_id)
);

select * from products;
ALTER TABLE products RENAME COLUMN product_namee TO product_name;

INSERT INTO products
VALUES (1, 'tamagotchi meets', 'toys', 65, 100),
(2, 'Etude lip tint', 'cosmetics', 20, 100);

select * from products;

INSERT INTO products
VALUES (3, 'Tom yum paste', 'food', 19, 100),
(4, 'Apeach plush', 'toys', 45, 100),
(5, 'iPhone 11 pro max', 'electronics', 1300, 100),
(6, 'Polly pocket', 'toys', 34, 100),
(7, 'Swerve sweetener', 'food', 10, 100),
(8, 'Tom Ford foundation', 'cosmetics', 60, 100),
(9, 'Paperang thermal printer', 'electronics', 68, 100),
(10, 'Ito En matcha', 'food', 25, 100);