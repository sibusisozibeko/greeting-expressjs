-- DROP TABLE if exists greet cascade;

create table greet(
	id serial not null primary key,
	username  text not null unique,
    greet_count int not null
);

-- insert into greet(username, language) values('Sbu', 'English');
-- insert into greet(username, language) values('Av', 'IsXhosa');
-- insert into greet(username, language) values('AB', 'Afrikaans');

-- -- select * from greet;
-- -- select * from greet where username='Sbu';



