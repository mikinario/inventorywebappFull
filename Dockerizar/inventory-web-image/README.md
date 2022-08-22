# Crear imagen para el Frontend

docker build -t inventory-web:v1 .
docker images

# Ejemplo arrancar nginx puerto 5501 a partir de la imagen 
 docker run --name docker-inventory-web -d -p 5501:80 inventory-web:v1


