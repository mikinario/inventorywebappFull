# Crear imagen para la base de datos
docker build -t inventory-db:v1 .

# Crear contenedor
docker run --name inventory-db-mysql -d -p 3306:3306 inventory-db:v1

# Comprobaciones
docker logs -f inventory-db-mysql
docker inspect inventory-db-mysql
docker exec -it inventory-db-mysql bash
    mysql -uroot -p
    show databases; 
    use db_inventory;
    show tables;

# Pruebas Ejemplos
docker run --name inventory-db-mysql-base  -e MYSQL_ROOT_PASSWORD=admin -e MYSQL_DATABASE=db_inventory -d mysql:8
