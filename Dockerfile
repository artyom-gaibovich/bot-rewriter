# Используем официальный образ Golang в качестве базового образа
FROM golang:1.17-alpine

# Установка переменной окружения для корректной работы Go модулей
ENV GO111MODULE=on

# Установка рабочей директории внутри контейнера
WORKDIR /app

# Копирование зависимостей проекта (если есть файл go.mod и go.sum)
COPY go.mod go.sum ./

# Загрузка зависимостей
RUN go mod download

# Копирование остального кода проекта внутрь контейнера
COPY . .

# Сборка Go приложения
RUN go build -o main .

# Команда для запуска вашего приложения
CMD ["./main"]