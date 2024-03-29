DROP TABLE if exists journal_entries; 
DROP TABLE if exists sp_resources; 
DROP TABLE if exists sp_identifiers; 
DROP TABLE if exists safety_plan; 
DROP TABLE if exists users; 

CREATE TABLE `journal_entries` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`date` DATE NOT NULL,
	`entry_text` TEXT,
	`moment_of_joy` varchar(255),
	`mood` TEXT NOT NULL,
	`title` varchar(255) NOT NULL,
	`user_id` INT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `sp_resources` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` TEXT NOT NULL,
	`info` TEXT NOT NULL,
	`type` BOOLEAN NOT NULL,
	`sp_id` INT NOT NULL,
	`user_id` INT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `sp_identifiers` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`type` TEXT NOT NULL,
	`text` TEXT NOT NULL,
	`sp_id` INT NOT NULL,
	`user_id` INT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `safety_plan` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`date` TEXT NOT NULL,
	`user_id` INT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `users` (
	`user_id` INT NOT NULL AUTO_INCREMENT,
	`username` VARCHAR(40),
	`email` VARCHAR(40),
	`password` VARCHAR(255),
	PRIMARY KEY (`user_id`)
);



