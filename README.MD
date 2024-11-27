MySQL root pw: root

MySQL app user: application
MySQL app pw: password


First-time setup:
----
(From project root)

(Login to MySQL; assumes default port 3306)
mysql> ALTER USER 'application'@'%' IDENTIFIED WITH mysql_native_password BY 'password';
mysql> ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
mysql> SELECT user,plugin FROM mysql.user;
mysql> CREATE DATABASE test;

(Run webserver)
npm install
npm run start:dev

(In browser)
http://localhost:3000

