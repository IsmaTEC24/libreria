FROM openjdk:21-slim

WORKDIR /app

# Copiar JAR compilado
COPY target/app.jar app.jar

# Puerto expuesto
EXPOSE 8080

# Ejecutar aplicación con puerto y variables de entorno
ENTRYPOINT ["java", "-Dserver.port=8080", "-jar", "app.jar"]
