MySQL root pw: root

MySQL app user: application
MySQL pw: password


First-time setup:
----

to address "Error: ER_NOT_SUPPORTED_AUTH_MODE" when starting TypeORM database server

(Login to MySQL Command Line Client)
ALTER USER 'application'@'%' IDENTIFIED WITH mysql_native_password BY 'password';
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
SELECT user,plugin FROM mysql.user;

CREATE DATABASE test;

