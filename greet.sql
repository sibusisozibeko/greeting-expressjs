DROP TABLE if exists greet cascade;

create table greet(
	id serial not null primary key,
	username  text not null unique,
    greet_count int default 1
);

