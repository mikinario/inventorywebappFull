docker build -t inventory-api:v1 .
docker images

# Muy importante antes de generar el jar
## Cambiar la url de acceso a mysql por (la ip asignada por docker no la conocemos):
spring.datasource.url = jdbc:mysql://docker-inventory-db-mysql:3306/db_inventory?useSSL=false&serverTimezone=Europe/Madrid&allowPublicKeyRetrieval=true

# Crear imagen para la api
docker build -t inventory-api:v1 .

# Ejemplo para crear el contenedor
docker run -p 8080:8080 --name inventory-api -d inventory-api:v1

# Otra posible configuración
spring.datasource.url=jdbc:mysql://${DB_SERVER:localhost}:${DB_PORT:3306}/nms_app?createDatabaseIfNotExist=true
spring.datasource.platform=mysql
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.username=xxx
spring.datasource.password=xxx
spring.datasource.initialization-mode=always

spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.show_sql=false
spring.jpa.properties.hibernate.use_sql_comments=false
spring.jpa.properties.hibernate.format_sql=false
