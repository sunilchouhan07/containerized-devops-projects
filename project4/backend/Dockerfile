FROM node:20-alpine AS builder

WORKDIR /app 

COPY package*.json .

RUN npm install

COPY . .


# stage2

FROM node:20-alpine

WORKDIR /app 

COPY --from=builder /app /app 


EXPOSE 5000 

CMD [ "node", "app.js" ]


