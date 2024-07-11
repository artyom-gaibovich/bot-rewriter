иFROM node:21.3.0-alpine3.18 as build

WORKDIR /app
ADD . /app
RUN npm install --force

FROM node:21.3.0-alpine3.18

WORKDIR /app
COPY --from=build /app /app

CMD ["npm", "run", "start"]
