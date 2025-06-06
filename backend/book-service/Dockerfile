FROM eclipse-temurin:17-jdk as builder
WORKDIR /app
COPY . .
RUN chmod +x gradlew

RUN ls -l /app
RUN find /app -name gradlew


RUN ./gradlew bootJar --no-daemon

FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=builder /app/app/build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]
