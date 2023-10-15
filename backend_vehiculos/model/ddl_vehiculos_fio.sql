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

create table rol(
rol_id int not null auto_increment,
nombre varchar(40) not null unique,
primary key (rol_id)
);

create table usuario(
usuario_id int not null auto_increment,
nickname varchar(20) not null unique,
mail varchar(40) not null,
clave varchar(255) not null,
persona_id int not null,
rol_id int not null,
primary key (usuario_id),
foreign key (persona_id) references persona(persona_id),
foreign key (rol_id) references rol(rol_id)
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

create table evento(
evento_id int not null auto_increment,
nombre varchar (100),
lugar varchar(100) not null,
primary key (evento_id)
);

create table reserva(
reserva_id int not null auto_increment,
vehiculo_id int not null,
evento_id  int not null,
desde datetime not null,
hasta datetime null,
finalizada boolean default false,
cancelada boolean default false,
primary key (reserva_id),
foreign key (vehiculo_id) references vehiculo(vehiculo_id),
foreign key (evento_id) references evento(evento_id)
);

create table persona_x_reserva(
persona_x_reserva_id int not null auto_increment,
reserva_id int not null,
persona_id  int not null,
primary key (persona_x_reserva_id),
foreign key (reserva_id) references reserva(reserva_id),
foreign key (persona_id) references persona(persona_id)
);

update usuario set rol_id = 1 where usuario_id = 1;

insert into rol (nombre) values ('Administrador'), ('Agente');
insert into marca (nombre) values ('Chevrolet'), ('Fiat'), ('Volkswagen'), ('Toyota');
insert into persona (dni, nombre, apellido, fecha_nacimiento) values (34004371, "Lucas", "Podkowa", "1989-08-09"), (35789147, "Pepe", "Lopez", "1995-06-15");
insert into vehiculo (marca_id, modelo, matricula, ano) values (1, "Focus", "GTQ749", 2008),(1, "Ranger", "AF720ZE", 2022);
insert into evento (nombre, lugar) values ("Acto fin de Clases", "Silicon Misiones, Posadas"),("Entrega Certificados", "Centro del Conocimiento, Posadas") ;
insert into usuario (nickname, mail, clave, persona_id, rol_id) values ('pepe', 'pepe@gmail.com', '$2a$10$dLeNd8/WQsw/gNIF5JBXB.HaMT4IgKySMfpEp8ltoTdSmLU7ffYtW', 2, 2);
