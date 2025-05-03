--  create database TaskManagement;
------------------------------------------------------------------------------------------------------------------------
 /*
 use TaskManagement;

create table [User]
(Id BigInt identity(1,1) primary key,Name varchar(50),Email varchar(50),Password varchar(50),Dob DATE ,MobileNo varchar(15) ,Address varchar(255),Role varchar(20));


create table TaskPriority
(id Int primary key,TaskPriorityStatus varchar(10));


create table Task
(Id BigInt identity(1,1) primary key,Title varchar(50),Description varchar(Max),Duedate DATE,IsCompleted Bit,,TaskActiveStatus Bit,UserId BigInt ,TaskPriorityId int,foreign key (UserId) references [User](Id),foreign key (taskPriorityId) references TaskPriority(id)); 


*/

-------------------------------------------------------------------------------------------------------------------------


-- insert into taskpriority (id,TaskPriorityStatus) values (1,"High"),(2,"Medium"),(3,"Low");

--------------------------------------------------------------------------------------------------
/*
// TaskActiveStaus Extra Column Not in use Currently  -- To Perform Soft Delete

create table Task
(Id BigInt identity(1,1) primary key,Title varchar(50),Description varchar(Max),Duedate DATE,IsCompleted Bit,,TaskActiveStatus Bit,UserId BigInt ,TaskPriorityId int,foreign key (UserId) references [User](Id),foreign key (taskPriorityId) references TaskPriority(id)); 

*/

---------------------------------
/*
use TaskManagement;
alter table [user]
alter column dob DATE;

*/
-------------------------------------
/*
use TaskManagement;
alter table  task
alter column duedate DATE;
*/
-----------------------------------------
-- use TaskManagement;
-- select * from [user];
--select * from [user] where id=2;
--select * from [user] where id=13;

--select * from [user];
--select * from [user] where role='admin';

--update [user] set role='Admin' where id=2


--select * from [user] where email='abc@gmail.com';

--update [user] set email='akshay@gmail.com' where id=2;
