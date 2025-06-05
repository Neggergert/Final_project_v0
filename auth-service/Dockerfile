FROM golang:1.23.8 as builder
WORKDIR /app
COPY . .
RUN go build -o auth-service

FROM gcr.io/distroless/base-debian12
WORKDIR /app
COPY --from=builder /app/auth-service ./
EXPOSE 8081
ENTRYPOINT ["/app/auth-service"]
