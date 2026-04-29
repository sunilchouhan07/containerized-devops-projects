FROM node:20-alpine AS builder 

WORKDIR /app 

COPY package*.json ./

RUN npm isntall

COPY app.js ./



# stage 2 

FROM node:20-alpine 

WORKDIR /app 

ENV NODE_ENV=production

COPY --from=builder /app /app 

RUN addgroup -S nodegroup && adduser -S nodeuser -G nodegroup

USER nodeuser

EXPOSE 5000

CMD [ "node", "app.js" ]

