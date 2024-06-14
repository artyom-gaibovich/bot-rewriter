# Этап сборки
FROM gradle:8.8.0-jdk-21-and-22-alpine as build


WORKDIR /app

COPY src/parser-server .
RUN gradle build

FROM gradle:8.8.0-jdk-21-and-22-alpine
WORKDIR /app
COPY --from=build /app/build/libs/service-0.0.1-SNAPSHOT.jar /app/service.jar

WORKDIR /app

CMD ["java", "-jar", "/app/service.jar"]