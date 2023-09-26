-- drop database vehiculos_fio;
-- create database vehiculos_fio;

create table persona(
persona_id int not null auto_increment,
dni varchar(9) not null unique,
nombre varchar(40) not null,
apellido varchar(40) not null,
fecha_nacimiento date null,
primary key (persona_id)
);

create table usuario(
usuario_id int not null auto_increment,
nickname varchar(20) not null unique,
mail varchar(40) not null,
clave varchar(255) not null,
persona_id int not null,
primary key (usuario_id),
foreign key (persona_id) references persona(persona_id)
);

create table marca(
marca_id int not null auto_increment,
nombre varchar(30) not null unique,
primary key (marca_id)
);

create table vehiculo(
vehiculo_id int not null auto_increment,
marca_id int not null,
modelo varchar(30) not null unique,
matricula varchar(7) not null,
ano varchar(40) not null,
primary key (vehiculo_id),
foreign key (marca_id) references marca(marca_id)
);

insert into marca (nombre) values ('Chevrolet'), ('Fiat'), ('Volkswagen'), ('Toyota');

