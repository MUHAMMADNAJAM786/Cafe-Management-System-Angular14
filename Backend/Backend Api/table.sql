create table user
(
    id int primary key AUTO_INCREMENT,
    name varchar(20),
    contactNumber varchar(20),
    email  varchar(20),
    password varchar(20),
    status varchar(20),
    role varchar(20),
    UNIQUE (email)
); 





insert into user(name,contactNumber,email,password,status,role)
values('Admin','1231231231','admin@gmail.com','admin','true','admin');    

insert into bill(name,uuid,email,contactNumber,paymentMethod,total,productDetails,createdBy) 
  values('malik','malik@gmail.com','1234567890','1234567890','cash','1200','sandwhich','burger'); 


create table category (
     id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
     primary key(id)
);

create table product 
(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    categoryId integer NOT NULL,
    description varchar(255),
    price integer,
    status varchar(20),
    primary key(id)
);

create table bill(
     id int NOT NULL AUTO_INCREMENT,
     uuid varchar(200) NOT NULL,
     name varchar(255) NOT NULL,
      email varchar(255) NOT NULL,
       contactNumber varchar(20) NOT NULL,
       paymentMethod varchar(50) NOT NULL,
       total int NOT NULL,
       productDetails LONGTEXT DEFAULT NULL,
       CHECK (JSON_VALID(productDetails)),
       createdBy varchar(255) NOT NULL,
        primary key(id)
);

create table bill2(
     id int NOT NULL AUTO_INCREMENT,
    uuid varchar(200) NOT NULL,
     name varchar(255) NOT NULL,
      email varchar(255) NOT NULL,
       contactNumber varchar(20) NOT NULL,
       paymentMethod varchar(50) NOT NULL,
       total int NOT NULL,
       productDetails JSON DEFAULT NULL,
       createdBy varchar(255) NOT NULL,
        primary key(id)
);


